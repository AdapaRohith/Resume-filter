# AvlokAI Backend Server

Backend API for resume parsing and AI-powered screening.

## 🚀 Features

- **Resume Parsing**: Extracts text from PDF and DOCX files
- **Intelligent Scoring**: Two modes available
  - **Keyword Mode**: Fast, no API key required
  - **AI Mode**: Uses OpenAI GPT-4 for advanced analysis
- **Skill Matching**: Identifies matched and missing skills
- **Experience Analysis**: Evaluates years of experience
- **Education Scoring**: Assesses educational qualifications

## 📋 Requirements

- Node.js 18+
- npm or yarn

## ⚡ Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment
```bash
# Copy the example env file
cp .env.example .env

# Edit .env file
# For basic usage (no API key needed):
PORT=5000
SCORING_MODE=keyword

# For AI-powered scoring (requires OpenAI API key):
PORT=5000
SCORING_MODE=ai
OPENAI_API_KEY=your_api_key_here
```

### 3. Start Server
```bash
npm start
```

Server will run on `http://localhost:5000`

## 🔧 API Endpoints

### Health Check
```http
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "mode": "keyword",
  "timestamp": "2026-02-13T..."
}
```

### Analyze Resume
```http
POST /api/screening/analyze
Content-Type: multipart/form-data
```

Body:
- `resume` (file): PDF or DOCX file
- `jobDescription` (text): Job description text

Response:
```json
{
  "candidate": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "education": "BS Computer Science, MIT",
    "experience": "5 years"
  },
  "score": 85,
  "category": "Strong",
  "skills": {
    "matched": ["React", "Node.js", "Python"],
    "missing": ["Docker", "Kubernetes"],
    "all": ["React", "Node.js", "Python", "JavaScript"]
  },
  "summary": "Strong candidate with relevant experience...",
  "details": {
    "skillsScore": 80,
    "experienceScore": 90,
    "educationScore": 85
  }
}
```

## 🤖 Scoring Modes

### Keyword Mode (Default)
- No API key required
- Fast processing
- Uses intelligent keyword matching
- Extracts skills from 40+ common technologies
- Weighted scoring: 50% skills, 30% experience, 20% education

### AI Mode (OpenAI)
- Requires OpenAI API key
- Advanced natural language understanding
- Context-aware skill matching
- Detailed candidate evaluation
- More accurate scoring

## 📊 Scoring Algorithm

### Keyword Mode Process:
1. **Resume Parsing**: Extract text from PDF/DOCX
2. **Information Extraction**: 
   - Name, email, phone
   - Skills (40+ technologies)
   - Education level
   - Years of experience
3. **Skill Matching**: Compare resume skills with job requirements
4. **Scoring**:
   - Skills Score: % of required skills matched
   - Experience Score: Years vs. required years
   - Education Score: Degree level match
5. **Final Score**: Weighted average (50-30-20)
6. **Categorization**:
   - 80-100: Strong
   - 60-79: Consider
   - 0-59: Reject

## 🛠️ Supported Skills

The parser recognizes these technologies:

**Languages**: JavaScript, TypeScript, Python, Java, C++, C#, Ruby, PHP, Go, Rust, Swift, Kotlin

**Frontend**: React, Vue, Angular, Svelte, HTML, CSS, Tailwind, Bootstrap

**Backend**: Node.js, Express, Django, Flask, FastAPI, Spring Boot, ASP.NET

**Databases**: MongoDB, PostgreSQL, MySQL, Redis, Elasticsearch, SQL

**Cloud/DevOps**: AWS, Azure, GCP, Docker, Kubernetes, Terraform, CI/CD, Git

**Data/AI**: TensorFlow, PyTorch, Scikit-learn, Pandas, Machine Learning, NLP

## 📁 Project Structure

```
server/
├── services/
│   ├── resumeParser.js   # PDF/DOCX parsing & extraction
│   └── scorer.js         # Scoring algorithms
├── routes/
│   └── screening.js      # API routes
├── server.js             # Express server
├── package.json          # Dependencies
├── .env                  # Config (not in git)
└── .env.example          # Config template
```

## 🔐 Security Notes

- File uploads limited to 5MB
- Only PDF and DOCX files accepted
- Multer handles file processing securely
- CORS enabled for frontend integration
- API keys stored in environment variables

## 🧪 Testing

### Test with cURL:
```bash
curl -X POST http://localhost:5000/api/screening/analyze \
  -F "resume=@/path/to/resume.pdf" \
  -F "jobDescription=Looking for Full Stack Developer with React, Node.js, and AWS experience"
```

## 🔧 Troubleshooting

### Server won't start
- Check if port 5000 is available
- Verify all dependencies are installed
- Check Node.js version (18+)

### Resume parsing fails
- Ensure file is PDF or DOCX
- Check file size (< 5MB)
- Verify file is not corrupted

### AI mode not working
- Verify OPENAI_API_KEY in .env
- Check OpenAI API quota/balance
- System falls back to keyword mode on error

## 📝 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5000 | Server port |
| `SCORING_MODE` | keyword | Scoring mode: 'keyword' or 'ai' |
| `OPENAI_API_KEY` | - | OpenAI API key (required for AI mode) |

## 🚀 Production Deployment

1. Set environment variables
2. Use process manager (PM2)
3. Configure reverse proxy (nginx)
4. Enable HTTPS
5. Set up rate limiting
6. Configure file storage (S3, etc.)

## 📦 Dependencies

- **express**: Web framework
- **multer**: File upload handling
- **pdf-parse**: PDF text extraction
- **mammoth**: DOCX text extraction
- **openai**: OpenAI API client (optional)
- **cors**: CORS middleware
- **dotenv**: Environment variables

## 📄 License

MIT License - Same as frontend

---

**Backend is ready to intelligently screen resumes!** 🎯
