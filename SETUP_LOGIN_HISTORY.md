# Setting Up User Login History Tracking

## Overview
This feature tracks every time a user logs into the application, storing their IP address, device information, and login timestamp.

## Setup Instructions

### 1. Run the Database Migration

Go to your Supabase Dashboard:
1. Navigate to your project: https://supabase.com/dashboard
2. Go to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `supabase/migrations/001_create_login_history.sql`
5. Click **Run** to execute the migration

### 2. Verify the Migration

After running the migration, verify that the table was created:
- Go to **Table Editor** in your Supabase Dashboard
- You should see a new table called `login_history`
- The table should have these columns:
  - `id` (UUID, Primary Key)
  - `user_id` (UUID, Foreign Key to auth.users)
  - `user_email` (Text)
  - `login_at` (Timestamptz)
  - `ip_address` (Text)
  - `user_agent` (Text)
  - `created_at` (Timestamptz)

### 3. Test the Feature

1. Make sure you have authentication enabled in your Supabase project
2. When users sign in, their login will be automatically logged
3. View login history at: `http://localhost:8080/login-history`

## How It Works

- **Automatic Tracking**: Every time a user signs in through Supabase Auth, a trigger automatically logs their session to the `login_history` table
- **Secure**: Row Level Security (RLS) ensures users can only see their own login history
- **Real-time**: New logins appear immediately in the history

## Accessing Login History

Once set up, users can:
- View their complete login history
- See IP addresses of all login sessions
- Identify device types (Mobile, Tablet, Desktop)
- View timestamps of each login

## Configuration

The login history is automatically tracked via:
- Database trigger: `on_user_login`
- Trigger function: `log_user_login()`
- Triggered when: `auth.users.last_sign_in_at` is updated

No additional code changes are needed once the migration is run!

## Troubleshooting

If login history is not being recorded:
1. Check that the migration ran successfully
2. Verify the trigger exists in your database (SQL Editor > Query):
   ```sql
   SELECT * FROM pg_trigger WHERE tgname = 'on_user_login';
   ```
3. Ensure authentication is properly configured in your Supabase project

