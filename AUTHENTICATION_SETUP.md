# Authentication & Chat History Setup Guide

This document explains how to set up authentication (Google OAuth and Phone) and chat history features for the Medical Chatbot.

## Features

### ✅ Implemented
1. **Google OAuth Authentication** - Sign in with Google
2. **Phone Number Authentication** - Sign in with phone number via OTP
3. **Chat History** - View and manage past conversations like ChatGPT
4. **Login History** - Track login sessions
5. **Protected Routes** - User authentication required to access chat features

## Setup Instructions

### 1. Database Migrations

The following migration files have been created:
- `supabase/migrations/001_create_login_history.sql` - Login tracking
- `supabase/migrations/002_create_chat_history.sql` - Chat conversations and messages storage

### 2. Run Migrations

```bash
# Start Supabase locally
supabase start

# Apply migrations
supabase db reset

# Generate TypeScript types
supabase gen types typescript --local > src/integrations/supabase/types.ts
```

Or use the npm scripts:
```bash
npm run db:types
npm run db:reset
```

### 3. Configure Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure the authorized redirect URIs:
   - For local development: `http://localhost:5173`
   - For production: Your production URL
6. Copy the Client ID and add it to your Supabase project:
   - Go to Supabase Dashboard > Authentication > Providers
   - Enable Google provider
   - Add your Client ID and Client Secret

### 4. Configure Phone Authentication

1. Go to Supabase Dashboard > Authentication > Settings
2. Enable Phone authentication
3. Configure your phone provider (Twilio is recommended)
4. Add your Twilio credentials or use another SMS provider

### 5. Environment Variables

Make sure you have these in your `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## Usage

### Authentication Flow

1. **Sign In Page** (`/login`)
   - Click "Continue with Google" for OAuth
   - Enter phone number and verify OTP for phone auth
   - Users are redirected to the home page after authentication

2. **Main Chat Page** (`/`)
   - Only accessible when signed in
   - Shows "Sign In" button if not authenticated
   - Save all conversations automatically

3. **Chat History** (`/chat-history`)
   - View all past conversations
   - See conversation previews
   - Delete conversations
   - Click on a conversation to resume (coming soon)

4. **Login History** (`/login-history`)
   - View login sessions
   - See IP addresses and devices
   - Track authentication activity

### Features in Code

#### Authentication Context (`src/contexts/AuthContext.tsx`)
- Provides global auth state
- Methods: `signInWithGoogle()`, `signInWithPhone()`, `signOut()`
- Automatically handles session persistence

#### Auto-Save Chat History
- Every message is saved to the database
- Conversations are created automatically
- Messages are linked to conversations
- User-specific with Row Level Security (RLS)

#### Protected Routes
- Users must be authenticated to use chat features
- Public pages: Login, Chat History (view-only)
- Private pages: Main Chat (requires auth)

## Database Schema

### `chat_conversations`
- Stores conversation metadata
- Fields: id, user_id, title, created_at, updated_at

### `chat_messages`
- Stores individual messages
- Fields: id, conversation_id, role, content, created_at
- Role can be 'user' or 'assistant'

### `login_history`
- Tracks user login sessions
- Fields: id, user_id, user_email, login_at, ip_address, user_agent

## Row Level Security (RLS)

All tables have RLS enabled with policies:
- Users can only view their own data
- Users can insert/update/delete their own data
- Service role can insert login history

## Next Steps

### Recommended Enhancements:
1. **Resume Conversations**: Click on a conversation to load and continue it
2. **Rename Conversations**: Allow users to edit conversation titles
3. **Export Chat**: Download conversations as PDF or text
4. **Search Chat History**: Find specific conversations or messages
5. **Share Conversations**: Share chat links with doctors or family

## Troubleshooting

### TypeScript Errors
If you see type errors with database tables:
```bash
npm run db:types
```

### Migration Errors
If migrations fail:
```bash
supabase db reset
```

### Authentication Not Working
- Check Supabase Dashboard > Authentication > URL Configuration
- Verify redirect URLs are correct
- Check provider configuration (Google/Phone)

## Support

For issues or questions:
1. Check Supabase documentation: https://supabase.com/docs
2. Review the migration files in `supabase/migrations/`
3. Check the implementation in `src/contexts/AuthContext.tsx`

