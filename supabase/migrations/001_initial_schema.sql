-- Malaysia Property Network — CRM Schema
-- Run in Supabase SQL Editor or via: supabase db push

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ─── OWNERS ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS owners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  nationality TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'en',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER owners_updated_at
  BEFORE UPDATE ON owners
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── PROPERTIES ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID REFERENCES owners(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  development TEXT,
  unit_number TEXT,
  property_type TEXT,
  bedrooms INTEGER,
  status TEXT NOT NULL DEFAULT 'vacant',
  monthly_rent NUMERIC(10, 2),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_properties_owner_id ON properties(owner_id);
CREATE INDEX IF NOT EXISTS idx_properties_location ON properties(location);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);

CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── TENANTS ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  lease_start DATE,
  lease_end DATE,
  monthly_rent NUMERIC(10, 2),
  status TEXT NOT NULL DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tenants_property_id ON tenants(property_id);
CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants(status);

CREATE TRIGGER tenants_updated_at
  BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── LEADS ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  property_location TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'website',
  locale TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────
ALTER TABLE owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Public can insert leads (website form)
CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated users (admin) can read all CRM data
CREATE POLICY "Authenticated users can read owners"
  ON owners FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can manage owners"
  ON owners FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can read properties"
  ON properties FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can manage properties"
  ON properties FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can read tenants"
  ON tenants FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can manage tenants"
  ON tenants FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can read leads"
  ON leads FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can manage leads"
  ON leads FOR ALL TO authenticated USING (true) WITH CHECK (true);
