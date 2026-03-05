import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  real,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";

// ============================================
// Services
// ============================================
export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 50 }).notNull(), // 'lawn-care' | 'pest-control'
  description: text("description"),
  shortDescription: text("short_description"),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// Service Areas
// ============================================
export const serviceAreas = pgTable("service_areas", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  metaTitle: varchar("meta_title", { length: 255 }),
  metaDescription: text("meta_description"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// Pricing Rules
// ============================================
export const pricingRules = pgTable("pricing_rules", {
  id: uuid("id").defaultRandom().primaryKey(),
  serviceId: uuid("service_id").references(() => services.id).notNull(),
  serviceAreaId: uuid("service_area_id").references(() => serviceAreas.id),
  pricePerSqFt: real("price_per_sq_ft"),
  flatPrice: real("flat_price"),
  minPrice: real("min_price"),
  maxPrice: real("max_price"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// Measurements (cached property data)
// ============================================
export const measurements = pgTable("measurements", {
  id: uuid("id").defaultRandom().primaryKey(),
  address: text("address").notNull(),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  lawnSqFt: real("lawn_sq_ft"),
  lotSqFt: real("lot_sq_ft"),
  buildingFootprintSqFt: real("building_footprint_sq_ft"),
  buildingPerimeterFt: real("building_perimeter_ft"),
  drivewaySqFt: real("driveway_sq_ft"),
  sidewalkSqFt: real("sidewalk_sq_ft"),
  rawData: jsonb("raw_data"),
  imageUrl: text("image_url"),
  source: varchar("source", { length: 50 }), // 'google' | 'mapbox' | 'nearmap'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ============================================
// Leads
// ============================================
export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  address: text("address"),
  source: varchar("source", { length: 50 }), // 'widget' | 'form' | 'phone'
  status: varchar("status", { length: 50 }).default("new").notNull(),
  serviceAreaId: uuid("service_area_id").references(() => serviceAreas.id),
  measurementId: uuid("measurement_id").references(() => measurements.id),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// Quotes
// ============================================
export const quotes = pgTable("quotes", {
  id: uuid("id").defaultRandom().primaryKey(),
  leadId: uuid("lead_id").references(() => leads.id).notNull(),
  measurementId: uuid("measurement_id").references(() => measurements.id).notNull(),
  totalPrice: real("total_price").notNull(),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  expiresAt: timestamp("expires_at"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const quoteItems = pgTable("quote_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  quoteId: uuid("quote_id").references(() => quotes.id).notNull(),
  serviceId: uuid("service_id").references(() => services.id).notNull(),
  quantity: integer("quantity").default(1).notNull(),
  unitPrice: real("unit_price").notNull(),
  totalPrice: real("total_price").notNull(),
  metadata: jsonb("metadata"),
});

// ============================================
// Blog Posts
// ============================================
export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }),
  featuredImage: text("featured_image"),
  isPublished: boolean("is_published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// Gallery Images
// ============================================
export const galleryImages = pgTable("gallery_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull(),
  alt: varchar("alt", { length: 500 }),
  category: varchar("category", { length: 100 }), // 'lawn-care' | 'pest-control' | 'team' | 'before-after'
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
