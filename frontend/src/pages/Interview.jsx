import { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { startInterview, submitAnswer } from '../api/client'

// Interview has 3 views: setup → in-progress → summary
const VIEW_SETUP = 'setup'
const VIEW_INTERVIEW = 'interview'
const VIEW_SUMMARY = 'summary'

function Interview({
  view,
  setView,
  jobRole,
  setJobRole,
  questions,
  setQuestions,
  currentIndex,
  setCurrentIndex,
  currentAnswer,
  setCurrentAnswer,
  sessionResults,
  setSessionResults,
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ── SETUP VIEW: Generate questions ──────────────────────────
  async function handleStartInterview() {
    if (!jobRole.trim()) {
      setError('Please enter a job role.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const data = await startInterview(jobRole)
      setQuestions(data.questions)
      setCurrentIndex(0)
      setSessionResults([])
      setCurrentAnswer('')
      setView(VIEW_INTERVIEW)
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not generate questions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── INTERVIEW VIEW: Submit answer for feedback ───────────────
  async function handleSubmitAnswer() {
    if (!currentAnswer.trim()) {
      setError('Please type your answer before submitting.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const data = await submitAnswer(questions[currentIndex], currentAnswer, jobRole)

      // Save result for this question
      setSessionResults(prev => [
        ...prev,
        {
          question: questions[currentIndex],
          answer: currentAnswer,
          feedback: data.feedback,
          score: data.score,
        }
      ])
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not get feedback. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Move to next question or show summary
  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      setView(VIEW_SUMMARY)
    } else {
      setCurrentIndex(prev => prev + 1)
      setCurrentAnswer('')
      setError('')
    }
  }

  // Score badge colors
  function getScoreColor(score) {
    if (score === 'Good') return 'bg-green-100 text-green-700 border-green-300'
    if (score === 'Needs Improvement') return 'bg-red-100 text-red-700 border-red-300'
    return 'bg-yellow-100 text-yellow-700 border-yellow-300'
  }

  // Check if current question has been answered (result exists)
  const currentResult = sessionResults[currentIndex]

  // ══════════════════════════════════════════════════════════
  // VIEW 1: Setup
  // ══════════════════════════════════════════════════════════
  if (view === VIEW_SETUP) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Mock Interview</h1>
          <p className="text-slate-600 text-lg">
            Enter the role you're interviewing for and get 4 realistic interview questions with AI feedback.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            What job role are you interviewing for?
          </label>
          <input
            type="text"
            value={jobRole}
            onChange={e => { setJobRole(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleStartInterview()}
            placeholder="e.g. Software Engineer, Data Analyst, Product Manager"
            className="w-full border border-slate-300 rounded-lg p-3 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleStartInterview}
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed
                       text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {loading ? 'Preparing Interview...' : 'Generate Interview Questions'}
          </button>
        </div>

        {loading && <LoadingSpinner message="Preparing your interview..." />}
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════
  // VIEW 2: Interview in progress
  // ══════════════════════════════════════════════════════════
  if (view === VIEW_INTERVIEW) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Mock Interview</h1>
          <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-cyan-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Current question */}
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6 mb-6">
          <p className="text-sm text-cyan-700 font-semibold mb-2">Question {currentIndex + 1}</p>
          <p className="text-slate-900 text-lg font-medium leading-relaxed">
            {questions[currentIndex]}
          </p>
        </div>

        {/* Answer textarea — disabled if already answered */}
        {!currentResult && (
          <>
            <label className="block text-sm font-medium text-slate-700 mb-2">Your Answer</label>
            <textarea
              value={currentAnswer}
              onChange={e => { setCurrentAnswer(e.target.value); setError('') }}
              rows={6}
              placeholder="Type your answer here... Take your time and answer as you would in a real interview."
              className="w-full border border-slate-300 rounded-lg p-3 mb-4
                         focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmitAnswer}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed
                         text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Getting Feedback...' : 'Submit Answer'}
            </button>

            {loading && <LoadingSpinner message="Evaluating your answer..." />}
          </>
        )}

        {/* Feedback card — shown after answer is submitted */}
        {currentResult && (
          <div className="space-y-4 reveal-up">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-sm font-medium text-slate-500 mb-1">Your answer:</p>
              <p className="text-slate-700 text-sm leading-relaxed">{currentResult.answer}</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">AI Feedback</h3>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getScoreColor(currentResult.score)}`}>
                  {currentResult.score}
                </span>
              </div>
              <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                {currentResult.feedback}
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold 
                         py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {currentIndex + 1 >= questions.length ? 'View Full Summary →' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════
  // VIEW 3: Summary
  // ══════════════════════════════════════════════════════════
  if (view === VIEW_SUMMARY) {
    const goodCount = sessionResults.filter(r => r.score === 'Good').length
    const encouragement = goodCount >= 3
      ? "Great performance! You're well-prepared for this role."
      : goodCount >= 2
        ? "Solid effort! A bit more practice and you'll nail it."
        : "Keep practicing — every attempt makes you stronger."

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Interview Summary</h1>

        {/* Overall score banner */}
        <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-5 mb-8 text-center">
          <p className="text-2xl font-bold text-blue-700 mb-1">
            {goodCount} / {sessionResults.length} Good Answers
          </p>
          <p className="text-slate-600">{encouragement}</p>
        </div>

        {/* All Q&A with feedback */}
        <div className="space-y-6">
          {sessionResults.map((result, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
              <div className="bg-slate-50 px-6 py-3 flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-700">Question {i + 1}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getScoreColor(result.score)}`}>
                  {result.score}
                </span>
              </div>
              <div className="px-6 py-4 space-y-3">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase mb-1">Question</p>
                  <p className="text-slate-900 font-medium">{result.question}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase mb-1">Your Answer</p>
                  <p className="text-slate-600 text-sm">{result.answer}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase mb-1">AI Feedback</p>
                  <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">{result.feedback}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Try again button */}
        <button
          onClick={() => {
            setView(VIEW_SETUP)
            setJobRole('')
            setQuestions([])
            setSessionResults([])
            setCurrentIndex(0)
            setCurrentAnswer('')
          }}
          className="mt-8 w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold 
                     py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Start New Interview
        </button>
      </div>
    )
  }

  return null
}

export default Interview
