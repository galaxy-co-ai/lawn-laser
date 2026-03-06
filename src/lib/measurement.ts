/**
 * Property measurement using Google Geocoding + Regrid parcel/building data.
 * Falls back to zip-code-based estimation if APIs fail or return no data.
 *
 * Regrid trial token is restricted to 7 counties (Dallas, TX area).
 * Production requires a Self-Serve plan for Oklahoma County coverage.
 */

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY!;
const REGRID_API_TOKEN = process.env.REGRID_API_TOKEN!;
const REGRID_BASE = "https://app.regrid.com/api/v2";

// Fallback: average lot sizes by OKC metro zip prefix
const OKC_AVG_LOT_SQFT: Record<string, number> = {
  "730": 8500,
  "731": 9500,
  "732": 10000,
  "733": 12000,
  "734": 11000,
  "735": 8000,
};
const DEFAULT_LOT_SQFT = 9000;
const BUILDING_RATIO = 0.18;
const HARDSCAPE_RATIO = 0.12;

type GeocodingResult = {
  lat: number;
  lng: number;
  formattedAddress: string;
};

type MeasurementResult = {
  lat: number;
  lng: number;
  formattedAddress: string;
  lotSqFt: number;
  buildingFootprintSqFt: number;
  lawnSqFt: number;
  drivewaySqFt: number;
  sidewalkSqFt: number;
  source: "regrid" | "google+regrid" | "estimate";
};

/**
 * Step 1: Geocode address → lat/lng via Google
 */
