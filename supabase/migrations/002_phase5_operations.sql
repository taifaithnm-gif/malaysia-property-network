-- Malaysia Property Network — Phase 5 Operations Platform
-- Run in Supabase SQL Editor or via: supabase db push

-- ─── OWNER PROPERTY SUBMISSIONS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS owner_property_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_name TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  wechat TEXT,
  project TEXT NOT NULL,
  unit_type TEXT NOT NULL,
  intent TEXT NOT NULL,
  notes TEXT,
  locale TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_owner_submissions_status ON owner_property_submissions(status);
CREATE INDEX IF NOT EXISTS idx_owner_submissions_created_at ON owner_property_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_owner_submissions_project ON owner_property_submissions(project);

DROP TRIGGER IF EXISTS owner_property_submissions_updated_at ON owner_property_submissions;
CREATE TRIGGER owner_property_submissions_updated_at
  BEFORE UPDATE ON owner_property_submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── TENANT REQUESTS ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tenant_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  budget TEXT,
  intent TEXT NOT NULL,
  preferred_project TEXT,
  move_in_date DATE,
  locale TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tenant_requests_status ON tenant_requests(status);
CREATE INDEX IF NOT EXISTS idx_tenant_requests_created_at ON tenant_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tenant_requests_intent ON tenant_requests(intent);

DROP TRIGGER IF EXISTS tenant_requests_updated_at ON tenant_requests;
CREATE TRIGGER tenant_requests_updated_at
  BEFORE UPDATE ON tenant_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── PROPERTY LISTINGS ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS property_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  project TEXT NOT NULL,
  listing_type TEXT NOT NULL CHECK (listing_type IN ('rent', 'sale')),
  property_type TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  size_sqft INTEGER,
  price NUMERIC(12, 2),
  price_label TEXT,
  currency TEXT NOT NULL DEFAULT 'MYR',
  image_url TEXT,
  description TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  locale TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_property_listings_type ON property_listings(listing_type);
CREATE INDEX IF NOT EXISTS idx_property_listings_status ON property_listings(status);
CREATE INDEX IF NOT EXISTS idx_property_listings_featured ON property_listings(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_property_listings_project ON property_listings(project);
CREATE INDEX IF NOT EXISTS idx_property_listings_created_at ON property_listings(created_at DESC);

DROP TRIGGER IF EXISTS property_listings_updated_at ON property_listings;
CREATE TRIGGER property_listings_updated_at
  BEFORE UPDATE ON property_listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────
ALTER TABLE owner_property_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit owner listings" ON owner_property_submissions;
CREATE POLICY "Anyone can submit owner listings"
  ON owner_property_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can read owner submissions" ON owner_property_submissions;
CREATE POLICY "Authenticated users can read owner submissions"
  ON owner_property_submissions FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage owner submissions" ON owner_property_submissions;
CREATE POLICY "Authenticated users can manage owner submissions"
  ON owner_property_submissions FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit tenant requests" ON tenant_requests;
CREATE POLICY "Anyone can submit tenant requests"
  ON tenant_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can read tenant requests" ON tenant_requests;
CREATE POLICY "Authenticated users can read tenant requests"
  ON tenant_requests FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage tenant requests" ON tenant_requests;
CREATE POLICY "Authenticated users can manage tenant requests"
  ON tenant_requests FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can read published listings" ON property_listings;
CREATE POLICY "Anyone can read published listings"
  ON property_listings FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can manage listings" ON property_listings;
CREATE POLICY "Authenticated users can manage listings"
  ON property_listings FOR ALL TO authenticated USING (true) WITH CHECK (true);
