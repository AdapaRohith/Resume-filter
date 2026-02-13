import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Shield, Sliders, Save } from 'lucide-react'

export default function Settings() {
  const [biasReduction, setBiasReduction] = useState(true)
  const [duplicateDetection, setDuplicateDetection] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [skillsWeight, setSkillsWeight] = useState(50)
  const [experienceWeight, setExperienceWeight] = useState(30)
  const [educationWeight, setEducationWeight] = useState(20)

  const handleSave = () => {
    // Mock save functionality
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Configure your recruitment platform preferences
        </p>
      </div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Profile Settings
          </h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Admin User"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="admin@avlokai.com"
                className="input"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              defaultValue="AvlokAI Inc."
              className="input"
            />
          </div>
        </div>
      </motion.div>

      {/* AI Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Sliders className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            AI Screening Configuration
          </h2>
        </div>

        <div className="space-y-6">
          {/* Skill Weight */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Skills Weight
              </label>
              <span className="text-primary-600 dark:text-primary-400 font-bold">
                {skillsWeight}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={skillsWeight}
              onChange={(e) => setSkillsWeight(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>

          {/* Experience Weight */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Experience Weight
              </label>
              <span className="text-primary-600 dark:text-primary-400 font-bold">
                {experienceWeight}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={experienceWeight}
              onChange={(e) => setExperienceWeight(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>

          {/* Education Weight */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Education Weight
              </label>
              <span className="text-primary-600 dark:text-primary-400 font-bold">
                {educationWeight}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={educationWeight}
              onChange={(e) => setEducationWeight(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
            />
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Weight: {skillsWeight + experienceWeight + educationWeight}%
              {skillsWeight + experienceWeight + educationWeight !== 100 && (
                <span className="text-yellow-600 dark:text-yellow-400 ml-2">
                  (Should be 100%)
                </span>
              )}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Advanced Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Advanced Features
          </h2>
        </div>

        <div className="space-y-4">
          {/* Bias Reduction */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                Bias Reduction Mode
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Remove potentially biased information from screening
              </p>
            </div>
            <button
              onClick={() => setBiasReduction(!biasReduction)}
              className={`
                relative w-14 h-7 rounded-full transition-colors
                ${biasReduction ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}
              `}
            >
              <span
                className={`
                  absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform
                  ${biasReduction ? 'translate-x-7' : 'translate-x-0'}
                `}
              />
            </button>
          </div>

          {/* Duplicate Detection */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                Duplicate Resume Detection
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Automatically detect and flag duplicate applications
              </p>
            </div>
            <button
              onClick={() => setDuplicateDetection(!duplicateDetection)}
              className={`
                relative w-14 h-7 rounded-full transition-colors
                ${duplicateDetection ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}
              `}
            >
              <span
                className={`
                  absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform
                  ${duplicateDetection ? 'translate-x-7' : 'translate-x-0'}
                `}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                Email Notifications
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive email updates for new applications and screenings
              </p>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`
                relative w-14 h-7 rounded-full transition-colors
                ${emailNotifications ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}
              `}
            >
              <span
                className={`
                  absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform
                  ${emailNotifications ? 'translate-x-7' : 'translate-x-0'}
                `}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </div>
  )
}
