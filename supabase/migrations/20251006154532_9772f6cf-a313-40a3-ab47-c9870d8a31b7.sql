-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- =====================================================
-- CORE TABLES
-- =====================================================

-- User Profiles Table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  location JSONB,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Roles Table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Business Categories
CREATE TABLE public.business_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Businesses/Directory
CREATE TABLE public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  category_id UUID REFERENCES public.business_categories(id),
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  location JSONB NOT NULL,
  products_services TEXT,
  description TEXT,
  documents_url TEXT[],
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verified_at TIMESTAMP WITH TIME ZONE,
  verified_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cooperatives
CREATE TABLE public.cooperatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  registration_number TEXT UNIQUE,
  established_date DATE,
  total_members INTEGER DEFAULT 0,
  benefits TEXT[],
  membership_fee DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cooperative Members
CREATE TABLE public.cooperative_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cooperative_id UUID REFERENCES public.cooperatives(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  join_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  UNIQUE(cooperative_id, user_id)
);

-- Cooperative Join Requests
CREATE TABLE public.cooperative_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cooperative_id UUID REFERENCES public.cooperatives(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  location JSONB NOT NULL,
  farmer_type TEXT NOT NULL,
  crops TEXT,
  documents_url TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disease Types
CREATE TABLE public.disease_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('disease', 'pest', 'nutrient_deficiency', 'other')),
  description TEXT,
  symptoms TEXT[],
  treatment TEXT,
  prevention TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disease Reports
CREATE TABLE public.disease_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reporter_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  location JSONB NOT NULL,
  crop_type TEXT NOT NULL,
  disease_type_id UUID REFERENCES public.disease_types(id),
  disease_description TEXT NOT NULL,
  affected_area TEXT,
  symptoms TEXT,
  photo_urls TEXT[],
  status TEXT DEFAULT 'reported' CHECK (status IN ('reported', 'investigating', 'confirmed', 'resolved')),
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  verified_by UUID REFERENCES auth.users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Outbreak Locations
CREATE TABLE public.outbreak_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  disease_report_id UUID REFERENCES public.disease_reports(id) ON DELETE CASCADE NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  radius_km DECIMAL(5, 2),
  affected_farms INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Catalog
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Market Prices
CREATE TABLE public.market_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  market_location TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  unit TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  trend TEXT CHECK (trend IN ('up', 'down', 'stable')),
  source TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Tables
CREATE TABLE public.news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  category TEXT,
  author_id UUID REFERENCES auth.users(id),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT,
  category TEXT,
  author TEXT,
  published_date DATE,
  downloads INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.training_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  start_date DATE,
  end_date DATE,
  capacity INTEGER,
  enrolled INTEGER DEFAULT 0,
  trainer TEXT,
  contact_info TEXT,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.tutorials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  estimated_time INTEGER,
  featured_image TEXT,
  steps JSONB,
  created_by UUID REFERENCES auth.users(id),
  published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER,
  category TEXT,
  views INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.podcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT NOT NULL,
  duration INTEGER,
  episode_number INTEGER,
  category TEXT,
  host TEXT,
  guests TEXT[],
  published_date DATE,
  listens INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.tenders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  organization TEXT NOT NULL,
  category TEXT,
  budget_range TEXT,
  deadline DATE NOT NULL,
  requirements TEXT,
  contact_info TEXT,
  document_url TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'awarded')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.consultants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  specialization TEXT[],
  experience_years INTEGER,
  qualifications TEXT[],
  phone TEXT NOT NULL,
  email TEXT,
  location TEXT,
  hourly_rate DECIMAL(10,2),
  availability TEXT,
  bio TEXT,
  profile_image TEXT,
  verified BOOLEAN DEFAULT false,
  rating DECIMAL(3,2),
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat System
CREATE TABLE public.chat_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  last_message TEXT,
  last_message_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_bot BOOLEAN DEFAULT false,
  attachments TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Submissions
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  responded_by UUID REFERENCES auth.users(id),
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Weather Forecasts
CREATE TABLE public.weather_forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  date DATE NOT NULL,
  temperature_high DECIMAL(5,2),
  temperature_low DECIMAL(5,2),
  conditions TEXT,
  precipitation_chance INTEGER,
  wind_speed DECIMAL(5,2),
  humidity INTEGER,
  forecast_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(location, date)
);

-- Farming Tips
CREATE TABLE public.farming_tips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  season TEXT,
  crop_type TEXT,
  relevant_months INTEGER[],
  created_by UUID REFERENCES auth.users(id),
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cooperatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cooperative_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cooperative_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disease_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disease_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outbreak_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_forecasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farming_tips ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- DATABASE FUNCTIONS
-- =====================================================

