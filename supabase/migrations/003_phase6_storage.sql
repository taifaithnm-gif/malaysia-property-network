-- Malaysia Property Network — Phase 6 Storage
-- Run in Supabase SQL Editor after 001 + 002

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'listing-images',
  'listing-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public read listing images" ON storage.objects;
CREATE POLICY "Public read listing images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'listing-images');

DROP POLICY IF EXISTS "Service role upload listing images" ON storage.objects;
CREATE POLICY "Service role upload listing images"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'listing-images');

DROP POLICY IF EXISTS "Service role update listing images" ON storage.objects;
CREATE POLICY "Service role update listing images"
  ON storage.objects FOR UPDATE
  TO service_role
  USING (bucket_id = 'listing-images');

DROP POLICY IF EXISTS "Service role delete listing images" ON storage.objects;
CREATE POLICY "Service role delete listing images"
  ON storage.objects FOR DELETE
  TO service_role
  USING (bucket_id = 'listing-images');

-- Allow authenticated users to manage listings (draft/published) for admin via anon+auth if needed
DROP POLICY IF EXISTS "Service role full access listings" ON property_listings;
CREATE POLICY "Service role full access listings"
  ON property_listings FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role read leads" ON leads;
CREATE POLICY "Service role read leads"
  ON leads FOR SELECT
  TO service_role
  USING (true);

DROP POLICY IF EXISTS "Service role manage leads" ON leads;
CREATE POLICY "Service role manage leads"
  ON leads FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role read owner submissions" ON owner_property_submissions;
CREATE POLICY "Service role read owner submissions"
  ON owner_property_submissions FOR SELECT
  TO service_role
  USING (true);

DROP POLICY IF EXISTS "Service role manage owner submissions" ON owner_property_submissions;
CREATE POLICY "Service role manage owner submissions"
  ON owner_property_submissions FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role read tenant requests" ON tenant_requests;
CREATE POLICY "Service role read tenant requests"
  ON tenant_requests FOR SELECT
  TO service_role
  USING (true);

DROP POLICY IF EXISTS "Service role manage tenant requests" ON tenant_requests;
CREATE POLICY "Service role manage tenant requests"
  ON tenant_requests FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);
