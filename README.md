# AvlokAI - Intelligent Resume Screening Engine

![AvlokAI](https://img.shields.io/badge/AvlokAI-Enterprise%20SaaS-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.1-646cff)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

Enterprise-grade AI-powered recruitment automation dashboard.

## 🎯 Features

### Core Functionality
- ✅ **Resume Screening Interface** - Drag & drop PDF/DOCX upload
- ✅ **n8n Integration** - Seamlessly uploads resumes to n8n webhook for processing
- ✅ **Intelligent Candidate Categorization** - Visualization of Strong/Consider/Reject classification
- ✅ **Skills Matching Engine** - Visualizes matched and missing skills
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

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Frontend**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:3000`

## 📊 Mock Data & Simulation

The application currently runs in a **frontend-only mode** for demonstration:
- **Resume Screening**: Uploads files to an n8n webhook (`https://n8n.avlokai.com/webhook/upload-resume`) and simulates the analysis result in the UI.
- **Candidate Data**: Uses realistic mock data to populate the dashboard and candidate lists.
- **Authentication**: Uses a mock authentication system (any email/password works).

## 🗂 Project Structure

```
Resume Filter Project/
├── src/
│   ├── components/         # Reusable components
│   ├── context/           # React Context providers
│   ├── data/              # Mock data
│   ├── pages/             # Application pages
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── public/                # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
└── tailwind.config.js    # Tailwind configuration
```

## 🎨 Customization

### Colors
Modify `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: { ... }
}
```

### Mock Data
Update `src/data/mockData.js` to add more candidates or modify existing ones.

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

---

**Built with ❤️ for modern recruitment teams**
