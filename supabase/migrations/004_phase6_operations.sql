-- Malaysia Property Network — Phase 6 Operations
-- Viewing appointments, golf travel, corporate visit inquiries

-- ─── VIEWING APPOINTMENTS ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS viewing_appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  email TEXT,
  project TEXT NOT NULL,
  preferred_date DATE,
  preferred_time TEXT,
  notes TEXT,
  assigned_team TEXT NOT NULL DEFAULT 'unassigned',
  whatsapp_confirmed BOOLEAN NOT NULL DEFAULT false,
  locale TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_viewing_appointments_status ON viewing_appointments(status);
CREATE INDEX IF NOT EXISTS idx_viewing_appointments_date ON viewing_appointments(preferred_date);
CREATE INDEX IF NOT EXISTS idx_viewing_appointments_created_at ON viewing_appointments(created_at DESC);

DROP TRIGGER IF EXISTS viewing_appointments_updated_at ON viewing_appointments;
CREATE TRIGGER viewing_appointments_updated_at
  BEFORE UPDATE ON viewing_appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── GOLF TRAVEL INQUIRIES ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS golf_travel_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  package_type TEXT NOT NULL,
  travel_dates TEXT,
  group_size INTEGER,
  notes TEXT,
  locale TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_golf_travel_status ON golf_travel_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_golf_travel_created_at ON golf_travel_inquiries(created_at DESC);

DROP TRIGGER IF EXISTS golf_travel_inquiries_updated_at ON golf_travel_inquiries;
CREATE TRIGGER golf_travel_inquiries_updated_at
  BEFORE UPDATE ON golf_travel_inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── CORPORATE VISIT INQUIRIES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS corporate_visit_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  company TEXT,
  visit_type TEXT NOT NULL,
  visit_dates TEXT,
  group_size INTEGER,
  notes TEXT,
  locale TEXT NOT NULL DEFAULT 'en',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_corporate_visit_status ON corporate_visit_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_corporate_visit_created_at ON corporate_visit_inquiries(created_at DESC);

DROP TRIGGER IF EXISTS corporate_visit_inquiries_updated_at ON corporate_visit_inquiries;
CREATE TRIGGER corporate_visit_inquiries_updated_at
  BEFORE UPDATE ON corporate_visit_inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────
ALTER TABLE viewing_appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE golf_travel_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE corporate_visit_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can book viewing appointments" ON viewing_appointments;
CREATE POLICY "Anyone can book viewing appointments"
  ON viewing_appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role manage viewing appointments" ON viewing_appointments;
CREATE POLICY "Service role manage viewing appointments"
  ON viewing_appointments FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit golf travel inquiries" ON golf_travel_inquiries;
CREATE POLICY "Anyone can submit golf travel inquiries"
  ON golf_travel_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role manage golf travel inquiries" ON golf_travel_inquiries;
CREATE POLICY "Service role manage golf travel inquiries"
  ON golf_travel_inquiries FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit corporate visit inquiries" ON corporate_visit_inquiries;
CREATE POLICY "Anyone can submit corporate visit inquiries"
  ON corporate_visit_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role manage corporate visit inquiries" ON corporate_visit_inquiries;
CREATE POLICY "Service role manage corporate visit inquiries"
  ON corporate_visit_inquiries FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role manage viewing appointments" ON viewing_appointments;
CREATE POLICY "Service role manage viewing appointments"
  ON viewing_appointments FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role manage golf travel inquiries" ON golf_travel_inquiries;
CREATE POLICY "Service role manage golf travel inquiries"
  ON golf_travel_inquiries FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
