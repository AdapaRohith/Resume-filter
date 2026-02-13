import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Upload, Sparkles, Check, Loader } from 'lucide-react'

export default function ScreenResume() {
  const [jobDescription, setJobDescription] = useState('')
  const [file, setFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [result, setResult] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const processingSteps = [
    'Extracting resume data',
    'Matching skills',
    'Calculating score',
    'Generating analysis'
  ]

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleProcess = async () => {
    if (!file || !jobDescription) {
      alert('Please provide both a job description and a resume file.')
      return
    }

    console.log('Starting resume analysis...')
    console.log('File:', file.name, 'Size:', file.size, 'Type:', file.type)
    console.log('Job description length:', jobDescription.length)

    setIsProcessing(true)
    setResult(null)

    let stepInterval

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('jobDescription', jobDescription)

      console.log('FormData created, sending to backend...')

      // Animate through processing steps
      stepInterval = setInterval(() => {
        setProcessingStep(prev => {
          if (prev < processingSteps.length) return prev + 1
          return prev
        })
      }, 800)

      // Call real backend API
      const response = await fetch('http://localhost:5000/api/screening/analyze', {
        method: 'POST',
        body: formData
      })

      clearInterval(stepInterval)
      console.log('Response received:', response.status, response.statusText)

      if (!response.ok) {
        let errorMessage = 'Failed to analyze resume'
        try {
          const error = await response.json()
          errorMessage = error.message || error.error || errorMessage
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log('Analysis result:', data)

      // Format result for display
      setResult({
        name: data.candidate.name || 'Unknown Candidate',
        email: data.candidate.email || '',
        phone: data.candidate.phone || '',
        score: data.score,
        category: data.category,
        matchedSkills: data.skills.matched || [],
        missingSkills: data.skills.missing || [],
        summary: data.summary,
        details: data.details
      })

      setProcessingStep(processingSteps.length)
      console.log('✅ Resume analysis complete!')

    } catch (error) {
      if (stepInterval) clearInterval(stepInterval)
      console.error('❌ Error analyzing resume:', error)
      
      let errorMsg = error.message
      if (error.message.includes('Failed to fetch')) {
        errorMsg = 'Cannot connect to backend server.\n\nPlease make sure:\n1. Backend server is running on port 5000\n2. Run: cd server && node server.js'
      }
      
      alert(`Error: ${errorMsg}`)
    } finally {
      setIsProcessing(false)
      setTimeout(() => setProcessingStep(0), 1000)
    }
  }

  const handleReset = () => {
    setFile(null)
    setJobDescription('')
    setResult(null)
    setProcessingStep(0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Screen Resume
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Upload a resume and job description to get AI-powered screening results
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Description Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Job Description
            </h2>
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full h-64 p-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
          />

          <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{jobDescription.length} characters</span>
            <button
              onClick={() => setJobDescription('')}
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Clear
            </button>
          </div>
        </motion.div>

        {/* Resume Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Upload className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Resume Upload
            </h2>
          </div>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-xl p-12 text-center transition-all
              ${dragActive 
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                : 'border-gray-300 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-600'
              }
            `}
          >
            {file ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="space-y-4"
              >
                <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="text-sm text-red-600 dark:text-red-400 hover:underline"
                >
                  Remove file
                </button>
              </motion.div>
            ) : (
              <>
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Drag & drop resume here
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  or click to browse
                </p>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />
                <label htmlFor="file-upload" className="btn-primary cursor-pointer inline-block">
                  Choose File
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                  Supported formats: PDF, DOC, DOCX
                </p>
              </>
            )}
          </div>

          <button
            onClick={handleProcess}
            disabled={!file || !jobDescription || isProcessing}
            className="w-full mt-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            {isProcessing ? 'Processing...' : 'Run AI Screening'}
          </button>
        </motion.div>
      </div>

      {/* Processing Animation */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card p-8"
          >
            <div className="flex flex-col items-center space-y-6">
              <Loader className="w-12 h-12 text-primary-600 dark:text-primary-400 animate-spin" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                AI Screening in Progress...
              </h3>
              <div className="w-full max-w-md space-y-4">
                {processingSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center
                      ${index < processingStep 
                        ? 'bg-green-500' 
                        : index === processingStep 
                        ? 'bg-primary-500 animate-pulse' 
                        : 'bg-gray-300 dark:bg-gray-700'
                      }
                    `}>
                      {index < processingStep && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className={`
                      ${index <= processingStep 
                        ? 'text-gray-900 dark:text-white font-medium' 
                        : 'text-gray-500 dark:text-gray-400'
                      }
                    `}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Score Card */}
            <div className="card p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Screening Complete!
              </h3>
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${
                result.score >= 80 ? 'from-green-500 to-green-600' :
                result.score >= 60 ? 'from-yellow-500 to-yellow-600' :
                'from-red-500 to-red-600'
              } mb-4`}>
                <span className="text-5xl font-bold text-white">{result.score}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {result.name}
              </p>
              {result.email && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {result.email}
                </p>
              )}
              <span className={`inline-block px-4 py-2 rounded-full font-semibold ${
                result.category === 'Strong' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                result.category === 'Consider' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              }`}>
                {result.category} Match
              </span>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Matched Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.matchedSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Missing Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                AI Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {result.summary}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button onClick={handleReset} className="btn-primary">
                Screen Another Resume
              </button>
              <button className="btn-secondary">
                Save to Database
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
