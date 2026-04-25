import { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { getCareerRoadmap } from '../api/client'

function CareerRoadmap() {
  const [currentSkills, setCurrentSkills] = useState('')
  const [targetRole, setTargetRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [roadmap, setRoadmap] = useState(null)
  const [error, setError] = useState('')

  async function handleGenerate() {
    if (!targetRole.trim()) {
      setError('Please enter a target role.')
      return
    }
    setLoading(true)
    setError('')
    setRoadmap(null)
    try {
      const data = await getCareerRoadmap(currentSkills, targetRole)
      setRoadmap(data.roadmap)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Color cycling for weeks
  const weekColors = [
    { border: 'border-blue-500',   bg: 'bg-blue-50',   badge: 'bg-blue-600',   text: 'text-blue-700'   },
    { border: 'border-cyan-500',   bg: 'bg-cyan-50',   badge: 'bg-cyan-600',   text: 'text-cyan-700'   },
    { border: 'border-violet-500', bg: 'bg-violet-50', badge: 'bg-violet-600', text: 'text-violet-700' },
    { border: 'border-emerald-500', bg: 'bg-emerald-50', badge: 'bg-emerald-600', text: 'text-emerald-700' },
    { border: 'border-amber-500', bg: 'bg-amber-50', badge: 'bg-amber-600', text: 'text-amber-700' },
    { border: 'border-rose-500',    bg: 'bg-rose-50',    badge: 'bg-rose-600',    text: 'text-rose-700'    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Career Roadmap</h1>
        <p className="text-slate-600 text-lg">
          Tell us where you are and where you want to go — the AI will build a
          week-by-week learning plan to get you there.
        </p>
      </div>

      {/* Input card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 mb-6">

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Your Current Skills <span className="text-slate-400 font-normal">(optional — be as detailed as you like)</span>
          </label>
          <textarea
            value={currentSkills}
            onChange={e => { setCurrentSkills(e.target.value); setError('') }}
            rows={4}
            placeholder="e.g. Python basics, some SQL, university projects in statistics, no real work experience yet..."
            className="w-full border border-slate-300 rounded-lg p-3 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Target Job Role <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={targetRole}
            onChange={e => { setTargetRole(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleGenerate()}
            placeholder="e.g. Data Engineer, Full Stack Developer, Machine Learning Engineer"
            className="w-full border border-slate-300 rounded-lg p-3 
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading || !targetRole.trim()}
          className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed
                     text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Building Your Roadmap...' : 'Generate 6-Week Roadmap'}
        </button>
      </div>

      {/* Loading */}
      {loading && <LoadingSpinner message="Building your personalised learning roadmap..." />}

      {/* Results */}
      {roadmap && !loading && (
        <div className="reveal-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Your 6-Week Roadmap to{' '}
              <span className="text-blue-500">{targetRole}</span>
            </h2>
            <span className="text-sm text-slate-400">{roadmap.length} weeks</span>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block" />

            <div className="space-y-4">
              {roadmap.map((week, i) => {
                const c = weekColors[i % weekColors.length]
                return (
                  <div key={week.week} className="relative flex gap-4 md:gap-6">

                    {/* Timeline dot */}
                    <div className={`hidden md:flex w-12 h-12 rounded-full ${c.badge} text-white 
                                     font-bold text-sm items-center justify-center flex-shrink-0 
                                     z-10 shadow-md`}>
                      W{week.week}
                    </div>

                    {/* Week card */}
                    <div className={`flex-1 bg-white rounded-xl shadow-md overflow-hidden border-l-4 border ${c.border}`}>
                      <div className={`${c.bg} px-5 py-3 flex items-center gap-3`}>
                        {/* Mobile badge */}
                        <span className={`md:hidden w-8 h-8 rounded-full ${c.badge} text-white 
                                         font-bold text-xs flex items-center justify-center flex-shrink-0`}>
                          W{week.week}
                        </span>
                        <div>
                          <span className={`text-xs font-semibold uppercase tracking-wide ${c.text}`}>
                            Week {week.week}
                          </span>
                          <p className="text-slate-900 font-semibold text-sm mt-0.5">
                            {week.goal}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 py-4">
                        {Array.isArray(week.tasks) && week.tasks.length > 0 ? (
                          <ul className="space-y-2">
                            {week.tasks.map((task, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.badge}`} />
                                <span className="leading-relaxed">{task}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-slate-500 text-sm whitespace-pre-wrap leading-relaxed">
                            {typeof week.tasks === 'string' ? week.tasks : 'No tasks listed'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Encouragement footer */}
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white text-center">
            <p className="text-xl font-bold mb-1">You've got this!</p>
            <p className="text-blue-100 text-sm">
              6 weeks of consistent effort is all it takes to break into a new role.
              Stay consistent, track your progress, and keep building.
            </p>
          </div>

          {/* Reset */}
          <button
            onClick={() => { setRoadmap(null); setCurrentSkills(''); setTargetRole('') }}
            className="mt-6 text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Generate a roadmap for a different role
          </button>
        </div>
      )}
    </div>
  )
}

export default CareerRoadmap