-- Security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON public.businesses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cooperatives_updated_at BEFORE UPDATE ON public.cooperatives FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cooperative_requests_updated_at BEFORE UPDATE ON public.cooperative_requests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_disease_reports_updated_at BEFORE UPDATE ON public.disease_reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_market_prices_updated_at BEFORE UPDATE ON public.market_prices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_news_articles_updated_at BEFORE UPDATE ON public.news_articles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_training_programs_updated_at BEFORE UPDATE ON public.training_programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tutorials_updated_at BEFORE UPDATE ON public.tutorials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tenders_updated_at BEFORE UPDATE ON public.tenders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_consultants_updated_at BEFORE UPDATE ON public.consultants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_farming_tips_updated_at BEFORE UPDATE ON public.farming_tips FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- Profiles: Users can view all, edit own
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- User Roles: Only admins can manage
CREATE POLICY "User roles viewable by owner and admins"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Business Categories: Public read, admin write
CREATE POLICY "Categories are viewable by everyone"
  ON public.business_categories FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage categories"
  ON public.business_categories FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Businesses: Public read, authenticated write, owner edit
CREATE POLICY "Businesses are viewable by everyone"
  ON public.businesses FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can register businesses"
  ON public.businesses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own businesses"
  ON public.businesses FOR UPDATE
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete businesses"
  ON public.businesses FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Cooperatives: Public read, owner/admin write
CREATE POLICY "Cooperatives are viewable by everyone"
  ON public.cooperatives FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create cooperatives"
  ON public.cooperatives FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM public.businesses WHERE id = business_id
    )
  );

CREATE POLICY "Owners and admins can manage cooperatives"
  ON public.cooperatives FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.businesses WHERE id = business_id
    ) OR public.has_role(auth.uid(), 'admin')
  );

-- Cooperative Members: Members and admins can view
CREATE POLICY "Members can view cooperative membership"
  ON public.cooperative_members FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can join cooperatives"
  ON public.cooperative_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Cooperative Requests: User can view own, admin can view all
CREATE POLICY "Users can view own requests"
  ON public.cooperative_requests FOR SELECT
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated users can submit requests"
  ON public.cooperative_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage requests"
  ON public.cooperative_requests FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Disease Types: Public read, admin write
CREATE POLICY "Disease types are viewable by everyone"
  ON public.disease_types FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage disease types"
  ON public.disease_types FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Disease Reports: Public read, authenticated write, admin manage
CREATE POLICY "Disease reports are viewable by everyone"
  ON public.disease_reports FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can submit disease reports"
  ON public.disease_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own reports"
  ON public.disease_reports FOR UPDATE
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Outbreak Locations: Public read, admin write
CREATE POLICY "Outbreak locations are viewable by everyone"
  ON public.outbreak_locations FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage outbreak locations"
  ON public.outbreak_locations FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Products: Public read, admin write
CREATE POLICY "Products are viewable by everyone"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage products"
  ON public.products FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Market Prices: Public read, authenticated write
CREATE POLICY "Market prices are viewable by everyone"
  ON public.market_prices FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can add market prices"
  ON public.market_prices FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins can manage market prices"
  ON public.market_prices FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Content Tables: Public read published, admin manage all
