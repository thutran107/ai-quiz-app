# AI Learning Quiz Platform

A comprehensive educational platform that empowers teams with AI knowledge through interactive learning, detailed content reviews, and personalized assessments. Master artificial intelligence concepts with expert-curated lessons and AI-powered custom quiz generation.

## 🚀 Key Features

### 📚 Library Hub - Interactive Learning Center
- **LLM Fundamentals**: Deep dive into Large Language Models, GPT architecture, and transformer mechanics
- **Prompt Engineering**: Master advanced techniques including Chain of Thought, Self-Consistency, and ReAct
- **RAG Systems**: Comprehensive guide to Retrieval-Augmented Generation with vector databases and similarity search
- **Memory Systems**: Explore AI agent memory types, management, and retrieval mechanisms
- **Agent Architecture**: Master autonomous AI agents with perception, reasoning, memory, and action components

### 🎯 Assessment & Testing
- **Sample Quizzes**: Expertly crafted assessments for each AI topic with detailed explanations
- **Custom Quiz Generation**: Upload your materials (TXT files) and generate personalized quizzes using AI
- **Instant Feedback**: Get immediate results with comprehensive explanations and learning insights
- **Progress Tracking**: Monitor learning advancement across different AI domains

### 🎨 User Experience
- **Modern UI**: Professional design inspired by leading AI education platforms
- **Interactive Lessons**: Two-section layouts with visual examples, diagrams, and practical applications
- **Mobile Responsive**: Seamless experience across desktop, tablet, and mobile devices
- **Accessibility**: Optimized for screen readers and keyboard navigation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **AI Integration**: Google Gemini API (@google/generative-ai)
- **Backend**: Next.js API Routes
- **Database**: Supabase (ready for future enhancements)
- **Deployment**: Vercel (optimized for Next.js)

## 📋 Prerequisites

- Node.js 18+ and npm
- Google Gemini API key
- Supabase account (optional, for future database features)

## 🔧 Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd ai-quiz-app
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Configure your `.env.local` file:

```env
# Google Gemini API Key (Required for custom quiz generation)
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration (Optional, for future features)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Get Google Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` file

### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Usage Guide

### Library Hub - Main Learning Interface
- **Topic Selection**: Choose from 5 comprehensive AI topics
- **Review Lessons**: Click "Review Lesson" to access detailed educational content
- **Interactive Learning**: Each topic features 2-section layouts with:
  - Core concepts and fundamentals
  - Advanced techniques and implementation
  - Visual examples and practical applications

### Generate Custom Quiz
- **File Upload**: Upload TXT files up to 10MB with your learning materials
- **Customization**: Select difficulty level (Beginner/Intermediate/Advanced)
- **Component Mix**: Choose question types (Multiple Choice, Fill-in-Blank, Reasoning, Diagrams)
- **Scoring**: Configure scoring distribution across question types
- **AI Generation**: Get 5-10 personalized questions based on your content

### Sample Quizzes
- **Topic-Specific**: Take specialized quizzes for LLM, Prompt Engineering, RAG, Memory, and Agent Architecture
- **Instant Feedback**: Get immediate results with detailed explanations
- **Learning Insights**: Review correct answers and expand your understanding

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── generate-quiz/     # API route for custom quiz generation
│   ├── quiz/                  # Quiz page with topic-specific assessments
│   ├── globals.css           # Global styles and custom design system
│   ├── layout.tsx            # Root layout with navigation
│   └── page.tsx              # Main page with Library Hub and quiz generation
├── lib/
│   ├── data.ts              # AI terms, quiz questions, and educational content
│   ├── topicKnowledge.ts    # Comprehensive topic-specific educational content (what/why/how)
│   ├── topicQuizzes.ts      # Topic-specific quiz questions with explanations
│   └── supabase.ts          # Database client configuration
└── types/
    └── index.ts             # TypeScript type definitions
```

## 📖 Educational Content Sources

- **Agent Architecture**: Based on comprehensive PDF materials covering agent components (perception, reasoning, memory, action), reasoning frameworks (ReAct, Plan-and-Execute, DPPM), memory architectures (7 patterns from context-window to Mem0), and multi-plan generation with reflection
- **LLM, Prompt Engineering, RAG, Memory**: Curated educational content for foundational AI concepts

## 🎨 Design System

The application uses a custom design system inspired by modern AI education platforms:

- **Colors**: Navy blue primary, orange/teal accents
- **Typography**: System fonts for optimal readability
- **Components**: Card-based layouts with subtle shadows
- **Interactions**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `GEMINI_API_KEY`: Your Google Gemini API key
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL (if using)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key (if using)

## 🔮 Future Enhancements

- **User Authentication**: Track individual progress
- **Quiz History**: Save and review past quiz attempts
- **Advanced File Processing**: Better PDF, DOCX, PPTX parsing
- **Question Bank**: Build a library of generated questions
- **Team Analytics**: Track organization-wide learning progress
- **Difficulty Levels**: Adaptive questioning based on performance
- **Mobile App**: Native iOS/Android applications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For questions or issues:

1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. For deployment help, refer to [Next.js deployment documentation](https://nextjs.org/docs/deployment)

## 🙏 Acknowledgments

- OpenAI and Google for advancing AI accessibility
- The Next.js team for the excellent framework
- Tailwind CSS for the utility-first CSS framework
- The open-source community for inspiration and tools