async function geocode(address: string): Promise<GeocodingResult | null> {
  try {
    const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
    url.searchParams.set("address", address);
    url.searchParams.set("key", GOOGLE_MAPS_API_KEY);
    url.searchParams.set("components", "country:US");

    const res = await fetch(url.toString());
    const data = await res.json();

    if (data.status !== "OK" || !data.results?.length) return null;

    const result = data.results[0];
    return {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      formattedAddress: result.formatted_address,
    };
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

/**
 * Step 2: Look up parcel + building data from Regrid
 */
async function getParcelData(
  lat: number,
  lng: number
): Promise<{
  lotSqFt: number | null;
  buildingFootprintSqFt: number | null;
} | null> {
  try {
    const url = new URL(`${REGRID_BASE}/parcels/point`);
    url.searchParams.set("lat", lat.toString());
    url.searchParams.set("lon", lng.toString());
    url.searchParams.set("limit", "1");
    url.searchParams.set("buildings", "true");
    url.searchParams.set("return_geometry", "true");
    url.searchParams.set("token", REGRID_API_TOKEN);

    const res = await fetch(url.toString());
    if (!res.ok) return null;

    const data = await res.json();

    // Extract lot area from parcel geometry
    let lotSqFt: number | null = null;
    const parcel = data.parcels?.features?.[0];
    if (parcel) {
      // Check fields for lot size (ll_gisacre or similar)
      const fields = parcel.properties?.fields;
      if (fields?.ll_gisacre) {
        lotSqFt = Math.round(fields.ll_gisacre * 43560); // acres → sqft
      } else if (fields?.gisacre) {
        lotSqFt = Math.round(fields.gisacre * 43560);
      }

      // If no acreage field, calculate from polygon geometry
      if (!lotSqFt && parcel.geometry) {
        lotSqFt = calculatePolygonAreaSqFt(parcel.geometry);
      }
    }

    // Extract building footprint
    let buildingFootprintSqFt: number | null = null;
    const buildings = data.buildings?.features;
    if (buildings?.length) {
      // Sum all building footprints on the parcel
      buildingFootprintSqFt = buildings.reduce(
        (sum: number, b: { properties?: { ed_bldg_footprint_sqft?: number } }) =>
          sum + (b.properties?.ed_bldg_footprint_sqft ?? 0),
        0
      );
      if (buildingFootprintSqFt === 0) buildingFootprintSqFt = null;
    }

    if (!lotSqFt && !buildingFootprintSqFt) return null;

    return { lotSqFt, buildingFootprintSqFt };
  } catch (error) {
    console.error("Regrid API error:", error);
    return null;
  }
}

/**
 * Calculate polygon area in sq ft from GeoJSON coordinates.
 * Uses the Shoelace formula on projected coordinates (rough approximation).
 */
function calculatePolygonAreaSqFt(
  geometry: { type: string; coordinates: number[][][] }
): number | null {
  try {
    const coords =
      geometry.type === "MultiPolygon"
        ? (geometry.coordinates as unknown as number[][][][])[0][0]
        : geometry.coordinates[0];

    if (!coords || coords.length < 3) return null;

    // Approximate meters per degree at OKC latitude (~35.4°N)
    const latRad = (35.4 * Math.PI) / 180;
    const metersPerDegreeLat = 111132;
    const metersPerDegreeLng = 111132 * Math.cos(latRad);

    // Shoelace formula in meters
    let area = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      const x1 = coords[i][0] * metersPerDegreeLng;
      const y1 = coords[i][1] * metersPerDegreeLat;
      const x2 = coords[i + 1][0] * metersPerDegreeLng;
      const y2 = coords[i + 1][1] * metersPerDegreeLat;
      area += x1 * y2 - x2 * y1;
    }
    area = Math.abs(area) / 2;

    // Convert sq meters to sq feet
    const sqFt = Math.round(area * 10.7639);
    return sqFt > 0 ? sqFt : null;
  } catch {
    return null;
  }
}

/**
 * Fallback estimation from zip code
 */
function estimateFromZip(address: string) {
  const zipMatch = address.match(/\b(\d{5})(?:-\d{4})?\b/);
  const prefix = zipMatch?.[1]?.slice(0, 3);
  const lotSqFt = (prefix && OKC_AVG_LOT_SQFT[prefix]) || DEFAULT_LOT_SQFT;
  const buildingFootprintSqFt = Math.round(lotSqFt * BUILDING_RATIO);
  const hardscapeSqFt = Math.round(lotSqFt * HARDSCAPE_RATIO);
  const lawnSqFt = lotSqFt - buildingFootprintSqFt - hardscapeSqFt;

  return {
    lotSqFt,
    buildingFootprintSqFt,
    lawnSqFt,
    drivewaySqFt: Math.round(hardscapeSqFt * 0.7),
    sidewalkSqFt: Math.round(hardscapeSqFt * 0.3),
  };
}

/**
 * Main measurement function — tries real APIs, falls back to estimation.
 */
export async function measureProperty(
  address: string
): Promise<MeasurementResult> {
  // Step 1: Geocode
  const geo = await geocode(address);

  if (!geo) {
    // Can't geocode — use pure estimation
    const est = estimateFromZip(address);
    const lat = 35.4676 + (Math.random() - 0.5) * 0.1;
    const lng = -97.5164 + (Math.random() - 0.5) * 0.1;
    return {
      lat: Math.round(lat * 10000) / 10000,
      lng: Math.round(lng * 10000) / 10000,
      formattedAddress: address,
      ...est,
      source: "estimate",
    };
  }

  // Step 2: Try Regrid parcel data
  const parcel = await getParcelData(geo.lat, geo.lng);

  if (!parcel || (!parcel.lotSqFt && !parcel.buildingFootprintSqFt)) {
    // Regrid returned nothing (trial county restriction or no data)
    // Use real lat/lng from Google + zip estimation for areas
    const est = estimateFromZip(geo.formattedAddress);
    return {
      lat: geo.lat,
      lng: geo.lng,
      formattedAddress: geo.formattedAddress,
      ...est,
      source: "estimate",
    };
  }

  // Combine Regrid data with estimation for missing values
  const lotSqFt = parcel.lotSqFt ?? DEFAULT_LOT_SQFT;
  const buildingFootprintSqFt =
    parcel.buildingFootprintSqFt ?? Math.round(lotSqFt * BUILDING_RATIO);
  const hardscapeSqFt = Math.round(lotSqFt * HARDSCAPE_RATIO);
  const lawnSqFt = Math.max(
    0,
    lotSqFt - buildingFootprintSqFt - hardscapeSqFt
  );

  return {
    lat: geo.lat,
    lng: geo.lng,
    formattedAddress: geo.formattedAddress,
    lotSqFt,
    buildingFootprintSqFt,
    lawnSqFt,
    drivewaySqFt: Math.round(hardscapeSqFt * 0.7),
    sidewalkSqFt: Math.round(hardscapeSqFt * 0.3),
    source: parcel.lotSqFt ? "regrid" : "google+regrid",
  };
}
