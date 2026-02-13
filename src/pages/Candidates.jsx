import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { mockCandidates } from '../data/mockData'
import { Search, Filter, ArrowUpDown, Eye, FileText } from 'lucide-react'

export default function Candidates() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('score')
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort candidates
  let filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = filterCategory === 'all' || candidate.category === filterCategory
    return matchesSearch && matchesCategory
  })

  if (sortBy === 'score') {
    filteredCandidates.sort((a, b) => b.score - a.score)
  } else if (sortBy === 'name') {
    filteredCandidates.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy === 'date') {
    filteredCandidates.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
  }

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
          Candidates
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage and review all candidate applications
        </p>
      </div>

      {/* Filters and Search */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or skills..."
                className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          >
            <option value="score">Sort by Score</option>
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                All ({mockCandidates.length})
              </button>
              <button
                onClick={() => setFilterCategory('Strong')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterCategory === 'Strong'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                Strong ({mockCandidates.filter(c => c.category === 'Strong').length})
              </button>
              <button
                onClick={() => setFilterCategory('Consider')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterCategory === 'Consider'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                Consider ({mockCandidates.filter(c => c.category === 'Consider').length})
              </button>
              <button
                onClick={() => setFilterCategory('Reject')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterCategory === 'Reject'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                Reject ({mockCandidates.filter(c => c.category === 'Reject').length})
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Candidates Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
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
                  Top Skills
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate, index) => (
                <motion.tr
                  key={candidate.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/candidates/${candidate.id}`)}
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
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                          +{candidate.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/candidates/${candidate.id}`)
                        }}
                        className="flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      {candidate.resumeUrl && (
                        <a
                          href={candidate.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                          title="View Resume"
                        >
                          <FileText className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No candidates found matching your criteria
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
