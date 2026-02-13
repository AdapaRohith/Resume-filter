# 🎯 Testing the Backend

## Quick Test with a Sample Resume

Want to test the backend immediately? Here's how:

### 1. Create a Test Resume

Create a file called `test-resume.txt` with this content:

```
JOHN DOE
Software Engineer
john.doe@email.com | (555) 123-4567

EXPERIENCE
Senior Software Engineer - TechCorp (2020-Present)
- Developed scalable web applications using React, Node.js, and TypeScript
- Implemented microservices architecture on AWS
- Led team of 5 developers

EDUCATION
Master of Science in Computer Science
Stanford University, 2019

SKILLS
JavaScript, TypeScript, React, Node.js, Python, AWS, Docker, MongoDB, PostgreSQL, Git, REST API, GraphQL, CI/CD
```

Save it as a `.txt` file, then rename to `.pdf` or use any actual PDF resume you have.

### 2. Test with cURL

```bash
curl -X POST http://localhost:5000/api/screening/analyze \
  -F "resume=@test-resume.pdf" \
  -F "jobDescription=We are looking for a Senior Full Stack Developer with 5+ years experience in React, Node.js, TypeScript, and AWS. Must have experience with Docker and microservices architecture."
```

### 3. Test with the Frontend

1. Make sure both servers are running:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

2. Go to the "Screen Resume" page

3. Paste this job description:
```
Senior Full Stack Developer

Requirements:
- 5+ years experience with JavaScript/TypeScript
- Strong proficiency in React and Node.js
- Experience with AWS cloud services
- Knowledge of Docker and Kubernetes
- Database experience (MongoDB, PostgreSQL)
- GraphQL and REST API development
- CI/CD pipeline experience

Nice to have:
- Microservices architecture
- TDD/BDD practices
- Agile methodologies
```

4. Upload any PDF or DOCX resume

5. Click "Run AI Screening"

6. Watch the real-time analysis!

## Expected Results

The backend will:
1. ✅ Parse the resume (PDF/DOCX → text)
2. ✅ Extract: name, email, phone, skills, education, experience
3. ✅ Match skills against job requirements
4. ✅ Calculate weighted score (50% skills, 30% experience, 20% education)
5. ✅ Generate intelligent summary
6. ✅ Return categorization (Strong/Consider/Reject)

## Scoring Breakdown

**Score 80-100 (Strong):**
- Most required skills matched
- Relevant experience level
- Appropriate education
- Strong candidate recommendation

**Score 60-79 (Consider):**
- Some skill gaps
- Decent experience
- Worth interviewing with training

**Score 0-59 (Reject):**
- Too many missing skills
- Insufficient experience
- Not a good fit for role

## API Response Example

```json
{
  "candidate": {
    "name": "John Doe",
    "email": "john.doe@email.com",
    "phone": "(555) 123-4567",
    "education": "Master of Science in Computer Science, Stanford University",
    "experience": "5 years"
  },
  "score": 88,
  "category": "Strong",
  "skills": {
    "matched": [
      "JavaScript",  
      "TypeScript",
      "React",
      "Node.js",
      "AWS",
      "Docker",
      "MongoDB",
      "PostgreSQL",
      "GraphQL",
      "REST API"
    ],
    "missing": ["Kubernetes"],
    "all": [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "AWS",
      "Docker",
      "MongoDB",
      "PostgreSQL",
      "Git",
      "REST API",
      "GraphQL",
      "CI/CD"
    ]
  },
  "summary": "Outstanding profile with comprehensive skill match (10/11). 5 years experience aligns well with requirements. Highly recommended for interview.",
  "details": {
    "skillsScore": 91,
    "experienceScore": 100,
    "educationScore": 90
  }
}
```

## Troubleshooting

**"Backend not responding"**
- Check if server is running on port 5000
- Look for startup message in server terminal
- Test health endpoint: `http://localhost:5000/api/health`

**"Failed to parse resume"**
- Ensure file is PDF or DOCX format
- Check file is not corrupted
- File size must be under 5MB

**"Skills not detected"**
- Backend recognizes 40+ common technologies
- Check if skills use standard naming (e.g., "React" not "React.js")
- May need to add custom skills to recognizer

**Low scores despite good resume**
- Job description might not mention specific skills
- Try more detailed job descriptions
- Adjust scoring weights in Settings page

## Advanced: Enable AI Mode

For even better scoring with GPT-4:

1. Get OpenAI API key from https://platform.openai.com
2. Edit `server/.env`:
```
SCORING_MODE=ai
OPENAI_API_KEY=sk-...your-key...
```
3. Restart server
4. Try the same resume - you'll get more nuanced analysis!

---

**Now go test it with a real resume!** 🚀
