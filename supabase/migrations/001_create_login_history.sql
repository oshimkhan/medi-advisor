-- Create a table to track user login history
CREATE TABLE IF NOT EXISTS public.login_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email TEXT,
  login_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.login_history ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own login history
CREATE POLICY "Users can view their own login history"
  ON public.login_history
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow service role to insert login history
CREATE POLICY "Service role can insert login history"
  ON public.login_history
  FOR INSERT
  WITH CHECK (true);

-- Create an index for faster queries
CREATE INDEX idx_login_history_user_id ON public.login_history(user_id);
CREATE INDEX idx_login_history_login_at ON public.login_history(login_at DESC);

-- Create a function to log user login (called by trigger)
CREATE OR REPLACE FUNCTION public.log_user_login()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.login_history (user_id, user_email, ip_address, user_agent)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_app_meta_data->>'ip_address',
    NEW.raw_app_meta_data->>'user_agent'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically log logins
-- Note: This will trigger when a user signs in (when their session is created)
DROP TRIGGER IF EXISTS on_user_login ON auth.users;
CREATE TRIGGER on_user_login
  AFTER UPDATE OF last_sign_in_at ON auth.users
  FOR EACH ROW
  WHEN (OLD.last_sign_in_at IS DISTINCT FROM NEW.last_sign_in_at)
  EXECUTE FUNCTION public.log_user_login();

