
# EduTutor AI: Personalized Learning with Generative AI & LMS Integration

A comprehensive educational platform that combines AI-powered personalized learning with Learning Management System (LMS) integration. This full-stack application enables students to take adaptive quizzes and allows educators to create custom assessments with detailed analytics.

## 🚀 Features

### For Students
- **AI-Powered Adaptive Quizzes**: Personalized quiz generation based on learning level and topic
- **Real-time Progress Tracking**: Monitor learning progress with detailed analytics
- **Interactive Quiz Interface**: Modern, responsive quiz-taking experience with timer and progress indicators
- **Instant Feedback**: Immediate results with explanations and recommendations

### For Educators  
- **Custom Quiz Creation**: Create and manage custom quizzes with multiple-choice questions
- **Student Analytics**: Track student performance and identify learning gaps
- **LMS Integration**: Seamless integration with existing Learning Management Systems
- **Role-based Dashboard**: Dedicated interface for educators with advanced tools

### AI & Technology Features
- **Watsonx AI Integration**: (Ready for implementation) Advanced AI for content generation and analysis
- **Vector Database**: (Ready for implementation) Pinecone integration for knowledge management
- **Personalized Learning Paths**: AI-driven recommendations for optimal learning progression
- **Performance Analytics**: Detailed insights into learning patterns and outcomes

## 🏗️ Architecture

```
EduTutorAI/
├── frontend/                   # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/
│   │   │   └── QuizInterface.tsx
│   │   ├── pages/
│   │   │   ├── Index.tsx       # Landing page
│   │   │   ├── Auth.tsx        # Login/Signup with role selection
│   │   │   ├── Quiz.tsx        # Quiz selection and demo
│   │   │   └── EducatorDashboard.tsx
│   │   └── ...
├── backend/                    # FastAPI Python Backend
│   ├── main.py                # FastAPI application entry point
│   ├── routes/
│   │   ├── quiz.py            # Quiz generation and submission
│   │   └── educator.py        # Educator quiz management
│   ├── requirements.txt       # Python dependencies
│   └── .env.example          # Environment variables template
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with functional components and hooks
- **Vite**: Fast build tool and development server
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern UI component library
- **React Router**: Client-side routing
- **Tanstack Query**: Data fetching and state management

### Backend
- **FastAPI**: Modern Python web framework
- **Pydantic**: Data validation and settings management
- **Uvicorn**: ASGI server for FastAPI
- **CORS Middleware**: Cross-origin resource sharing

### AI & Data (Ready for Integration)
- **IBM Watsonx**: AI-powered content generation and analysis
- **Pinecone**: Vector database for knowledge management
- **PostgreSQL**: Production database (configuration ready)
- **Redis**: Caching and session management (configuration ready)

## 🚀 Quick Start

### Frontend Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Access the application**:
   - Open http://localhost:5173
   - Try the demo quiz or create an account
   - Select "Student" or "Educator" role during signup

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start the server**:
   ```bash
   python main.py
   ```

6. **Access the API**:
   - API Documentation: http://localhost:8000/docs
   - Health Check: http://localhost:8000/health

## 📡 API Endpoints

### Quiz Endpoints
- `GET /api/quiz` - Generate quiz based on topic and difficulty
- `POST /api/submit` - Submit quiz answers and get results
- `GET /api/topics` - Get available topics and difficulties
- `GET /api/quiz/{quiz_id}/results` - Get detailed quiz results

### Educator Endpoints
- `POST /api/educator/quiz` - Create custom quiz
- `GET /api/educator/quizzes` - Get educator's quizzes
- `GET /api/educator/quiz/{quiz_id}` - Get quiz details and analytics
- `PUT /api/educator/quiz/{quiz_id}` - Update quiz
- `DELETE /api/educator/quiz/{quiz_id}` - Delete quiz
- `GET /api/educator/stats` - Get educator statistics

## 🎯 Usage Examples

### Student Workflow
1. **Sign up/Login** as a Student
2. **Select Quiz Topic** (JavaScript, React, Python, etc.)
3. **Choose Difficulty** (Beginner, Intermediate, Advanced)
4. **Take Interactive Quiz** with timer and progress tracking
5. **View Results** with explanations and personalized recommendations

### Educator Workflow  
1. **Sign up/Login** as an Educator
2. **Access Educator Dashboard**
3. **Create Custom Quiz**:
   - Set quiz details (title, topic, difficulty)
   - Add questions with multiple-choice options
   - Specify correct answers and explanations
4. **Manage Quizzes** and view student analytics
5. **Track Performance** across all created quizzes

## 🔧 Configuration

### Environment Variables

Copy `backend/.env.example` to `backend/.env` and configure:

```bash
# Basic Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True

# AI Services (for production)
WATSONX_API_KEY=your-watsonx-api-key
PINECONE_API_KEY=your-pinecone-api-key

# Database (for production)
DATABASE_URL=postgresql://username:password@localhost:5432/edututor_db

# Additional services...
```

## 🚀 Deployment

### Frontend Deployment
The frontend is built with Vite and can be deployed to any static hosting service:
- Vercel
- Netlify  
- GitHub Pages
- AWS S3 + CloudFront

### Backend Deployment
The FastAPI backend can be deployed to:
- Railway
- Heroku
- AWS Lambda (with Mangum)
- Docker containers
- Traditional VPS

### Production Checklist
- [ ] Set up PostgreSQL database
- [ ] Configure Redis for caching
- [ ] Set up Watsonx AI integration
- [ ] Configure Pinecone vector database
- [ ] Set up monitoring and logging
- [ ] Configure HTTPS and security headers
- [ ] Set up automated backups

## 🔮 Future Enhancements

### AI-Powered Features (Implementation Ready)
- **Adaptive Difficulty**: Dynamic question difficulty based on performance
- **Content Generation**: Auto-generate questions using Watsonx AI
- **Learning Path Optimization**: AI-recommended study sequences
- **Natural Language Processing**: Support for essay-type questions
- **Sentiment Analysis**: Monitor student engagement and frustration levels

### Advanced Features
- **Real-time Collaboration**: Group quizzes and team challenges
- **Gamification**: Badges, leaderboards, and achievement systems
- **Mobile App**: React Native mobile application
- **Offline Mode**: Take quizzes without internet connection
- **Advanced Analytics**: Machine learning-powered insights

### Integration Capabilities
- **LMS Integration**: Canvas, Moodle, Blackboard compatibility
- **SSO Authentication**: SAML, OAuth2, LDAP integration
- **Grade Book Sync**: Automatic grade synchronization
- **Video Integration**: Embedded instructional videos
- **Calendar Integration**: Assignment and quiz scheduling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


**EduTutor AI** - Transforming education through personalized AI-powered learning experiences.
