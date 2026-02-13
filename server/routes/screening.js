import express from 'express'
import multer from 'multer'
import { parseResume } from '../services/resumeParser.js'
import { scoreResume } from '../services/scorer.js'

const router = express.Router()

// Configure multer for file uploads
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX files are allowed.'))
    }
  }
})

// POST /api/screening/analyze
router.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    const { jobDescription } = req.body
    const file = req.file

    if (!file) {
      return res.status(400).json({ error: 'No resume file uploaded' })
    }

    if (!jobDescription) {
      return res.status(400).json({ error: 'Job description is required' })
    }

    // Step 1: Parse resume
    console.log('📄 Parsing resume...')
    const resumeData = await parseResume(file)

    // Step 2: Score against job description
    console.log('🤖 Scoring resume...')
    const scoringResult = await scoreResume(resumeData, jobDescription)

    // Step 3: Return complete analysis
    const response = {
      candidate: {
        name: resumeData.name || 'Unknown Candidate',
        email: resumeData.email || '',
        phone: resumeData.phone || '',
        education: resumeData.education || '',
        experience: resumeData.experience || ''
      },
      score: scoringResult.score,
      category: scoringResult.category,
      skills: {
        matched: scoringResult.matchedSkills,
        missing: scoringResult.missingSkills,
        all: resumeData.skills
      },
      summary: scoringResult.summary,
      details: {
        skillsScore: scoringResult.details?.skillsScore || 0,
        experienceScore: scoringResult.details?.experienceScore || 0,
        educationScore: scoringResult.details?.educationScore || 0
      }
    }

    console.log('✅ Analysis complete:', {
      score: response.score,
      category: response.category,
      matched: response.skills.matched.length,
      missing: response.skills.missing.length
    })

    res.json(response)

  } catch (error) {
    console.error('❌ Screening error:', error.message)
    res.status(500).json({ 
      error: 'Failed to analyze resume',
      message: error.message 
    })
  }
})

export default router
