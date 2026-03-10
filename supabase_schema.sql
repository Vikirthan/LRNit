-- Create Announcements Table
CREATE TABLE announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  content TEXT,
  date TIMESTAMPTZ DEFAULT now(),
  priority TEXT DEFAULT 'Normal'
);

-- Create Events Table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  title TEXT NOT NULL,
  category TEXT,
  date TIMESTAMPTZ,
  description TEXT,
  status TEXT DEFAULT 'Upcoming',
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  banner_color TEXT DEFAULT '#0B3D91'
);

-- Create Gallery Table
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  url TEXT NOT NULL,
  category TEXT,
  caption TEXT,
  date TIMESTAMPTZ DEFAULT now()
);

-- Create Team Table
CREATE TABLE team (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  role TEXT,
  team_name TEXT,
  photo_url TEXT,
  display_order INTEGER DEFAULT 0
);

-- Set up Row Level Security (RLS)
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies
CREATE POLICY "Allow public read" ON announcements FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON team FOR SELECT USING (true);

-- 2. Authenticated CRUD Policies (For your Admin Login)
CREATE POLICY "Allow authenticated insert" ON announcements FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON announcements FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON announcements FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON events FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON events FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON gallery FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert" ON team FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON team FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON team FOR DELETE USING (auth.role() = 'authenticated');

-- 3. Storage Policies (If using 'images' bucket)
-- Make sure to create the 'images' bucket first in the Storage dashboard
-- These policies allow authenticated users to manage files
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Allow authenticated upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Allow public select" ON storage.objects FOR SELECT USING (bucket_id = 'images');
