-- Phase 8 — Sample co-broke agents
-- Run AFTER 006_phase8_acquisition.sql

INSERT INTO agents (
  id,
  full_name,
  whatsapp,
  email,
  agency,
  commission_rate_pct,
  commission_notes,
  project_tags,
  status,
  notes
) VALUES
  (
    'd1000001-0000-4000-8000-000000000001',
    'Alex Tan — Iskandar Field',
    '60123456789',
    'alex.tan@example.com',
    'Independent',
    50.00,
    '50/50 co-broke on closed rental; 60/40 on sale',
    ARRAY['Forest City', 'R&F Princess Cove'],
    'active',
    'Primary FC + R&F co-broke contact'
  ),
  (
    'd1000001-0000-4000-8000-000000000002',
    'Mei Lin — JB Waterfront',
    '60198765432',
    'meilin@example.com',
    'Waterfront Realty JB',
    50.00,
    'Standard 50/50 split',
    ARRAY['R&F Princess Cove', 'Danga Bay'],
    'active',
    'CIQ and Danga Bay listings'
  ),
  (
    'd1000001-0000-4000-8000-000000000003',
    'Raj Kumar — Danga Bay Specialist',
    '60111222333',
    NULL,
    'Danga Bay Properties',
    45.00,
    '45% to source on rental',
    ARRAY['Danga Bay'],
    'active',
    'Mature tower secondary market'
  )
ON CONFLICT (id) DO NOTHING;
