-- Malaysia Property Network — Phase 8 Property Acquisition System

-- ─── AGENTS ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  agency TEXT,
  commission_rate_pct NUMERIC(5, 2),
  commission_notes TEXT,
  project_tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agents_status ON agents(status);
CREATE INDEX IF NOT EXISTS idx_agents_project_tags ON agents USING GIN (project_tags);

DROP TRIGGER IF EXISTS agents_updated_at ON agents;
CREATE TRIGGER agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── PROPERTY IMPORT QUEUE ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS property_import_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_url TEXT NOT NULL,
  source_platform TEXT NOT NULL,
  project TEXT NOT NULL,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  title TEXT,
  notes TEXT,
  listing_id UUID REFERENCES property_listings(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_import_queue_status ON property_import_queue(status);
CREATE INDEX IF NOT EXISTS idx_import_queue_project ON property_import_queue(project);
CREATE INDEX IF NOT EXISTS idx_import_queue_agent ON property_import_queue(agent_id);

DROP TRIGGER IF EXISTS property_import_queue_updated_at ON property_import_queue;
CREATE TRIGGER property_import_queue_updated_at
  BEFORE UPDATE ON property_import_queue
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── OWNER OUTREACH (extend submissions) ─────────────────────────────────────
ALTER TABLE owner_property_submissions
  ADD COLUMN IF NOT EXISTS assigned_agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS owner_outreach_status TEXT NOT NULL DEFAULT 'new',
  ADD COLUMN IF NOT EXISTS agent_contact_status TEXT NOT NULL DEFAULT 'not_contacted';

CREATE INDEX IF NOT EXISTS idx_owner_submissions_assigned_agent ON owner_property_submissions(assigned_agent_id);
CREATE INDEX IF NOT EXISTS idx_owner_submissions_outreach_status ON owner_property_submissions(owner_outreach_status);

CREATE TABLE IF NOT EXISTS outreach_follow_up_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_submission_id UUID NOT NULL REFERENCES owner_property_submissions(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  note TEXT NOT NULL,
  follow_up_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_outreach_logs_owner ON outreach_follow_up_logs(owner_submission_id);
CREATE INDEX IF NOT EXISTS idx_outreach_logs_follow_up ON outreach_follow_up_logs(follow_up_date);

-- ─── CO-BROKE DEALS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS co_broke_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project TEXT NOT NULL,
  listing_id UUID REFERENCES property_listings(id) ON DELETE SET NULL,
  owner_submission_id UUID REFERENCES owner_property_submissions(id) ON DELETE SET NULL,
  source_agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  viewing_agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  commission_amount NUMERIC(12, 2),
  commission_pct NUMERIC(5, 2),
  deal_status TEXT NOT NULL DEFAULT 'prospect',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_co_broke_deal_status ON co_broke_deals(deal_status);
CREATE INDEX IF NOT EXISTS idx_co_broke_source_agent ON co_broke_deals(source_agent_id);
CREATE INDEX IF NOT EXISTS idx_co_broke_viewing_agent ON co_broke_deals(viewing_agent_id);

DROP TRIGGER IF EXISTS co_broke_deals_updated_at ON co_broke_deals;
CREATE TRIGGER co_broke_deals_updated_at
  BEFORE UPDATE ON co_broke_deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ─── LISTING PROVENANCE ───────────────────────────────────────────────────────
ALTER TABLE property_listings
  ADD COLUMN IF NOT EXISTS agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS source_import_id UUID REFERENCES property_import_queue(id) ON DELETE SET NULL;

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_import_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_follow_up_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE co_broke_deals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role manage agents" ON agents;
CREATE POLICY "Service role manage agents"
  ON agents FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role manage import queue" ON property_import_queue;
CREATE POLICY "Service role manage import queue"
  ON property_import_queue FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role manage outreach logs" ON outreach_follow_up_logs;
CREATE POLICY "Service role manage outreach logs"
  ON outreach_follow_up_logs FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role manage co broke deals" ON co_broke_deals;
CREATE POLICY "Service role manage co broke deals"
  ON co_broke_deals FOR ALL TO service_role USING (true) WITH CHECK (true);
