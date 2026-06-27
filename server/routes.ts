import type { Express } from "express";
import type { Server } from "http";
import { createHmac, scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { requireAdmin, signToken } from "./auth";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}
async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  const hashBuffer = Buffer.from(hash, "hex");
  const supplied = (await scryptAsync(password, salt, 64)) as Buffer;
  return timingSafeEqual(hashBuffer, supplied);
}

const FEES: Record<string, number> = {
  Annual: 5000, Life: 60000, International: 10000,
  Trade: 5000, Industry: 7500, Importer: 6000, Dealer: 4500,
};

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {

  // ── SEED ─────────────────────────────────────────────────────────────────
  async function seed() {
    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@bme.in";
      const existing = await storage.getAdminByEmail(adminEmail);
      if (!existing) {
        const hash = await hashPassword(process.env.ADMIN_PASSWORD || "Admin@123");
        await storage.createAdmin({ email: adminEmail, passwordHash: hash, name: "BME Admin" });
        console.log("✅ Admin seeded:", adminEmail);
      }
      const announcements = await storage.getAnnouncements();
      if (announcements.length === 0) {
        await storage.createAnnouncement({ title: "BME Conclave 2026", content: "Join us for the flagship national gathering of India's non-ferrous metals industry on April 8-9, 2026 at Bharat Mandapam, New Delhi.", pinned: true });
        await storage.createAnnouncement({ title: "BME App Launching Soon", content: "We are excited to announce the upcoming launch of our new BME Mobile App. Stay tuned." });
        await storage.createAnnouncement({ title: "Benchmark Prices Updated", content: "Latest benchmark prices for Copper and Zinc have been released and circulated to members." });
      }
      const blogs = await storage.getBlogs();
      if (blogs.length === 0) {
        await storage.createBlog({
          title: "Strengthening India's Non-Ferrous Metals Network",
          metaHeading: "Industry Leadership & Member Growth",
          metaDescription: "Learn how BME is helping members connect, comply, and grow across the non-ferrous metals sector.",
          description: "An overview of new member services, policy advocacy, and marketplace intelligence being introduced by BME.",
          content: "BME is continuing its mission with new digital services, events, and regulatory support for members across copper, zinc, aluminum, and specialty metals. Our focus remains on delivering actionable insights, improved networking, and policy representation at both central and state levels. Members can expect expanded training programs, market reports, and a stronger voice in commodity pricing discussions.",
          imageUrl: "/bme1_1773052578105.jpeg",
          publishedAt: new Date(),
        });
      }
      const slides = await storage.getHeroSlides();
      if (slides.length === 0) {
        await storage.createHeroSlide({ title: "The Apex Body of", highlight: "Non-Ferrous Metals", description: "Representing a vast spectrum of the trade and industry. A legacy of excellence powering the national economy with over 800+ active members across India.", imageUrl: "/bme1_1773052578105.jpeg", order: 0, active: true });
        await storage.createHeroSlide({ title: "Empowering India's", highlight: "Metal Trade Network", description: "Connecting manufacturers, traders, recyclers, and industries through a unified national platform since 1933.", imageUrl: "/bme10_1773052578117.jpeg", order: 1, active: true });
        await storage.createHeroSlide({ title: "Driving Innovation in", highlight: "Copper & Zinc Industry", description: "Supporting policy advocacy, market transparency, and industrial growth for India's non-ferrous ecosystem.", imageUrl: "/bme4_1773052578114.jpeg", order: 2, active: true });
      }
    } catch (e) { console.error("Seed error:", e); }
  }
  seed();

  // ── PUBLIC ────────────────────────────────────────────────────────────────
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      res.status(201).json(await storage.createInquiry(input));
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get(api.announcements.list.path, async (_req, res) => { res.json(await storage.getAnnouncements()); });
  app.get(api.blogs.list.path, async (_req, res) => { res.json(await storage.getBlogs()); });
  app.get(api.blogs.detail.path, async (req, res) => {
    const id = Number(req.params.id);
    const blog = await storage.getBlogById(id);
    if (!blog) return res.status(404).json({ message: "Not found" });
    res.json(blog);
  });
  app.get(api.events.list.path,        async (_req, res) => { res.json(await storage.getEvents()); });
  app.get(api.team.list.path,          async (_req, res) => { res.json(await storage.getTeam()); });
  app.get(api.circulars.list.path,     async (_req, res) => { res.json(await storage.getCirculars()); });
  app.get(api.gallery.list.path,       async (_req, res) => { res.json(await storage.getGalleryItems()); });
  app.get("/api/gallery-albums",        async (_req, res) => { res.json(await storage.getGalleryAlbums()); });
  app.get("/api/hero-slides",           async (_req, res) => { res.json(await storage.getHeroSlides()); });

  // ── GST SCAN (AI) ─────────────────────────────────────────────────────────
  app.post("/api/scan-gst", async (req, res) => {
    try {
      const { imageData, mediaType } = req.body;
      const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
      if (!ANTHROPIC_API_KEY) {
        return res.status(400).json({ message: "ANTHROPIC_API_KEY not set in .env — please add it to enable GST scanning" });
      }
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          messages: [{
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: mediaType || "image/jpeg", data: imageData }
              },
              {
                type: "text",
                text: `Extract all information from this GST registration certificate image. Return ONLY a valid JSON object with EXACTLY these keys (leave value as empty string "" if not visible or not found):
{
  "gstin": "15-character GST number",
  "legalName": "legal name of the taxpayer",
  "tradeName": "trade name if different from legal name",
  "address": "full registered address",
  "state": "state name",
  "pincode": "6-digit pincode",
  "dateOfRegistration": "date of GST registration",
  "pan": "10-character PAN number",
  "businessNature": "nature of business",
  "constitutionOfBusiness": "proprietorship / partnership / company etc"
}
Return ONLY the JSON object. No markdown fences, no explanation, no extra text.`
              }
            ]
          }]
        })
      });
      const data = await response.json() as any;
      if (data.error) throw new Error(data.error.message || "Anthropic API error");
      const text = data?.content?.[0]?.text || "{}";
      const clean = text.replace(/```json|```/g, "").trim();
      let parsed: any = {};
      try { parsed = JSON.parse(clean); } catch { parsed = {}; }
      res.json({ success: true, data: parsed });
    } catch (e: any) {
      res.status(500).json({ success: false, message: e.message });
    }
  });

  // ── MEMBERSHIP PUBLIC ─────────────────────────────────────────────────────
  app.post("/api/membership/apply", async (req, res) => {
    try {
      const data = req.body;
      const amount = FEES[data.membershipType] || 5000;
      res.status(201).json(await storage.createMembership({ ...data, amount, paymentStatus: "pending", status: "submitted" }));
    } catch (e: any) { res.status(400).json({ message: e.message }); }
  });

  app.post("/api/membership/create-order", async (req, res) => {
    try {
      const { membershipId } = req.body;
      const all = await storage.getMemberships();
      const membership = all.find(m => m.id === membershipId);
      if (!membership) return res.status(404).json({ message: "Not found" });
      const KEY_ID = process.env.RAZORPAY_KEY_ID;
      const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
      if (!KEY_ID || !KEY_SECRET) {
        return res.json({ orderId: `mock_order_${Date.now()}`, amount: membership.amount, key: "mock_key" });
      }
      const Razorpay = (await import("razorpay" as any)).default;
      const rzp = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET });
      const order = await rzp.orders.create({ amount: (membership.amount || 5000) * 100, currency: "INR", receipt: `bme_${membershipId}` });
      await storage.updateMembership(membershipId, { paymentOrderId: order.id });
      res.json({ orderId: order.id, amount: membership.amount, key: KEY_ID });
    } catch (e: any) { res.status(500).json({ message: e.message }); }
  });

  app.post("/api/membership/verify-payment", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, membershipId } = req.body;
      const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "";
      if (KEY_SECRET) {
        const expected = createHmac("sha256", KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
        if (expected !== razorpay_signature) return res.status(400).json({ message: "Invalid payment signature" });
      }
      const membership = await storage.updateMembership(membershipId, { paymentStatus: "paid", razorpayPaymentId: razorpay_payment_id });
      res.json({ success: true, membership });
    } catch (e: any) { res.status(500).json({ message: e.message }); }
  });

  // ── ADMIN AUTH ─────────────────────────────────────────────────────────────
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await storage.getAdminByEmail(email);
      if (!admin) return res.status(401).json({ message: "Invalid credentials" });
      const ok = await verifyPassword(password, admin.passwordHash);
      if (!ok) return res.status(401).json({ message: "Invalid credentials" });
      res.json({ token: signToken({ id: admin.id, email: admin.email }), name: admin.name, email: admin.email });
    } catch (e: any) { res.status(500).json({ message: e.message }); }
  });

  // ── ADMIN — HERO SLIDES ────────────────────────────────────────────────────
  app.post("/api/admin/hero-slides", requireAdmin, async (req, res) => {
    try { res.status(201).json(await storage.createHeroSlide(req.body)); }
    catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.put("/api/admin/hero-slides/:id", requireAdmin, async (req, res) => {
    try { res.json(await storage.updateHeroSlide(Number(req.params.id), req.body)); }
    catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.delete("/api/admin/hero-slides/:id", requireAdmin, async (req, res) => {
    await storage.deleteHeroSlide(Number(req.params.id)); res.json({ message: "Deleted" });
  });

  // ── ADMIN — ANNOUNCEMENTS ──────────────────────────────────────────────────
  app.post("/api/admin/announcements", requireAdmin, async (req, res) => {
    try { res.status(201).json(await storage.createAnnouncement(req.body)); }
    catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.put("/api/admin/announcements/:id", requireAdmin, async (req, res) => {
    try { res.json(await storage.updateAnnouncement(Number(req.params.id), req.body)); }
    catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.delete("/api/admin/announcements/:id", requireAdmin, async (req, res) => {
    await storage.deleteAnnouncement(Number(req.params.id));
    res.json({ message: "Deleted" });
  });

  // ── ADMIN — BLOGS ─────────────────────────────────────────────────────────
  app.get("/api/admin/blogs", requireAdmin, async (_req, res) => {
    res.json(await storage.getBlogs());
  });
  app.post("/api/admin/blogs", requireAdmin, async (req, res) => {
    try {
      const publishedAtRaw = req.body.publishedAt;
      const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : undefined;
      if (publishedAtRaw && publishedAt && Number.isNaN(publishedAt.getTime())) {
        throw new Error("Invalid publishedAt value");
      }
      res.status(201).json(await storage.createBlog({
        ...req.body,
        ...(publishedAtRaw ? { publishedAt } : {}),
      }));
    } catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.put("/api/admin/blogs/:id", requireAdmin, async (req, res) => {
    try {
      const publishedAtRaw = req.body.publishedAt;
      const publishedAt = publishedAtRaw ? new Date(publishedAtRaw) : undefined;
      if (publishedAtRaw && publishedAt && Number.isNaN(publishedAt.getTime())) {
        throw new Error("Invalid publishedAt value");
      }
      res.json(await storage.updateBlog(Number(req.params.id), {
        ...req.body,
        ...(publishedAtRaw ? { publishedAt } : {}),
      }));
    } catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.delete("/api/admin/blogs/:id", requireAdmin, async (req, res) => {
    await storage.deleteBlog(Number(req.params.id));
    res.json({ message: "Deleted" });
  });

  // ── ADMIN — EVENTS ─────────────────────────────────────────────────────────
  app.post("/api/admin/events", requireAdmin, async (req, res) => {
    try { res.status(201).json(await storage.createEvent({ ...req.body, eventDate: new Date(req.body.eventDate) })); }
    catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.put("/api/admin/events/:id", requireAdmin, async (req, res) => {
    try {
      const data = req.body.eventDate ? { ...req.body, eventDate: new Date(req.body.eventDate) } : req.body;
      res.json(await storage.updateEvent(Number(req.params.id), data));
    } catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.delete("/api/admin/events/:id", requireAdmin, async (req, res) => {
    await storage.deleteEvent(Number(req.params.id)); res.json({ message: "Deleted" });
  });

  // ── ADMIN — CIRCULARS ──────────────────────────────────────────────────────
  app.post("/api/admin/circulars", requireAdmin, async (req, res) => {
    try { res.status(201).json(await storage.createCircular(req.body)); }
    catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.put("/api/admin/circulars/:id", requireAdmin, async (req, res) => {
    try { res.json(await storage.updateCircular(Number(req.params.id), req.body)); }
    catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.delete("/api/admin/circulars/:id", requireAdmin, async (req, res) => {
    await storage.deleteCircular(Number(req.params.id)); res.json({ message: "Deleted" });
  });

  // ── ADMIN — GALLERY ────────────────────────────────────────────────────────
  app.post("/api/admin/gallery", requireAdmin, async (req, res) => {
    try { res.status(201).json(await storage.createGalleryItem(req.body)); }
    catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.delete("/api/admin/gallery/:id", requireAdmin, async (req, res) => {
    await storage.deleteGalleryItem(Number(req.params.id)); res.json({ message: "Deleted" });
  });
  app.post("/api/admin/gallery-albums", requireAdmin, async (req, res) => {
    try {
      const slug = req.body.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      res.status(201).json(await storage.createGalleryAlbum({ ...req.body, slug }));
    } catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.delete("/api/admin/gallery-albums/:id", requireAdmin, async (req, res) => {
    await storage.deleteGalleryAlbum(Number(req.params.id)); res.json({ message: "Deleted" });
  });

  // ── ADMIN — TEAM ───────────────────────────────────────────────────────────
  app.post("/api/admin/team", requireAdmin, async (req, res) => {
    try { res.status(201).json(await storage.createTeamMember(req.body)); }
    catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.put("/api/admin/team/:id", requireAdmin, async (req, res) => {
    try { res.json(await storage.updateTeamMember(Number(req.params.id), req.body)); }
    catch (e: any) { res.status(400).json({ message: e.message }); }
  });
  app.delete("/api/admin/team/:id", requireAdmin, async (req, res) => {
    await storage.deleteTeamMember(Number(req.params.id)); res.json({ message: "Deleted" });
  });

  // ── ADMIN — MEMBERSHIPS ────────────────────────────────────────────────────
  app.get("/api/admin/memberships", requireAdmin, async (_req, res) => {
    res.json(await storage.getMemberships());
  });
  app.put("/api/admin/memberships/:id", requireAdmin, async (req, res) => {
    try { res.json(await storage.updateMembership(Number(req.params.id), req.body)); }
    catch (e: any) { res.status(400).json({ message: e.message }); }
  });

  return httpServer;
}
