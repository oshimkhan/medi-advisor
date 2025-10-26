# MediAssist AI - Medical Chatbot

A sophisticated AI-powered medical assistant that provides symptom analysis, specialist recommendations, and health guidance. Built with React, TypeScript, and Supabase Edge Functions.

## 🎯 Features

- **Symptom Analysis**: Interactive chat interface for describing and analyzing symptoms
- **Specialist Recommendations**: AI suggests appropriate medical departments based on symptoms
- **Emergency Detection**: Automatically flags urgent symptoms requiring immediate medical attention
- **Health Education**: Provides clear, non-technical explanations of possible conditions
- **Real-time Streaming**: Fast, responsive chat experience with streaming AI responses
- **Modern UI**: Beautiful gradient interface with shadcn/ui components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd medi-advisor
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

4. Set up Supabase Edge Function:

Navigate to your Supabase dashboard and add the environment variable:
```env
AI_API_KEY=your_ai_api_key
```

Deploy the Edge Function:
```bash
supabase functions deploy medical-chat
```

5. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **React Router** - Routing
- **TanStack Query** - Data fetching
- **Lucide React** - Icons

### Backend
- **Supabase Edge Functions** - Serverless backend
- **Google Gemini 2.5 Flash** - AI model via API Gateway
- **Streaming API** - Real-time response streaming

## 📁 Project Structure

```
medi-advisor/
├── src/
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── ChatMessage.tsx
│   │   ├── ChatInput.tsx
│   │   ├── TypingIndicator.tsx
│   │   └── WelcomeCard.tsx
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── integrations/    # Supabase client
├── supabase/
│   └── functions/
│       └── medical-chat/    # Edge Function for AI chat
└── public/              # Static assets
```

## 🤖 How It Works

1. **User Input**: User describes symptoms through the chat interface
2. **Edge Function**: Requests are sent to Supabase Edge Function
3. **AI Processing**: Edge function calls AI API (Google Gemini)
4. **Streaming Response**: AI responses are streamed back in real-time
5. **Display**: Chat interface displays formatted medical guidance

### AI Capabilities

The AI assistant can:
- Analyze symptoms and ask clarifying questions
- Recommend appropriate medical specialists (Cardiology, Neurology, Orthopedics, etc.)
- Detect emergency situations
- Provide health education
- Suggest preventive measures
- Guide users on when to seek medical care

## 🚨 Important Disclaimers

- **Not a Diagnostic Tool**: This application provides guidance, not medical diagnosis
- **Consult Healthcare Professionals**: Always seek in-person medical evaluation for serious symptoms
- **Emergency Situations**: For life-threatening emergencies, call 911 immediately
- **Not a Replacement**: This tool supplements, not replaces, professional medical care

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Deploy Frontend

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider (Vercel, Netlify, etc.)

### Deploy Supabase Functions

```bash
supabase functions deploy medical-chat
```

### Environment Setup

Make sure to set up the following environment variables in your deployment platform:

**Frontend:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

**Supabase Function:**
- `AI_API_KEY`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- AI powered by [Google Gemini](https://deepmind.google/technologies/gemini/)
- UI components from [shadcn/ui](https://ui.shadcn.com)
