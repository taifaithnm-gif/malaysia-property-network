-- Malaysia Property Network — Phase 7 Operations
-- Property-linked viewings and WhatsApp tracking on leads

ALTER TABLE viewing_appointments
  ADD COLUMN IF NOT EXISTS listing_id UUID REFERENCES property_listings(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_viewing_appointments_listing_id ON viewing_appointments(listing_id);

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS whatsapp_confirmed BOOLEAN NOT NULL DEFAULT false;
