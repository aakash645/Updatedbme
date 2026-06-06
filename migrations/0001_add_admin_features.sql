-- Add new columns to existing tables
ALTER TABLE announcements ADD COLUMN IF NOT EXISTS pinned BOOLEAN DEFAULT false;
ALTER TABLE announcements ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE circulars ADD COLUMN IF NOT EXISTS tag TEXT DEFAULT 'General';
ALTER TABLE gallery ADD COLUMN IF NOT EXISTS album_id INTEGER;

-- Gallery Albums
CREATE TABLE IF NOT EXISTS gallery_albums (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  cover_image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Memberships
CREATE TABLE IF NOT EXISTS memberships (
  id SERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  membership_type TEXT NOT NULL,
  gst_number TEXT NOT NULL,
  pan_number TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  contact_person TEXT NOT NULL,
  designation TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  alt_phone TEXT,
  gst_returns_urls TEXT,
  invoice_doc_url TEXT,
  payment_order_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  razorpay_payment_id TEXT,
  amount INTEGER,
  status TEXT DEFAULT 'submitted',
  admin_note TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admins
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT DEFAULT 'Admin',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Hero Slides table (admin-controlled homepage slider)
CREATE TABLE IF NOT EXISTS hero_slides (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  highlight TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  "order" INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add content field to events table for detail page
ALTER TABLE events ADD COLUMN IF NOT EXISTS content TEXT;

-- Add content/body field to circulars table for detail page
ALTER TABLE circulars ADD COLUMN IF NOT EXISTS content TEXT;
