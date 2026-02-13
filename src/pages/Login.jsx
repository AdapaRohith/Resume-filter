import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(email, password)) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Login Card */}
        <div className="glass rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-32 h-32 flex items-center justify-center mb-4"
            >
              <img src="/assets/AvlokAi.png" alt="AvlokAI Logo" className="w-full h-full object-contain" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">AvlokAI</h1>
            <p className="text-white/80 text-center">
              AI Recruitment Intelligence Platform
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@avlokai.com"
                  className="w-full pl-11 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white hover:bg-gray-100 text-primary-600 font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl group"
            >
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Demo Hint */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Demo: Any email and password will work
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-white/80 text-sm">
          <p>Transform your recruitment process with AI-powered intelligence</p>
        </div>
      </motion.div>
    </div>
  )
}
