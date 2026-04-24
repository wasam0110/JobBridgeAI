import { useState } from 'react'

// Color map: maps color name → Tailwind border + icon colors
const colorMap = {
  green:  { border: 'border-green-500', bg: 'bg-green-50',  title: 'text-green-700',  icon: 'text-green-500' },
  red:    { border: 'border-red-500',   bg: 'bg-red-50',    title: 'text-red-700',    icon: 'text-red-500'   },
  yellow: { border: 'border-yellow-500',bg: 'bg-yellow-50', title: 'text-yellow-700', icon: 'text-yellow-500'},
  blue:   { border: 'border-blue-500',  bg: 'bg-blue-50',   title: 'text-blue-700',   icon: 'text-blue-500'  },
  gray:   { border: 'border-gray-400',  bg: 'bg-gray-50',   title: 'text-gray-700',   icon: 'text-gray-500'  },
}

// Props:
//   title   — string, shown as card heading
//   content — string, the AI-generated content (supports newlines)
//   color   — "green" | "red" | "yellow" | "blue" | "gray"

function ResultCard({ title, content, color = 'blue' }) {
  const [copied, setCopied] = useState(false)
  const colors = colorMap[color] || colorMap.blue

  // Copy content to clipboard
  function handleCopy() {
    navigator.clipboard.writeText(content || '').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Render content — split by newlines and render each line
  // Lines starting with - or • become styled bullet points
  function renderContent(text) {
    if (!text) return <p className="text-gray-400 italic">No data returned</p>

    const lines = text.split('\n')
    return lines.map((line, i) => {
      const trimmed = line.trim()
      if (!trimmed) return <div key={i} className="h-2" />  // blank line spacer

      // Bullet points
      if (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*')) {
        const bulletText = trimmed.replace(/^[-•*]\s*/, '')
        return (
          <div key={i} className="flex items-start gap-2 mb-1">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.icon.replace('text', 'bg')}`} />
            <span className="text-gray-700 text-sm leading-relaxed">{bulletText}</span>
          </div>
        )
      }

      // Numbered lines
      if (/^\d+\./.test(trimmed)) {
        return (
          <p key={i} className="text-gray-700 text-sm leading-relaxed mb-1">{trimmed}</p>
        )
      }

      // Regular text
      return (
        <p key={i} className="text-gray-700 text-sm leading-relaxed mb-1">{trimmed}</p>
      )
    })
  }

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${colors.border}`}>
      {/* Card header */}
      <div className={`${colors.bg} px-6 py-3 flex items-center justify-between`}>
        <h3 className={`font-semibold text-base ${colors.title}`}>{title}</h3>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 
                     bg-white border border-gray-200 rounded-md px-2 py-1 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Card content */}
      <div className="px-6 py-4">
        {renderContent(content)}
      </div>
    </div>
  )
}

export default ResultCard
