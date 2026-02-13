import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getCandidate } from '../data/mockData'
import { ArrowLeft, Mail, Phone, GraduationCap, Briefcase, Check, X, MessageSquare, Send, FileText, Download, Eye } from 'lucide-react'

export default function CandidateDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const candidate = getCandidate(id)
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailType, setEmailType] = useState('custom')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [emailSending, setEmailSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const emailTemplates = {
    shortlist: {
      subject: `Congratulations! Next Steps for ${candidate?.name || 'Your Application'}`,
      body: `Dear ${candidate?.name || 'Candidate'},\n\nThank you for applying to our position. We are pleased to inform you that your application has been shortlisted!\n\nYour AI screening score of ${candidate?.score || 0}/100 demonstrates strong alignment with our requirements. We would like to move forward with the next steps in our hiring process.\n\nWe will contact you shortly to schedule an interview.\n\nBest regards,\nAvlokAI Recruitment Team`
    },
    rejection: {
      subject: `Update on Your Application`,
      body: `Dear ${candidate?.name || 'Candidate'},\n\nThank you for your interest in our position and for taking the time to apply.\n\nAfter careful consideration of your application, we have decided to move forward with other candidates whose qualifications more closely match our current needs.\n\nWe appreciate your interest in our company and wish you the best in your job search.\n\nBest regards,\nAvlokAI Recruitment Team`
    },
    interview: {
      subject: `Interview Invitation - ${candidate?.name || 'Candidate'}`,
      body: `Dear ${candidate?.name || 'Candidate'},\n\nWe would like to invite you for an interview for the position you applied for.\n\nYour profile and AI screening score of ${candidate?.score || 0}/100 impressed our team, and we believe you would be a great fit for our organization.\n\nPlease reply to this email with your availability for the next week, and we'll schedule a convenient time.\n\nLooking forward to speaking with you!\n\nBest regards,\nAvlokAI Recruitment Team`
    },
    custom: {
      subject: `Regarding Your Application`,
      body: `Dear ${candidate?.name || 'Candidate'},\n\n`
    }
  }

  const handleEmailTypeChange = (type) => {
    setEmailType(type)
    setEmailSubject(emailTemplates[type].subject)
    setEmailBody(emailTemplates[type].body)
  }

  const handleSendEmail = async () => {
    setEmailSending(true)

    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1500))

    // In a real application, you would call your backend API here
    // const response = await fetch('https://api.example.com/send-email', ...)

    setEmailSending(false)
    setEmailSent(true)

    setTimeout(() => {
      setShowEmailModal(false)
      setEmailSent(false)
      setEmailSubject('')
      setEmailBody('')
      setEmailType('custom')
    }, 2000)
  }

  if (!candidate) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Candidate Not Found
        </h2>
        <button onClick={() => navigate('/candidates')} className="btn-primary">
          Back to Candidates
        </button>
      </div>
    )
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-green-500 to-green-600'
    if (score >= 60) return 'from-yellow-500 to-yellow-600'
    return 'from-red-500 to-red-600'
  }

  const getScoreTextColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/candidates')}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Candidates
      </button>

      {/* Candidate Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-8"
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {candidate.name}
            </h1>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Mail className="w-5 h-5" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-5 h-5" />
                <span>{candidate.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Briefcase className="w-5 h-5" />
                <span>{candidate.experience} experience</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <GraduationCap className="w-5 h-5" />
                <span>{candidate.education}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowEmailModal(true)
                  handleEmailTypeChange('custom')
                }}
                className="btn-primary flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Email
              </button>
              {candidate.resumeUrl && (
                <>
                  <button
                    onClick={() => setShowResumeModal(true)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Resume
                  </button>
                  <a
                    href={candidate.resumeUrl}
                    download={`${candidate.name}_Resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Right Section - Score */}
          <div className="flex flex-col items-center justify-center p-8">
            <div className="relative">
              {/* Circular Score Meter */}
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-200 dark:text-gray-800"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="url(#scoreGradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 502" }}
                  animate={{ strokeDasharray: `${(candidate.score / 100) * 502} 502` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className={`${getScoreColor(candidate.score).split(' ')[0].replace('from-', 'text-')}`} stopColor="currentColor" />
                    <stop offset="100%" className={`${getScoreColor(candidate.score).split(' ')[1].replace('to-', 'text-')}`} stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-5xl font-bold ${getScoreTextColor(candidate.score)}`}>
                  {candidate.score}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  AI Score
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Matched Skills
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg font-medium"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Missing Skills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <X className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Missing Skills
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {candidate.missing_skills.length > 0 ? (
              candidate.missing_skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg font-medium"
                >
                  {skill}
                </motion.span>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No missing skills - Perfect match! 🎉
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* AI Evaluation Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <MessageSquare className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            AI Evaluation Summary
          </h2>
        </div>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {candidate.aiSummary}
        </p>
      </motion.div>

      {/* Email Automation Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Email Automation Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Shortlisted Email
            </span>
            <span className={`badge ${candidate.emailStatus.shortlisted ? 'badge-success' : 'badge-info'}`}>
              {candidate.emailStatus.shortlisted ? 'Sent ✓' : 'Pending'}
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Rejection Email
            </span>
            <span className={`badge ${candidate.emailStatus.rejected ? 'badge-danger' : 'badge-info'}`}>
              {candidate.emailStatus.rejected ? 'Sent ✓' : 'Pending'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Resume Viewer Modal */}
      <AnimatePresence>
        {showResumeModal && candidate.resumeUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowResumeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {candidate.name}'s Resume
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {candidate.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={candidate.resumeUrl}
                    download={`${candidate.name}_Resume.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    title="Download Resume"
                  >
                    <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </a>
                  <button
                    onClick={() => setShowResumeModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Resume Viewer */}
              <div className="flex-1 overflow-hidden p-4">
                <iframe
                  src={candidate.resumeUrl}
                  className="w-full h-full rounded-xl border border-gray-200 dark:border-gray-800"
                  title={`${candidate.name}'s Resume`}
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">AI Score: </span>
                    <span className={`font-bold ${getScoreTextColor(candidate.score)}`}>
                      {candidate.score}/100
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowResumeModal(false)}
                      className="btn-secondary"
                    >
                      Close
                    </button>
                    <a
                      href={candidate.resumeUrl}
                      download={`${candidate.name}_Resume.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Resume
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Composer Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !emailSending && setShowEmailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Send Email to {candidate.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {candidate.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => !emailSending && setShowEmailModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  disabled={emailSending}
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Email Templates */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Email Template
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleEmailTypeChange('shortlist')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${emailType === 'shortlist'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-2 border-green-500'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    disabled={emailSending}
                  >
                    ✓ Shortlist
                  </button>
                  <button
                    onClick={() => handleEmailTypeChange('rejection')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${emailType === 'rejection'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-2 border-red-500'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    disabled={emailSending}
                  >
                    ✗ Rejection
                  </button>
                  <button
                    onClick={() => handleEmailTypeChange('interview')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${emailType === 'interview'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-2 border-blue-500'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    disabled={emailSending}
                  >
                    📅 Interview
                  </button>
                  <button
                    onClick={() => handleEmailTypeChange('custom')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${emailType === 'custom'
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-2 border-purple-500'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    disabled={emailSending}
                  >
                    ✏️ Custom
                  </button>
                </div>
              </div>

              {/* Email Form */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Email subject..."
                    disabled={emailSending}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    rows={12}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none font-mono text-sm"
                    placeholder="Email body..."
                    disabled={emailSending}
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                {emailSent ? (
                  <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Email sent successfully!</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">To: </span>
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowEmailModal(false)}
                        className="btn-secondary"
                        disabled={emailSending}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSendEmail}
                        className="btn-primary flex items-center gap-2"
                        disabled={emailSending || !emailSubject.trim() || !emailBody.trim()}
                      >
                        {emailSending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Email
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
