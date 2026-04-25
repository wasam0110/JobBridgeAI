import { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { analyzeSkillsGap } from '../api/client'

function SkillsGap({ cvText, setCvText, jobRole, setJobRole, results, setResults }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAnalyze() {
    if (!cvText.trim()) {
      setError('Please paste your CV text.')
      return
    }
    if (!jobRole.trim()) {
      setError('Please enter a target job role.')
      return
    }
    setLoading(true)
    setError('')
    setResults(null)
    try {
      const data = await analyzeSkillsGap(cvText, jobRole)
      setResults(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Skills Gap Analysis</h1>
        <p className="text-slate-600 text-lg">
          Paste your CV and enter a target role — the AI will map which skills you already
          have versus what you still need to land the job.
        </p>
      </div>

      {/* Input card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Paste Your CV Text <span className="text-red-400">*</span>
          </label>
          <textarea
            value={cvText}
            onChange={e => { setCvText(e.target.value); setError('') }}
            rows={8}
            placeholder="Paste the full text of your CV here..."
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
            value={jobRole}
            onChange={e => { setJobRole(e.target.value); setError('') }}
            placeholder="e.g. Data Analyst, Frontend Developer, DevOps Engineer"
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
          onClick={handleAnalyze}
          disabled={loading || !cvText.trim() || !jobRole.trim()}
          className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed
                     text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Comparing Your Skills...' : 'Analyze Skills Gap'}
        </button>
      </div>

      {/* Loading */}
      {loading && <LoadingSpinner message="Comparing your skills against the role requirements..." />}

      {/* Results */}
      {results && !loading && (
        <div className="space-y-6 reveal-up">
          <h2 className="text-xl font-bold text-slate-900">
            Skills Gap Results for: <span className="text-blue-500">{jobRole}</span>
          </h2>

          {/* Two column skills layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Skills You Have */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-emerald-200">
              <div className="bg-green-50 px-5 py-3">
                <h3 className="font-semibold text-green-700">
                  Skills You Have ({results.matching_skills.length})
                </h3>
              </div>
              <div className="px-5 py-4">
                {results.matching_skills.length === 0 ? (
                  <p className="text-slate-400 text-sm italic">No matching skills found.</p>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {results.matching_skills.map((skill, i) => (
                      <li key={i} className="px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Skills You Need */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-red-200">
              <div className="bg-red-50 px-5 py-3">
                <h3 className="font-semibold text-red-700">
                  Skills You Need ({results.missing_skills.length})
                </h3>
              </div>
              <div className="px-5 py-4">
                {results.missing_skills.length === 0 ? (
                  <p className="text-slate-400 text-sm italic">No major gaps found — great job!</p>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {results.missing_skills.map((skill, i) => (
                      <li key={i} className="px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-200">
            <div className="bg-blue-50 px-5 py-3">
              <h3 className="font-semibold text-blue-700">Recommended Next Steps</h3>
            </div>
            <div className="px-5 py-4">
              {results.recommendations.length === 0 ? (
                <p className="text-slate-400 text-sm italic">No recommendations available.</p>
              ) : (
                <ul className="space-y-3">
                  {results.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center 
                                       justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Reset button */}
          <button
            onClick={() => { setResults(null); setCvText(''); setJobRole('') }}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Analyze a different role
          </button>
        </div>
      )}
    </div>
  )
}

export default SkillsGap
