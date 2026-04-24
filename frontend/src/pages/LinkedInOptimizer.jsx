import { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { optimizeLinkedIn } from '../api/client'

function LinkedInOptimizer() {
  const [summary, setSummary] = useState('')
  const [jobRole, setJobRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleOptimize() {
    if (!summary.trim()) {
      setError('Please paste your LinkedIn summary first.')
      return
    }
    setLoading(true)
    setError('')
    setResults(null)
    try {
      const data = await optimizeLinkedIn(summary, jobRole)
      setResults(data)
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    if (!results?.optimized) return
    navigator.clipboard.writeText(results.optimized).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const charCount = summary.length

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">💼 LinkedIn Optimizer</h1>
        <p className="text-gray-500 text-lg">
          Paste your current LinkedIn About section and let AI rewrite it to be more
          compelling, professional, and keyword-rich.
        </p>
      </div>

      {/* Input card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Current LinkedIn Summary <span className="text-red-400">*</span>
          </label>
          <textarea
            value={summary}
            onChange={e => { setSummary(e.target.value); setError('') }}
            rows={7}
            placeholder="I am a recent graduate looking for opportunities in... (paste your current LinkedIn About section here)"
            className="w-full border border-gray-300 rounded-lg p-3 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-400">Minimum 50 characters recommended</p>
            <p className={`text-xs ${charCount < 50 ? 'text-red-400' : 'text-gray-400'}`}>
              {charCount} characters
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Job Role <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={jobRole}
            onChange={e => setJobRole(e.target.value)}
            placeholder="e.g. Frontend Developer, Data Scientist, Marketing Manager"
            className="w-full border border-gray-300 rounded-lg p-3 
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
          onClick={handleOptimize}
          disabled={loading || !summary.trim()}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed
                     text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Rewriting Your Summary...' : 'Optimize My LinkedIn'}
        </button>
      </div>

      {/* Loading */}
      {loading && <LoadingSpinner message="Rewriting your summary..." />}

      {/* Results */}
      {results && !loading && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">✨ Results</h2>

          {/* Side by side comparison — stacks on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Original */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="bg-gray-100 px-5 py-3">
                <h3 className="font-semibold text-gray-700 text-sm">📝 Your Original</h3>
              </div>
              <div className="px-5 py-4">
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{summary}</p>
              </div>
            </div>

            {/* Optimized */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-blue-400">
              <div className="bg-blue-50 px-5 py-3 flex items-center justify-between">
                <h3 className="font-semibold text-blue-700 text-sm">🚀 AI Optimized Version</h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 
                             bg-white border border-blue-200 rounded-md px-2 py-1 transition-colors"
                >
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div className="px-5 py-4">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{results.optimized}</p>
              </div>
            </div>
          </div>

          {/* Improvements made */}
          {results.improvements_made && results.improvements_made.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="font-semibold text-green-800 mb-3">✅ Improvements Made</h3>
              <ul className="space-y-2">
                {results.improvements_made.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Redo button */}
          <button
            onClick={() => { setResults(null); setSummary(''); setJobRole('') }}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Start over with a different summary
          </button>
        </div>
      )}
    </div>
  )
}

export default LinkedInOptimizer
