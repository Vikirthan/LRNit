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
-- For this organization, we allow public read for everything
-- But write access should be authenticated (simplified for now)

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON announcements FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON team FOR SELECT USING (true);

-- Note: You will need to add Policies for INSERT/UPDATE/DELETE 
-- based on your Auth requirements in the Supabase Dashboard.
