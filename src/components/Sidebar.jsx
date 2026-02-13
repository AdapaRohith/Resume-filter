import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Sparkles 
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Candidates', path: '/candidates' },
  { icon: FileText, label: 'Screen Resume', path: '/screen-resume' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation()

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
      className="fixed left-0 top-0 h-screen glass border-r border-gray-200 dark:border-gray-800 z-40"
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-16 h-16 flex items-center justify-center">
              <img src="/assets/AvlokAi.png" alt="AvlokAI Logo" className="w-16 h-16 object-contain" />
            </div>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  AvlokAI
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Recruitment Intelligence
                </p>
              </motion.div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 border-t border-gray-200 dark:border-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </motion.aside>
  )
}
