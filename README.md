# MediAssist AI

> **AI-Powered Medical Assistant with Secure Authentication & Chat History**

A sophisticated medical chatbot application that provides symptom analysis, specialist recommendations, and health guidance with enterprise-grade authentication and conversation management.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-21.0.0-3ECF8E?logo=supabase)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?logo=vite)](https://vitejs.dev/)

## 🛠️ Technologies & Tools Used

### Frontend Technologies
![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-purple?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.3-red?style=for-the-badge&logo=react-router&logoColor=white)

### UI Libraries
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcn&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-000000?style=for-the-badge&logo=radix-ui&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-F59E0B?style=for-the-badge&logo=lucide&logoColor=white)

### Backend & Database
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Edge Functions](https://img.shields.io/badge/Supabase_Edge_Functions-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### AI & Machine Learning
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
![AI Gateway](https://img.shields.io/badge/AI_Gateway-Lovable-9F7AEA?style=for-the-badge&logo=openai&logoColor=white)

### State Management
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![React Context](https://img.shields.io/badge/React_Context-61DAFB?style=for-the-badge&logo=react&logoColor=white)

### Development Tools
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-9.0+-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

### Languages Used
```
📝 TypeScript  - Type-safe development
⚛️  JavaScript  - Core language
🗄️  SQL        - Database queries
🎨 HTML/CSS    - Structure & styling
📄 JSON        - Configuration files
```

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Authentication](#authentication)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Security](#security)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

MediAssist AI is a comprehensive medical assistant application that combines advanced AI capabilities with secure user authentication and persistent chat history. The application provides:

- **Real-time Medical Guidance**: Interactive AI-powered symptom analysis and recommendations
- **Secure Authentication**: Google OAuth and phone-based OTP authentication
- **Chat History Management**: Persistent conversation storage and retrieval (ChatGPT-style)
- **Specialist Recommendations**: AI suggests appropriate medical departments
- **Emergency Detection**: Automatic flagging of urgent medical situations

## ✨ Features

### 🩺 Medical AI Capabilities
- **Symptom Analysis**: Interactive chat interface for describing and analyzing symptoms
- **Department Recommendations**: Suggests appropriate medical specialists (Cardiology, Neurology, Orthopedics, etc.)
- **Emergency Detection**: Automatically flags urgent symptoms requiring immediate attention
- **Health Education**: Provides clear, non-technical explanations of possible conditions
- **Real-time Streaming**: Fast, responsive chat experience with streaming AI responses
- **Medical Disclaimers**: Always includes appropriate legal and medical disclaimers

### 🔐 Authentication & User Management
- **Multi-Provider Auth**: Sign in with Google OAuth or phone number
- **Session Management**: Persistent sessions with auto-refresh
- **Login History**: Track all authentication events with IP and device information
- **User Profiles**: Avatar-based user interface with profile management
- **Row-Level Security**: Database-level security with user-specific data access

### 💬 Chat History & Management
- **Auto-Save**: All conversations automatically saved to database
- **Conversation View**: Browse past conversations with message previews
- **Delete Conversations**: Remove unwanted chat history
- **Message Timestamps**: Track when conversations were created and updated
- **ChatGPT-like Interface**: Familiar chat history UI patterns

### 🎨 User Interface
- **Modern Design**: Beautiful gradient interface with shadcn/ui components
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Loading States**: Smooth loading indicators for better UX
- **Error Handling**: Comprehensive error messages and fallbacks
- **Toast Notifications**: User-friendly feedback for all actions

## 🛠️ Detailed Tech Stack

### 🌐 Frontend Technologies

| Technology | Purpose | Version |
|-----------|---------|---------|
| **React** | UI framework with hooks and context | 18.3.1 |
| **TypeScript** | Type-safe JavaScript development | 5.8.3 |
| **Vite** | Fast build tool and dev server | 5.4.19 |
| **React Router** | Client-side routing and navigation | 6.30.1 |
| **TanStack Query** | Data fetching and server state sync | 5.83.0 |

### 🎨 UI & Styling

| Library | Purpose | Details |
|---------|---------|---------|
| **Tailwind CSS** | Utility-first CSS framework | 3.4.17 |
| **shadcn/ui** | High-quality component library | Latest |
| **Radix UI** | Headless UI primitives | Various versions |
| **Lucide React** | Beautiful icon library | 0.462.0 |
| **class-variance-authority** | Component variants | 0.7.1 |

### 🔧 Backend & Database

| Technology | Purpose | Details |
|-----------|---------|---------|
| **Supabase** | Backend-as-a-Service platform | 2.76.1 |
| **PostgreSQL** | Relational database | Via Supabase |
| **Edge Functions** | Serverless backend functions | Deno runtime |
| **Row Level Security** | Database access control | Built-in |

### 🤖 AI & Machine Learning

| Technology | Purpose | Details |
|-----------|---------|---------|
| **Google Gemini** | AI model for medical assistance | 2.5 Flash |
| **AI Gateway** | API gateway for AI requests | Lovable.dev |
| **Streaming API** | Real-time response streaming | SSE protocol |

### 🔐 Authentication & Security

| Technology | Purpose | Details |
|-----------|---------|---------|
| **Supabase Auth** | Authentication system | Google OAuth, Phone OTP |
| **JWT Tokens** | Secure session management | Auto-refresh enabled |
| **Row Level Security** | Database-level security | Policy-driven access |

### 🛠️ Development Tools

| Tool | Purpose | Details |
|------|---------|---------|
| **Node.js** | JavaScript runtime | 18+ |
| **npm** | Package manager | 9.0+ |
| **ESLint** | Code linting | 9.32.0 |
| **TypeScript ESLint** | Type-aware linting | 8.38.0 |
| **Vite** | Dev server and bundler | 5.4.19 |
| **Supabase CLI** | Local development | Latest |

### 📦 Key Dependencies

**Form Handling & Validation**
- `react-hook-form` - Form state management
- `zod` - Schema validation
- `@hookform/resolvers` - Form integration

**UI Components**
- `@radix-ui/*` - Headless UI primitives (19 packages)
- All shadcn/ui components

**Utils & Helpers**
- `date-fns` - Date manipulation
- `clsx` & `tailwind-merge` - Conditional styling
- `lucide-react` - Icon library

### Development Tools
- **ESLint** - Code quality and consistency
- **TypeScript ESLint** - Type-aware linting rules
- **Prettier** - Automatic code formatting (via editor)
- **Git** - Version control

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- **Supabase CLI** ([Install Supabase CLI](https://supabase.com/docs/guides/cli))
- **Supabase Account** and project

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd medicalchatbot/medi-advisor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase locally**
   ```bash
   supabase start
   ```

5. **Run database migrations**
   ```bash
   npm run db:reset
   ```

6. **Generate TypeScript types**
   ```bash
   npm run db:types
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Access the application**

   Visit `http://localhost:5173` in your browser.

### Initial Setup

1. **Configure Google OAuth** (in Supabase Dashboard):
   - Navigate to Authentication > Providers
   - Enable Google provider
   - Add OAuth credentials

2. **Configure AI API Key** (in Supabase Dashboard):
   - Navigate to Edge Functions > medical-chat
   - Add environment variable: `AI_API_KEY=your_api_key`

3. **Deploy Edge Functions**:
   ```bash
   supabase functions deploy medical-chat
   ```

## 🔐 Authentication

The application supports two authentication methods:

### Google OAuth
- Click "Continue with Google" on the login page
- Redirects to Google sign-in
- Automatically creates user account in Supabase
- Sessions persist across browser refreshes

### Phone Authentication
- Enter phone number (with country code)
- Receive OTP via SMS
- Enter verification code
- Secure access to chat features

### Session Management
- Automatic token refresh
- Session persistence in localStorage
- Secure logout functionality
- Login history tracking

For detailed authentication setup, see [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md).

## 📁 Project Structure

```
medi-advisor/
├── src/
│   ├── components/          # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── ChatMessage.tsx # Message bubble component
│   │   ├── ChatInput.tsx   # Input field for messages
│   │   ├── TypingIndicator.tsx  # Loading indicator
│   │   └── WelcomeCard.tsx # Welcome screen
│   ├── contexts/           # React context providers
│   │   └── AuthContext.tsx # Authentication state management
│   ├── hooks/             # Custom React hooks
│   │   ├── use-mobile.tsx # Mobile detection hook
│   │   └── use-toast.ts   # Toast notification hook
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Main chat interface
│   │   ├── Login.tsx      # Authentication page
│   │   ├── ChatHistory.tsx # Conversation history
│   │   ├── LoginHistory.tsx # Login session history
│   │   └── NotFound.tsx   # 404 page
│   ├── integrations/      # Third-party integrations
│   │   └── supabase/      # Supabase client
│   │       ├── client.ts  # Supabase client setup
│   │       └── types.ts   # Generated database types
│   ├── lib/              # Utility functions
│   │   └── utils.ts       # Helper utilities
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── supabase/
│   ├── functions/         # Edge Functions
│   │   └── medical-chat/  # AI chat handler
│   │       └── index.ts   # Function implementation
│   ├── migrations/        # Database migrations
│   │   ├── 001_create_login_history.sql
│   │   └── 002_create_chat_history.sql
│   └── config.toml        # Supabase configuration
├── public/               # Static assets
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run build:dev        # Build in development mode
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Database
npm run db:types         # Generate TypeScript types from database
npm run db:reset         # Reset local database and run migrations
```

### Development Workflow

1. **Start Supabase locally**
   ```bash
   supabase start
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Make changes**
   - Edit files in `src/`
   - Changes auto-reload in browser

4. **Run linting**
   ```bash
   npm run lint
   ```

5. **Generate types** (after schema changes)
   ```bash
   npm run db:types
   ```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Auto-formatting enabled
- **Components**: Use shadcn/ui patterns

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Configure environment variables**
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_PUBLISHABLE_KEY`

### Database Migration

1. **Push migrations to production**
   ```bash
   supabase db push
   ```

2. **Deploy Edge Functions**
   ```bash
   supabase functions deploy medical-chat
   ```

### Environment Variables

**Frontend** (Vercel/Netlify):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

**Supabase Edge Function**:
- `AI_API_KEY`

## 🔒 Security

### Database Security
- **Row-Level Security (RLS)**: Enabled on all tables
- **User Data Isolation**: Users can only access their own data
- **Secure Policies**: All CRUD operations protected by RLS policies

### Authentication Security
- **Secure Session Management**: HTTP-only cookies (via Supabase)
- **Token Refresh**: Automatic token renewal
- **Session Validation**: Server-side session verification

### API Security
- **CORS Headers**: Configured for allowed origins
- **Rate Limiting**: Implemented at API Gateway level
- **Input Validation**: All user inputs validated
- **SQL Injection Prevention**: Parameterized queries

## 📚 API Documentation

### Edge Function: `medical-chat`

**Endpoint**: `POST /functions/v1/medical-chat`

**Request**:
```json
{
  "messages": [
    { "role": "user", "content": "I have chest pain" }
  ]
}
```

**Response**: Server-Sent Events (SSE) stream

**Rate Limits**: Configured via AI Gateway

## 🧪 Testing

### Manual Testing Checklist
- [ ] User authentication (Google & Phone)
- [ ] Chat message sending and receiving
- [ ] Conversation history loading
- [ ] Delete conversation functionality
- [ ] Login history tracking
- [ ] Session persistence
- [ ] Error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow TypeScript best practices
- Write descriptive commit messages
- Add comments for complex logic
- Update documentation as needed
- Test thoroughly before submitting

## 📄 License

This project is private and proprietary. All rights reserved.

## ⚠️ Important Disclaimers

- **Not a Diagnostic Tool**: This application provides guidance, not medical diagnosis
- **Consult Healthcare Professionals**: Always seek in-person medical evaluation for serious symptoms
- **Emergency Situations**: For life-threatening emergencies, call 911 immediately
- **Not a Replacement**: This tool supplements, not replaces, professional medical care
- **User Privacy**: All chat data is securely stored and user-controlled

## 🙏 Acknowledgments

- **AI Model**: Powered by [Google Gemini](https://deepmind.google/technologies/gemini/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com)
- **Backend**: [Supabase](https://supabase.com)
- **Icons**: [Lucide](https://lucide.dev)

## 📞 Support

For issues, questions, or contributions:
- Open an issue in the repository
- Contact the development team
- Review documentation in `/docs`

---

**Built with ❤️ for better healthcare accessibility**
