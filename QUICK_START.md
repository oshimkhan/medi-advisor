# Quick Start Guide

## 🚀 Start Using the App

The medical chatbot is now accessible without login! Here's how to use it:

### Direct Chat (No Login Required)

1. **Open the App**: Navigate to the home page
2. **Start Chatting**: Type your medical question and press Enter
3. **Get AI Response**: Receive instant medical guidance
4. **View History**: Click "History" button to see past conversations
5. **Delete History**: Remove any conversation you don't need

### Optional: Sign In for Enhanced Features

If you want to sign in (optional):

1. **Click "Sign In"** button in the top right
2. **Choose Authentication Method**:
   - **Phone**: Enter your phone number and verify with OTP code
   - **Google**: *Note: Must be enabled in Supabase dashboard*

### What's Saved?

- **Guest Users**: Chat history saved in browser localStorage
- **Authenticated Users**: Chat history saved in secure database

### Troubleshooting

#### "Unsupported provider" error with Google login?

This means Google OAuth is not enabled. To enable:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to: **Authentication** → **Providers**
4. Enable **Google** provider
5. Add your Google OAuth credentials

#### Can't see chat history?

- Guest users: Make sure you're using the same browser
- Authenticated users: Make sure you're signed in

#### Need to clear history?

- **Guest users**: Delete conversations from the History page
- **Authenticated users**: Same as above, or use the delete button

## 🎯 Main Features

✅ Direct chat without authentication  
✅ Chat history with localStorage/database  
✅ View and manage conversations  
✅ Optional sign-in for persistence  
✅ Beautiful, responsive UI  
✅ Real-time AI responses  

## 📝 Notes

- Chat works immediately without any setup
- Sign-in is optional for additional features
- History is browser-specific for guests
- History is synced across devices for authenticated users

