import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import ResultCard from '../components/ResultCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { analyzeCv } from '../api/client'

function CVAnalyzer({ selectedFile, setSelectedFile, results, setResults }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Called when user picks a file in the FileUpload component
  function handleFileSelect(file) {
    setSelectedFile(file)
    setError('')
    setResults(null)
  }

  // Called when user clicks "Analyze My CV"
  async function handleAnalyze() {
    if (!selectedFile) {
      setError('Please upload a PDF file first.')
      return
    }

    setLoading(true)
    setError('')
    setResults(null)

    try {
      // Build FormData for file upload
      const formData = new FormData()
      formData.append('file', selectedFile)

      const data = await analyzeCv(formData)
      setResults(data)
    } catch (err) {
      // Show the error message from the API, or a generic fallback
      const message = err.response?.data?.detail || 'Something went wrong. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">CV Analyzer</h1>
        <p className="text-slate-600 text-lg">
          Upload your CV as a PDF and get detailed AI feedback on what's working, what isn't,
          and exactly how to improve it.
        </p>
      </div>

      {/* Upload card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Upload Your CV</h2>

        <FileUpload onFileSelect={handleFileSelect} accept=".pdf" />

        {/* Error banner */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm flex items-start gap-2">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleAnalyze}
          disabled={loading || !selectedFile}
          className="mt-6 w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed
                     text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-base"
        >
          {loading ? 'Analyzing...' : 'Analyze My CV'}
        </button>
      </div>

      {/* Loading state */}
      {loading && (
        <LoadingSpinner message="AI is reviewing your CV..." />
      )}

      {/* Results section */}
      {results && !loading && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mt-4 mb-2">Analysis Results</h2>

          <ResultCard
            title="Strengths"
            content={results.strengths}
            color="green"
          />
          <ResultCard
            title="Weak Points"
            content={results.weak_points}
            color="red"
          />
          <ResultCard
            title="Missing Skills"
            content={results.missing_skills}
            color="yellow"
          />
          <ResultCard
            title="Improved CV Suggestions"
            content={results.improved_suggestions}
            color="blue"
          />
        </div>
      )}
    </div>
  )
}

export default CVAnalyzer
