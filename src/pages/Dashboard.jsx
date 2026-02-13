import { motion } from 'framer-motion'
import { Users, TrendingUp, UserCheck, UserX, Award, ArrowUpRight, Eye } from 'lucide-react'
import { getDashboardStats, getRecruitmentFunnel, mockCandidates } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="card p-6 hover:shadow-xl transition-shadow cursor-pointer group"
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
          {label}
        </p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </h3>
        <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm">
          <ArrowUpRight className="w-4 h-4" />
          <span>12% vs last month</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
)

const FunnelBar = ({ label, value, total, delay }) => {
  const percentage = (value / total) * 100

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="text-sm font-bold text-gray-900 dark:text-white">
          {value}
        </span>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8 }}
          className="h-full bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"
        />
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  const stats = getDashboardStats()
  const funnel = getRecruitmentFunnel()
  const recentCandidates = mockCandidates.slice(0, 5)
  const navigate = useNavigate()

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30'
    return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
  }

  const getCategoryBadge = (category) => {
    const styles = {
      Strong: 'badge-success',
      Consider: 'badge-warning',
      Reject: 'badge-danger'
    }
    return styles[category] || 'badge-info'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Overview of your recruitment pipeline and candidate analytics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          icon={Users}
          label="Total Applications"
          value={stats.totalApplications}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          delay={0.1}
        />
        <StatCard
          icon={UserCheck}
          label="Strong Matches"
          value={stats.strongMatches}
          color="bg-gradient-to-br from-green-500 to-green-600"
          delay={0.2}
        />
        <StatCard
          icon={TrendingUp}
          label="Considered"
          value={stats.considered}
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
          delay={0.3}
        />
        <StatCard
          icon={UserX}
          label="Rejected"
          value={stats.rejected}
          color="bg-gradient-to-br from-red-500 to-red-600"
          delay={0.4}
        />
        <StatCard
          icon={Award}
          label="Average Score"
          value={`${stats.averageScore}%`}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          delay={0.5}
        />
      </div>

      {/* Recruitment Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Recruitment Funnel
        </h2>
        <div className="space-y-4">
          <FunnelBar label="Applications" value={funnel.applications} total={funnel.applications} delay={0.7} />
          <FunnelBar label="Screened" value={funnel.screened} total={funnel.applications} delay={0.8} />
          <FunnelBar label="Shortlisted" value={funnel.shortlisted} total={funnel.applications} delay={0.9} />
          <FunnelBar label="Interview" value={funnel.interview} total={funnel.applications} delay={1.0} />
          <FunnelBar label="Hired" value={funnel.hired} total={funnel.applications} delay={1.1} />
        </div>
      </motion.div>

      {/* Recent Candidates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="card p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Recent Candidates
          </h2>
          <button
            onClick={() => navigate('/candidates')}
            className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
          >
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Score
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Experience
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recentCandidates.map((candidate, index) => (
                <motion.tr
                  key={candidate.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {candidate.name}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {candidate.email}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-lg font-bold text-sm ${getScoreColor(candidate.score)}`}>
                      {candidate.score}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`badge ${getCategoryBadge(candidate.category)}`}>
                      {candidate.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {candidate.experience}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => navigate(`/candidates/${candidate.id}`)}
                      className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
