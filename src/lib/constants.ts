// ============================================
// Business Info
// ============================================
export const BUSINESS = {
  name: "Elite Lawn Care",
  dba: "Weed Control OKC",
  phone: "(405) 735-1223",
  email: "info@weedcontrolokc.com",
  address: {
    street: "8901 S I-35 Service Rd",
    city: "Oklahoma City",
    state: "OK",
    zip: "73149",
  },
  social: {
    facebook: "https://www.facebook.com/EliteLawnCareOK",
    youtube: "https://www.youtube.com/@EliteLawnCareOklahomaCity",
    instagram: "https://www.instagram.com/elitelawncareoklahomacity",
    tiktok: "https://www.tiktok.com/@elitelawncareoklahomacity",
  },
  founded: 2003,
  reviewCount: 1700,
  googleRating: 4.8,
} as const;

// ============================================
// Service Areas (17 OKC metro cities)
// ============================================
export const SERVICE_AREAS = [
  { name: "Oklahoma City", slug: "oklahoma-city-ok" },
  { name: "Edmond", slug: "edmond-ok" },
  { name: "Norman", slug: "norman-ok" },
  { name: "Moore", slug: "moore-ok" },
  { name: "Mustang", slug: "mustang-ok" },
  { name: "Yukon", slug: "yukon-ok" },
  { name: "Blanchard", slug: "blanchard-ok" },
  { name: "Tuttle", slug: "tuttle-ok" },
  { name: "Midwest City", slug: "midwest-city-ok" },
  { name: "Del City", slug: "del-city-ok" },
  { name: "Bethany", slug: "bethany-ok" },
  { name: "Choctaw", slug: "choctaw-ok" },
  { name: "Harrah", slug: "harrah-ok" },
  { name: "Newcastle", slug: "newcastle-ok" },
  { name: "Piedmont", slug: "piedmont-ok" },
  { name: "Oklahoma County", slug: "oklahoma-county-ok" },
  { name: "The Village", slug: "the-village-ok" },
] as const;

// ============================================
// Services
// ============================================
export const LAWN_CARE_SERVICES = [
  { name: "Fertilization", slug: "fertilization" },
  { name: "Weed Control", slug: "weed-control" },
  { name: "Soil Conditioning", slug: "soil-conditioning" },
  { name: "Core Aeration", slug: "core-aeration" },
  { name: "Top Dressing", slug: "top-dressing" },
  { name: "Overseeding", slug: "overseeding" },
  { name: "Grub Control", slug: "grub-control" },
  { name: "Spring Dead Spot Treatment", slug: "spring-dead-spot" },
] as const;

export const PEST_CONTROL_SERVICES = [
  { name: "Perimeter Pest Control", slug: "perimeter" },
  { name: "Mosquito Control", slug: "mosquito" },
  { name: "Flea & Tick Control", slug: "flea-tick" },
  { name: "Chigger Control", slug: "chigger" },
  { name: "Armyworm Control", slug: "armyworm" },
  { name: "Bagworm Treatment", slug: "bagworm" },
  { name: "Webworm Treatment", slug: "webworm" },
] as const;

// ============================================
// Navigation
// ============================================
export const NAV_ITEMS = [
  {
    label: "Services",
    children: [
      { label: "Lawn Care", href: "/lawn-care" },
      { label: "Pest Control", href: "/pest-control" },
    ],
  },
  {
    label: "About",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
      { label: "Awards", href: "/awards" },
      { label: "Careers", href: "/careers" },
    ],
  },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Contact", href: "/contact" },
] as const;
