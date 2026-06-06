import { db } from "./db";
import {
  inquiries, announcements, events, team, circulars, gallery,
  galleryAlbums, memberships, admins, heroSlides,
  type InsertInquiry, type InquiryResponse, type AnnouncementResponse,
  type Event, type TeamMember, type Circular, type GalleryItem,
  type GalleryAlbum, type Membership, type Admin, type HeroSlide,
} from "@shared/schema";
import { desc, eq } from "drizzle-orm";

export class DatabaseStorage {
  async getHeroSlides(): Promise<HeroSlide[]> {
    return db.select().from(heroSlides).orderBy(heroSlides.order);
  }
  async createHeroSlide(data: Omit<HeroSlide, "id" | "createdAt">): Promise<HeroSlide> {
    const [r] = await db.insert(heroSlides).values(data).returning();
    return r;
  }
  async updateHeroSlide(id: number, data: Partial<HeroSlide>): Promise<HeroSlide> {
    const [r] = await db.update(heroSlides).set(data).where(eq(heroSlides.id, id)).returning();
    return r;
  }
  async deleteHeroSlide(id: number): Promise<void> {
    await db.delete(heroSlides).where(eq(heroSlides.id, id));
  }
  async createInquiry(inquiry: InsertInquiry): Promise<InquiryResponse> {
    const [r] = await db.insert(inquiries).values(inquiry).returning();
    return r;
  }
  async getAnnouncements(): Promise<AnnouncementResponse[]> {
    return db.select().from(announcements).orderBy(desc(announcements.date));
  }
  async createAnnouncement(data: { title: string; content: string; pinned?: boolean; imageUrl?: string }): Promise<AnnouncementResponse> {
    const [r] = await db.insert(announcements).values(data).returning();
    return r;
  }
  async updateAnnouncement(id: number, data: Partial<AnnouncementResponse>): Promise<AnnouncementResponse> {
    const [r] = await db.update(announcements).set(data).where(eq(announcements.id, id)).returning();
    return r;
  }
  async deleteAnnouncement(id: number): Promise<void> {
    await db.delete(announcements).where(eq(announcements.id, id));
  }
  async getEvents(): Promise<Event[]> {
    return db.select().from(events).orderBy(desc(events.eventDate));
  }
  async createEvent(data: Omit<Event, "id" | "createdAt">): Promise<Event> {
    const [r] = await db.insert(events).values(data).returning();
    return r;
  }
  async updateEvent(id: number, data: Partial<Event>): Promise<Event> {
    const [r] = await db.update(events).set(data).where(eq(events.id, id)).returning();
    return r;
  }
  async deleteEvent(id: number): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }
  async getTeam(): Promise<TeamMember[]> {
    return db.select().from(team).orderBy(team.order);
  }
  async createTeamMember(data: Omit<TeamMember, "id">): Promise<TeamMember> {
    const [r] = await db.insert(team).values(data).returning();
    return r;
  }
  async updateTeamMember(id: number, data: Partial<TeamMember>): Promise<TeamMember> {
    const [r] = await db.update(team).set(data).where(eq(team.id, id)).returning();
    return r;
  }
  async deleteTeamMember(id: number): Promise<void> {
    await db.delete(team).where(eq(team.id, id));
  }
  async getCirculars(): Promise<Circular[]> {
    return db.select().from(circulars).orderBy(desc(circulars.date));
  }
  async createCircular(data: Omit<Circular, "id" | "date">): Promise<Circular> {
    const [r] = await db.insert(circulars).values(data).returning();
    return r;
  }
  async updateCircular(id: number, data: Partial<Circular>): Promise<Circular> {
    const [r] = await db.update(circulars).set(data).where(eq(circulars.id, id)).returning();
    return r;
  }
  async deleteCircular(id: number): Promise<void> {
    await db.delete(circulars).where(eq(circulars.id, id));
  }
  async getGalleryItems(): Promise<GalleryItem[]> {
    return db.select().from(gallery).orderBy(desc(gallery.createdAt));
  }
  async createGalleryItem(data: Omit<GalleryItem, "id" | "createdAt">): Promise<GalleryItem> {
    const [r] = await db.insert(gallery).values(data).returning();
    return r;
  }
  async deleteGalleryItem(id: number): Promise<void> {
    await db.delete(gallery).where(eq(gallery.id, id));
  }
  async getGalleryAlbums(): Promise<GalleryAlbum[]> {
    return db.select().from(galleryAlbums).orderBy(desc(galleryAlbums.createdAt));
  }
  async createGalleryAlbum(data: Omit<GalleryAlbum, "id" | "createdAt">): Promise<GalleryAlbum> {
    const [r] = await db.insert(galleryAlbums).values(data).returning();
    return r;
  }
  async deleteGalleryAlbum(id: number): Promise<void> {
    await db.delete(galleryAlbums).where(eq(galleryAlbums.id, id));
  }
  async getMemberships(): Promise<Membership[]> {
    return db.select().from(memberships).orderBy(desc(memberships.createdAt));
  }
  async createMembership(data: Omit<Membership, "id" | "createdAt">): Promise<Membership> {
    const [r] = await db.insert(memberships).values(data).returning();
    return r;
  }
  async updateMembership(id: number, data: Partial<Membership>): Promise<Membership> {
    const [r] = await db.update(memberships).set(data).where(eq(memberships.id, id)).returning();
    return r;
  }
  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    const [r] = await db.select().from(admins).where(eq(admins.email, email));
    return r;
  }
  async createAdmin(data: { email: string; passwordHash: string; name?: string }): Promise<Admin> {
    const [r] = await db.insert(admins).values(data).returning();
    return r;
  }
}

export const storage = new DatabaseStorage();
export type IStorage = DatabaseStorage;
