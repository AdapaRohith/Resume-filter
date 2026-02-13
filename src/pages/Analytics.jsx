import { motion } from 'framer-motion'
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'
import { TrendingUp, Users, Award, Target } from 'lucide-react'
import { mockCandidates } from '../data/mockData'

export default function Analytics() {
  // Score Distribution Data
  const scoreDistribution = [
    { range: '0-20', count: mockCandidates.filter(c => c.score < 20).length },
    { range: '20-40', count: mockCandidates.filter(c => c.score >= 20 && c.score < 40).length },
    { range: '40-60', count: mockCandidates.filter(c => c.score >= 40 && c.score < 60).length },
    { range: '60-80', count: mockCandidates.filter(c => c.score >= 60 && c.score < 80).length },
    { range: '80-100', count: mockCandidates.filter(c => c.score >= 80).length },
  ]

  // Category Distribution
  const categoryData = [
    { name: 'Strong', value: mockCandidates.filter(c => c.category === 'Strong').length, color: '#10b981' },
    { name: 'Consider', value: mockCandidates.filter(c => c.category === 'Consider').length, color: '#f59e0b' },
    { name: 'Reject', value: mockCandidates.filter(c => c.category === 'Reject').length, color: '#ef4444' },
  ]

  // Applications Timeline (mock data)
  const timelineData = [
    { date: 'Jan 29', applications: 2 },
    { date: 'Jan 30', applications: 1 },
    { date: 'Jan 31', applications: 1 },
    { date: 'Feb 01', applications: 1 },
    { date: 'Feb 02', applications: 1 },
    { date: 'Feb 03', applications: 1 },
    { date: 'Feb 04', applications: 1 },
    { date: 'Feb 05', applications: 1 },
    { date: 'Feb 06', applications: 1 },
    { date: 'Feb 07', applications: 1 },
    { date: 'Feb 08', applications: 1 },
    { date: 'Feb 09', applications: 1 },
    { date: 'Feb 10', applications: 1 },
    { date: 'Feb 11', applications: 1 },
    { date: 'Feb 12', applications: 1 },
  ]

  // Top Skills Demand
  console.log('Mock Candidates:', mockCandidates.length)
  const allSkills = mockCandidates.flatMap(c => c.skills || [])
  console.log('All Skills:', allSkills.length, allSkills)
  const skillCounts = allSkills.reduce((acc, skill) => {
    acc[skill] = (acc[skill] || 0) + 1
    return acc
  }, {})
  console.log('Skill Counts:', skillCounts)
  const topSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([skill, count]) => ({ skill, count }))
  
  console.log('Top Skills Data:', topSkills)

  const StatCard = ({ icon: Icon, label, value, trend, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
          <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <span className="text-green-600 dark:text-green-400 text-sm font-semibold">
          {trend}
        </span>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {label}
      </p>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Analytics
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Insights and metrics from your recruitment pipeline
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Total Candidates" value={mockCandidates.length} trend="+12%" delay={0.1} />
        <StatCard icon={Award} label="Avg Score" value="76" trend="+8%" delay={0.2} />
        <StatCard icon={Target} label="Strong Matches" value={mockCandidates.filter(c => c.category === 'Strong').length} trend="+15%" delay={0.3} />
        <StatCard icon={TrendingUp} label="Shortlisted" value={mockCandidates.filter(c => c.emailStatus.shortlisted).length} trend="+20%" delay={0.4} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Score Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="range" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="count" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Category Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Applications Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Applications Timeline
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="applications" 
              stroke="#0ea5e9" 
              strokeWidth={3}
              dot={{ fill: '#0ea5e9', r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Top Skills Demand */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Top Skills in Demand
        </h2>
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {topSkills.length > 0 ? `Showing ${topSkills.length} top skills` : 'No skills data'}
        </div>
        {topSkills.length > 0 ? (
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topSkills} margin={{ top: 20, right: 30, bottom: 80, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                <XAxis 
                  dataKey="skill"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  label={{ value: 'Number of Candidates', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`${value} candidates`, 'Count']}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]}>
                  {topSkills.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${270 - index * 15}, 75%, 65%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            <p>No skill data available</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
