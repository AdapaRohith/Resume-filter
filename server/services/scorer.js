import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const SCORING_MODE = process.env.SCORING_MODE || 'keyword'
let openai = null

if (SCORING_MODE === 'ai' && process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

export async function scoreResume(resumeData, jobDescription) {
  if (SCORING_MODE === 'ai' && openai) {
    return await scoreWithAI(resumeData, jobDescription)
  } else {
    return scoreWithKeywords(resumeData, jobDescription)
  }
}

// AI-Powered Scoring using OpenAI
async function scoreWithAI(resumeData, jobDescription) {
  try {
    const prompt = `You are an expert HR recruitment AI. Analyze this resume against the job description and provide a detailed scoring.

JOB DESCRIPTION:
${jobDescription}

RESUME DATA:
- Name: ${resumeData.name}
- Email: ${resumeData.email}
- Education: ${resumeData.education}
- Experience: ${resumeData.experience}
- Skills: ${resumeData.skills.join(', ')}

Please provide a JSON response with the following structure:
{
  "score": <number 0-100>,
  "category": "<Strong|Consider|Reject>",
  "matchedSkills": [<array of skills from resume that match job requirements>],
  "missingSkills": [<array of skills mentioned in job but missing from resume>],
  "summary": "<2-3 sentence evaluation explaining the score and fit>",
  "details": {
    "skillsScore": <0-100>,
    "experienceScore": <0-100>,
    "educationScore": <0-100>
  }
}

Scoring Guidelines:
- 80-100: Strong match (recommend for interview)
- 60-79: Consider (potential fit with some gaps)
- 0-59: Reject (not a good fit)

Return ONLY the JSON, no other text.`

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    })

    const result = JSON.parse(response.choices[0].message.content)
    return result

  } catch (error) {
    console.error('AI scoring error:', error.message)
    // Fallback to keyword scoring
    console.log('Falling back to keyword-based scoring...')
    return scoreWithKeywords(resumeData, jobDescription)
  }
}

// Keyword-Based Scoring Algorithm
function scoreWithKeywords(resumeData, jobDescription) {
  const jdLower = jobDescription.toLowerCase()
  const resumeSkills = resumeData.skills.map(s => s.toLowerCase())
  
  // Extract required skills from job description
  const requiredSkills = extractRequiredSkills(jobDescription)
  
  // Calculate skill match
  const matchedSkills = []
  const missingSkills = []
  
  requiredSkills.forEach(skill => {
    const skillLower = skill.toLowerCase()
    const isMatched = resumeSkills.some(rs => 
      rs === skillLower || rs.includes(skillLower) || skillLower.includes(rs)
    )
    
    if (isMatched) {
      matchedSkills.push(skill)
    } else {
      missingSkills.push(skill)
    }
  })

  // Calculate individual scores
  const skillsScore = requiredSkills.length > 0 
    ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
    : 50

  const experienceScore = calculateExperienceScore(resumeData.experience, jdLower)
  const educationScore = calculateEducationScore(resumeData.education, jdLower)

  // Weighted total score (50% skills, 30% experience, 20% education)
  const totalScore = Math.round(
    (skillsScore * 0.5) + 
    (experienceScore * 0.3) + 
    (educationScore * 0.2)
  )

  // Determine category
  let category = 'Reject'
  if (totalScore >= 80) category = 'Strong'
  else if (totalScore >= 60) category = 'Consider'

  // Generate summary
  const summary = generateSummary(totalScore, category, matchedSkills, missingSkills, resumeData)

  return {
    score: totalScore,
    category,
    matchedSkills,
    missingSkills,
    summary,
    details: {
      skillsScore,
      experienceScore,
      educationScore
    }
  }
}

function extractRequiredSkills(jobDescription) {
  const commonSkills = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Go',
    'React', 'Vue', 'Angular', 'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQL',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Git',
    'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning',
    'GraphQL', 'REST API', 'Microservices', 'Agile', 'Testing'
  ]

  const jdLower = jobDescription.toLowerCase()
  return commonSkills.filter(skill => jdLower.includes(skill.toLowerCase()))
}

function calculateExperienceScore(experience, jobDescription) {
  const expMatch = experience.match(/(\d+)/)
  const years = expMatch ? parseInt(expMatch[0]) : 0

  // Check if JD mentions years required
  const jdYearsMatch = jobDescription.match(/(\d+)\+?\s*years?/i)
  const requiredYears = jdYearsMatch ? parseInt(jdYearsMatch[0]) : 3

  if (years >= requiredYears) return 100
  if (years >= requiredYears * 0.7) return 80
  if (years >= requiredYears * 0.5) return 60
  if (years >= requiredYears * 0.3) return 40
  return 20
}

function calculateEducationScore(education, jobDescription) {
  const edLower = education.toLowerCase()
  const jdLower = jobDescription.toLowerCase()

  // Check for degree level match
  if (jdLower.includes('phd') && edLower.includes('phd')) return 100
  if (jdLower.includes('master') && (edLower.includes('master') || edLower.includes('ms') || edLower.includes('mba'))) return 100
  if (jdLower.includes('bachelor') && (edLower.includes('bachelor') || edLower.includes('bs') || edLower.includes('ba'))) return 100
  
  // Has relevant degree but not exact match
  if (edLower.includes('master') || edLower.includes('ms')) return 90
  if (edLower.includes('bachelor') || edLower.includes('bs')) return 80
  if (edLower.includes('university') || edLower.includes('college')) return 60
  
  return 50
}

function generateSummary(score, category, matched, missing, resumeData) {
  const templates = {
    Strong: [
      `Excellent candidate with ${matched.length} matched skills and relevant ${resumeData.experience} experience. Strong technical background makes them an ideal fit for this role.`,
      `Outstanding profile with comprehensive skill match (${matched.length}/${matched.length + missing.length}). ${resumeData.experience} experience aligns well with requirements. Highly recommended for interview.`,
      `Exceptional match with ${matched.length} relevant technical skills. Professional experience and educational background demonstrate strong capabilities for this position.`
    ],
    Consider: [
      `Solid candidate with ${matched.length} matched skills but ${missing.length} gaps to address. ${resumeData.experience} experience shows potential. May require some upskilling but worth considering.`,
      `Decent technical foundation with ${matched.length} relevant skills. Has ${resumeData.experience} experience though missing some key technologies. Could be developed with proper training.`,
      `Competent profile with good fundamentals. Skills match is moderate (${matched.length}/${matched.length + missing.length}) and would benefit from additional technical depth in key areas.`
    ],
    Reject: [
      `Limited match with only ${matched.length} relevant skills out of ${matched.length + missing.length} required. Significant skill gaps and experience level may not meet current role requirements.`,
      `Resume shows basic capabilities but lacks depth in required technologies. Missing ${missing.length} critical skills needed for this position. Better suited for junior roles.`,
      `Insufficient technical background for this role. Only ${matched.length} skills align with requirements and experience level is below expectations. Recommend exploring other candidates.`
    ]
  }

  const options = templates[category]
  return options[Math.floor(Math.random() * options.length)]
}
