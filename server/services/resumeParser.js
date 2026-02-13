import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'

export async function parseResume(file) {
  try {
    let text = ''

    // Parse based on file type
    if (file.mimetype === 'application/pdf') {
      const pdfData = await pdfParse(file.buffer)
      text = pdfData.text
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer: file.buffer })
      text = result.value
    } else {
      throw new Error('Unsupported file format')
    }

    // Extract information from text
    const extractedData = extractInformation(text)

    return {
      rawText: text,
      ...extractedData
    }
  } catch (error) {
    console.error('Resume parsing error:', error)
    throw new Error(`Failed to parse resume: ${error.message}`)
  }
}

function extractInformation(text) {
  const data = {
    name: extractName(text),
    email: extractEmail(text),
    phone: extractPhone(text),
    skills: extractSkills(text),
    education: extractEducation(text),
    experience: extractExperience(text)
  }

  return data
}

function extractName(text) {
  // Try to get name from first few lines
  const lines = text.split('\n').filter(l => l.trim())
  if (lines.length > 0) {
    const firstLine = lines[0].trim()
    // Basic heuristic: if first line looks like a name (2-4 words, capitalized)
    const words = firstLine.split(/\s+/)
    if (words.length >= 2 && words.length <= 4 && 
        words.every(w => /^[A-Z]/.test(w))) {
      return firstLine
    }
  }
  return 'Candidate'
}

function extractEmail(text) {
  const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/g
  const matches = text.match(emailRegex)
  return matches ? matches[0] : ''
}

function extractPhone(text) {
  const phoneRegex = /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g
  const matches = text.match(phoneRegex)
  return matches ? matches[0] : ''
}

function extractSkills(text) {
  const commonSkills = [
    // Programming Languages
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Go', 'Rust', 'Swift', 'Kotlin',
    // Frontend
    'React', 'Vue', 'Angular', 'Svelte', 'HTML', 'CSS', 'SASS', 'LESS', 'Tailwind', 'Bootstrap',
    // Backend
    'Node.js', 'Express', 'Django', 'Flask', 'FastAPI', 'Spring Boot', 'ASP.NET', 'Ruby on Rails',
    // Databases
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Cassandra', 'DynamoDB', 'SQL',
    // Cloud & DevOps
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'CI/CD', 'Git', 'GitHub',
    // Data & AI
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Machine Learning', 'Deep Learning', 'NLP',
    // Other
    'GraphQL', 'REST API', 'Microservices', 'Agile', 'Scrum', 'Testing', 'Jest', 'Pytest'
  ]

  const textLower = text.toLowerCase()
  const foundSkills = commonSkills.filter(skill => 
    textLower.includes(skill.toLowerCase())
  )

  return [...new Set(foundSkills)] // Remove duplicates
}

function extractEducation(text) {
  const educationKeywords = ['bachelor', 'master', 'phd', 'bs', 'ms', 'mba', 'university', 'college', 'degree']
  const lines = text.split('\n')
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase()
    if (educationKeywords.some(keyword => line.includes(keyword))) {
      // Get this line and next 1-2 lines for context
      const educationText = lines.slice(i, Math.min(i + 3, lines.length))
        .join(' ')
        .trim()
      if (educationText.length > 10) {
        return educationText.substring(0, 150)
      }
    }
  }
  
  return 'Education details not found'
}

function extractExperience(text) {
  // Look for years of experience or count job positions
  const yearPattern = /(\d+)\+?\s*(years?|yrs?)\s*(of\s*)?(experience|exp)?/gi
  const matches = text.match(yearPattern)
  
  if (matches && matches.length > 0) {
    const yearMatch = matches[0].match(/\d+/)
    if (yearMatch) {
      return `${yearMatch[0]} years`
    }
  }

  // Alternative: count professional roles mentioned
  const roleKeywords = ['engineer', 'developer', 'manager', 'analyst', 'architect', 'consultant', 'specialist']
  let roleCount = 0
  const textLower = text.toLowerCase()
  roleKeywords.forEach(keyword => {
    const matches = textLower.match(new RegExp(keyword, 'g'))
    if (matches) roleCount += matches.length
  })

  if (roleCount > 0) {
    const estimatedYears = Math.min(roleCount * 2, 10) // Rough estimate
    return `${estimatedYears}+ years`
  }

  return '0-2 years'
}
