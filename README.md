# AvlokAI - Intelligent Resume Screening Engine

![AvlokAI](https://img.shields.io/badge/AvlokAI-Enterprise%20SaaS-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933)
![Vite](https://img.shields.io/badge/Vite-5.1-646cff)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

Enterprise-grade AI-powered recruitment automation dashboard with **real resume parsing and scoring backend**.

## 🎯 Features

### Core Functionality
- ✅ **Real AI Resume Screening** - Actual PDF/DOCX parsing with intelligent scoring
- ✅ **Two Scoring Modes** - Keyword-based (fast) or OpenAI GPT-4 (advanced)
- ✅ **Intelligent Candidate Categorization** - Automatic Strong/Consider/Reject classification
- ✅ **Skills Matching Engine** - Identifies matched and missing skills from 40+ technologies
- ✅ **Backend API** - Full Express.js server with resume parsing capabilities
- ✅ **Email Automation Status** - Track shortlist and rejection emails
- ✅ **Advanced Filtering & Sorting** - Search by name, skills, or category
- ✅ **Real-time Analytics** - Comprehensive recruitment metrics and charts

### Design Features
- 🎨 **Dark/Light Theme Toggle** - Seamless theme switching with persistence
- 🎭 **Premium Animations** - Smooth Framer Motion transitions
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🌟 **Glassmorphism UI** - Modern, enterprise-grade design
- ⚡ **Optimized Performance** - Fast loading and smooth interactions

### Pages Included
1. **Login Page** - Beautiful animated authentication
2. **Dashboard** - Overview with stats cards and recruitment funnel
3. **Candidates** - Complete candidate list with filtering
4. **Candidate Detail** - Individual profile with circular score meter
5. **Screen Resume** - AI screening interface with drag & drop
6. **Analytics** - Charts and insights (Bar, Pie, Line charts)
7. **Settings** - Configure AI weights and features

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

3. **Start Backend Server**
   ```bash
   cd server
   npm start
   ```
   
   Backend will run on `http://localhost:5000`

4. **Start Frontend (in a new terminal)**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:3000`

5. **Ope                    # Frontend source
│   ├── components/         # Reusable components
│   │   ├── Layout.jsx     # Main layout wrapper
│   │   ├── Sidebar.jsx    # Navigation sidebar
│   │   └── Navbar.jsx     # Top navigation bar
│   ├── context/           # React Context providers
│   │   ├── AuthContext.jsx # Authentication state
│   │   └── ThemeContext.jsx # Theme management
│   ├── data/              # Mock data
│   │   └── mockData.js    # 15 sample candidates
│   ├── pages/             # Application pages
│   │   ├── Login.jsx      # Login page
│   │   ├── Dashboard.jsx  # Main dashboard
│   │   ├── Candidates.jsx # Candidates list
│   │   ├── CandidateDetail.jsx # Individual candidate
│   │   ├── ScreenResume.jsx    # Resume screening (REAL API)
│   │   ├── Analytics.jsx  # Analytics & charts
│   │   └── Settings.jsx   # Settings page
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── server/                # Backend API
│   ├── services/
│   │   ├── resumeParser.js  # PDF/DOCX parsing
│   │   └── scorer.js        # AI scoring algorithms
│   ├── routes/
│   │   └── screening.js     # API endpoints
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
├── public/                # Static assets
├── index.html            # HTML template
├── package.json          # Frontend dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── postcss.config.js      # Main layout wrapper
│   │   ├── Sidebar.jsx     # Navigation sidebar
│   │   └── Navbar.jsx      # Top navigation bar
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx # Authentication state
│   │   └── ThemeContext.jsx # Theme management
│   ├── data/               # Mock data
│   │   └── mockData.js     # 15 sample candidates
│   ├── pages/              # Application pages
│   │   ├── Login.jsx       # Login page
│   │   ├── Dashboard.jsx   # Main dashboard
│   │   ├── Candidates.jsx  # Candidates list
│   │   ├── CandidateDetail.jsx # Individual candidate
│   │   ├── ScreenResume.jsx    # Resume screening
│   │   ├── Analytics.jsx   # Analytics & charts
│   │   └── Settings.jsx    # Settings page
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html             # HTML template
**Frontend:**
- React 18.3
- Vite 5.1
- TailwindCSS 3.4
- Framer Motion 11.0
- Lucide React (icons)
- Recharts 2.12 (charts)
- React Router DOM 6.22

**Backend:**
- Node.js with Express
- Multer (file uploads)
- pdf-parse (PDF parsing)
- mammoth (DOCX parsing)
- OpenAI API (optional, for AI mode)

## 🤖 Backend API

The backend provides real resume analysis:

### Endpoints

**Health Check:**
```
GET http://localhost:5000/api/health
```

**Analyze Resume:**
```
POST http://localhost:5000/api/screening/analyze
Content-Type: multipart/form-data

Body:
- resume: PDF or DOCX file
- jobDescription: Job description text
```

### Scoring Modes

**1. Keyword Mode (Default)**
- Fast, no API key required
- Intelligent keyword matching
- 40+ recognized technologies
- Weighted scoring: 50% skills, 30% experience, 20% education

**2. AI Mode (Optional)**
- Requires OpenAI API key
- GPT-4 powered analysis
- Advanced natural language understanding
- Context-aware skill matching

To enable AI mode:
```bash
cd server
# Edit .env file
SCORING_MODE=ai
OPENAI_API_KEY=your_key_here
```

### Recognized Skills

The backend recognizes 40+ technologies including:
- **Languages**: JavaScript, TypeScript, Python, Java, C++, Go, Rust
- **Frontend**: React, Vue, Angular, Svelte, HTML, CSS, Tailwind
- **Backend**: Node.js, Express, Django, Flask, Spring Boot
- **Databases**: MongoDB, PostgreSQL, MySQL, Redis
- **Cloud/DevOps**: AWS, Azure, GCP, Docker, Kubernetes, Terraform
- **AI/Data**: TensorFlow, PyTorch, Scikit-learn, Pandas

- **Frontend Framework:** React 18.3
- **Build Tool:** Vite 5.1
- **Styling:** TailwindCSS 3.4
- **Animations:** Framer Motion 11.0
- **Icons:** Lucide React
- **Charts:** Recharts 2.12
- **Routing:** React Router DOM 6.22

## 📊 Mock Data

The application includes 15 realistic candidate profiles with:
- Names, emails, phone numbers
- Experience levels and education
- AI scores (55-95 range)
- Skills arrays (matched & missing)
- Categories (Strong/Consider/Reject)
- Email automation status
- AI-generated evaluation summaries

## 🎭 Key Features Breakdown

### Dashboard
- 5 animated stat cards with trends
- Recruitment funnel visualization
- Recent candidates table
- Real-time metrics

### Candidates Page
- Search by name, email, or skills
- Filter by category (Strong/Consider/Reject)
- Sort by score, name, or date
- Hover animations on rows

### Candidate Detail
- Animated circular score meter
- Contact information
- Skills breakdown (matched/missing)
- AI evaluation summary
- Email automation status badges

### Screen Resume
- Drag & drop file upload
- Job description input
- Multi-step AI processing animation
- Results display with score and insights

### Analytics
- Score distribution bar chart
- Category pie chart
- Applications timeline (line chart)
- Top skills demand chart

### Settings
- Profile configuration
- AI weight customization sliders
  - Skills weight
  - Experience weight
  - Education weight
- Feature toggles
  - Bias reduction mode
  - Duplicate detection
  - Email notifications

## 🔐 Authentication

Mock authentication is implemented. Any email and password combination will work. Authentication state is persisted in localStorage.

## 🌙 Theme Toggle

Dark/light theme toggle with:
- Smooth transitions
- Persistent preference (localStorage)
- Automatic system preference detection
- All components styled for both themes

## 🎯 Design Principles

- **Enterprise-Ready:** Professional UI/UX suitable for $25/month SaaS product
- **Performance First:** Optimized animations and lazy loading
- **Accessibility:** Semantic HTML and keyboard navigation
- **Responsive:** Mobile-first design approach
- **Consistent:** Unified color scheme and spacing system

## 📝 Customization

### Colors
Modify `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: { ... }
}
```

### Animations
Adjust animation timing in `tailwind.config.js`:
```javascript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
}
```

### Mock Data
Update `src/data/mockData.js` to add more candidates or modify existing ones.

## 🚀 Performance

- Vite for lightning-fast HMR
- Code splitting with React Router
- Optimized bundle size
- Lazy loading for images
- Efficient re-renders with React

## 📦 Build Output

Production build creates optimized files in `dist/` directory:
- Minified JavaScript
- Optimized CSS
- Compressed assets
- Source maps (optional)

## 🤝 Contributing

This is a complete, production-ready recruitment dashboard. Feel free to:
- Add more features
- Integrate with real backend APIs
- Enhance AI screening logic
- Add more analytics charts

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🎉 Acknowledgments

- Design inspired by Linear, Stripe, and modern ATS systems
- Built with best practices for enterprise applications
- Optimized for scalability and maintainability

---

**Built with ❤️ for modern recruitment teams**
