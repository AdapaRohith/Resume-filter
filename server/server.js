import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import screeningRoutes from './routes/screening.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/screening', screeningRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mode: process.env.SCORING_MODE || 'keyword',
    timestamp: new Date().toISOString()
  })
})

app.listen(PORT, () => {
  console.log(`\n🚀 AvlokAI Backend Server Running`)
  console.log(`📍 Port: ${PORT}`)
  console.log(`🤖 Scoring Mode: ${process.env.SCORING_MODE || 'keyword'}`)
  console.log(`🌐 Health Check: http://localhost:${PORT}/api/health\n`)
})
