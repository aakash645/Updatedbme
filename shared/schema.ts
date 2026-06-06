import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const heroSlides = pgTable("hero_slides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  highlight: text("highlight").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").default(0),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  pinned: boolean("pinned").default(false),
  imageUrl: text("image_url"),
  date: timestamp("date").defaultNow(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content"),
  location: text("location").notNull(),
  eventDate: timestamp("event_date").notNull(),
  imageUrl: text("image_url"),
  type: text("type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const team = pgTable("team", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  bio: text("bio"),
  order: integer("order"),
});

export const circulars = pgTable("circulars", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  fileUrl: text("file_url"),
  tag: text("tag").default("General"),
  date: timestamp("date").defaultNow(),
});

export const gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  title: text("title"),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  albumId: integer("album_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const galleryAlbums = pgTable("gallery_albums", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  coverImageUrl: text("cover_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const memberships = pgTable("memberships", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  membershipType: text("membership_type").notNull(),
  gstNumber: text("gst_number").notNull(),
  panNumber: text("pan_number"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  pincode: text("pincode"),
  contactPerson: text("contact_person").notNull(),
  designation: text("designation"),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  altPhone: text("alt_phone"),
  gstReturnsUrls: text("gst_returns_urls"),
  invoiceDocUrl: text("invoice_doc_url"),
  paymentOrderId: text("payment_order_id"),
  paymentStatus: text("payment_status").default("pending"),
  razorpayPaymentId: text("razorpay_payment_id"),
  amount: integer("amount"),
  status: text("status").default("submitted"),
  adminNote: text("admin_note"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").default("Admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHeroSlideSchema = createInsertSchema(heroSlides).omit({ id: true, createdAt: true });
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true, createdAt: true });
export const insertAnnouncementSchema = createInsertSchema(announcements).omit({ id: true, date: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true, createdAt: true });
export const insertTeamSchema = createInsertSchema(team).omit({ id: true });
export const insertCircularSchema = createInsertSchema(circulars).omit({ id: true, date: true });
export const insertGallerySchema = createInsertSchema(gallery).omit({ id: true, createdAt: true });
export const insertGalleryAlbumSchema = createInsertSchema(galleryAlbums).omit({ id: true, createdAt: true });
export const insertMembershipSchema = createInsertSchema(memberships).omit({ id: true, createdAt: true });

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type HeroSlide = typeof heroSlides.$inferSelect;
export type InsertHeroSlide = z.infer<typeof insertHeroSlideSchema>;
export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;
export type Event = typeof events.$inferSelect;
export type TeamMember = typeof team.$inferSelect;
export type Circular = typeof circulars.$inferSelect;
export type GalleryItem = typeof gallery.$inferSelect;
export type GalleryAlbum = typeof galleryAlbums.$inferSelect;
export type Membership = typeof memberships.$inferSelect;
export type Admin = typeof admins.$inferSelect;

export type CreateInquiryRequest = InsertInquiry;
export type InquiryResponse = Inquiry;
export type AnnouncementResponse = Announcement;