CREATE POLICY "Published news are viewable by everyone"
  ON public.news_articles FOR SELECT
  USING (published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage news"
  ON public.news_articles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Publications are viewable by everyone"
  ON public.publications FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage publications"
  ON public.publications FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Training programs are viewable by everyone"
  ON public.training_programs FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage training programs"
  ON public.training_programs FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Published tutorials are viewable by everyone"
  ON public.tutorials FOR SELECT
  USING (published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage tutorials"
  ON public.tutorials FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Published videos are viewable by everyone"
  ON public.videos FOR SELECT
  USING (published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage videos"
  ON public.videos FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Podcasts are viewable by everyone"
  ON public.podcasts FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage podcasts"
  ON public.podcasts FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Tenders are viewable by everyone"
  ON public.tenders FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage tenders"
  ON public.tenders FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Consultants are viewable by everyone"
  ON public.consultants FOR SELECT
  USING (true);

CREATE POLICY "Users can register as consultants"
  ON public.consultants FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own consultant profile"
  ON public.consultants FOR UPDATE
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Chat System: Users can only access their own conversations
CREATE POLICY "Users can view own conversations"
  ON public.chat_conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create conversations"
  ON public.chat_conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view messages in own conversations"
  ON public.chat_messages FOR SELECT
  USING (
    conversation_id IN (
      SELECT id FROM public.chat_conversations WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages in own conversations"
  ON public.chat_messages FOR INSERT
  WITH CHECK (
    conversation_id IN (
      SELECT id FROM public.chat_conversations WHERE user_id = auth.uid()
    )
  );

-- Contact Submissions: Authenticated can submit, admin can view all
CREATE POLICY "Users can submit contact forms"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage contact submissions"
  ON public.contact_submissions FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Weather Forecasts: Public read, admin write
CREATE POLICY "Weather forecasts are viewable by everyone"
  ON public.weather_forecasts FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage weather forecasts"
  ON public.weather_forecasts FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Farming Tips: Public read published, admin manage all
CREATE POLICY "Published farming tips are viewable by everyone"
  ON public.farming_tips FOR SELECT
  USING (published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage farming tips"
  ON public.farming_tips FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================

INSERT INTO storage.buckets (id, name, public) VALUES 
  ('business-documents', 'business-documents', false),
  ('disease-report-photos', 'disease-report-photos', true),
  ('profile-avatars', 'profile-avatars', true),
  ('content-media', 'content-media', true),
  ('chat-attachments', 'chat-attachments', false);

-- Storage Policies for business-documents
CREATE POLICY "Authenticated users can upload business documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'business-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own business documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'business-documents' 
    AND (auth.uid()::text = (storage.foldername(name))[1] OR public.has_role(auth.uid(), 'admin'))
  );

-- Storage Policies for disease-report-photos (public)
CREATE POLICY "Anyone can view disease report photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'disease-report-photos');

CREATE POLICY "Authenticated users can upload disease report photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'disease-report-photos' AND auth.uid() IS NOT NULL);

-- Storage Policies for profile-avatars (public)
CREATE POLICY "Anyone can view profile avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'profile-avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage Policies for content-media (public)
CREATE POLICY "Anyone can view content media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'content-media');

CREATE POLICY "Admins can manage content media"
  ON storage.objects FOR ALL
  USING (bucket_id = 'content-media' AND public.has_role(auth.uid(), 'admin'));

-- Storage Policies for chat-attachments (private)
CREATE POLICY "Users can view chat attachments in own conversations"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'chat-attachments' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can upload chat attachments"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'chat-attachments' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- =====================================================
-- INITIAL DATA SEEDING
-- =====================================================

-- Seed Business Categories
INSERT INTO public.business_categories (name, description, icon) VALUES
  ('Cooperative', 'Agricultural cooperatives and farmer groups', 'Users'),
  ('Supplier', 'Agricultural input suppliers', 'Package'),
  ('Transporter', 'Logistics and transportation services', 'Truck'),
  ('Consultant', 'Agricultural consultants and advisors', 'Briefcase'),
  ('Processor', 'Food processing and value addition', 'Factory'),
  ('Trader', 'Agricultural commodity traders', 'ShoppingCart');

-- Seed Disease Types
INSERT INTO public.disease_types (name, category, description, symptoms, treatment, prevention) VALUES
  ('Cassava Mosaic Disease', 'disease', 'Viral disease affecting cassava plants', 
   ARRAY['Leaf distortion', 'Chlorotic mottling', 'Stunted growth'], 
   'Remove and destroy infected plants', 
   'Use disease-free planting materials'),
  ('Maize Streak Virus', 'disease', 'Viral disease in maize', 
   ARRAY['Pale streaks on leaves', 'Stunted growth'], 
   'Control leafhopper vectors', 
   'Plant resistant varieties'),
  ('Fall Armyworm', 'pest', 'Invasive pest affecting cereals', 
   ARRAY['Holes in leaves', 'Damaged growing points'], 
   'Apply appropriate pesticides', 
   'Regular field monitoring'),
  ('Banana Bacterial Wilt', 'disease', 'Bacterial disease in bananas', 
   ARRAY['Wilting leaves', 'Premature fruit ripening'], 
   'Remove infected plants', 
   'Use clean farm tools');

-- Seed Products
INSERT INTO public.products (name, category, unit) VALUES
  ('Maize', 'Cereals', 'kg'),
  ('Sorghum', 'Cereals', 'kg'),
  ('Cassava', 'Root Crops', 'kg'),
  ('Sweet Potato', 'Root Crops', 'kg'),
  ('Beans', 'Legumes', 'kg'),
  ('Groundnuts', 'Legumes', 'kg'),
  ('Sesame', 'Oil Crops', 'kg'),
  ('Tomatoes', 'Vegetables', 'kg'),
  ('Onions', 'Vegetables', 'kg');

-- Enable Realtime for Chat
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.disease_reports;
ALTER PUBLICATION supabase_realtime ADD TABLE public.market_prices;