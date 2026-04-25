import { Link } from 'react-router-dom'

// Feature cards shown on the home page
const features = [
  {
    path: '/cv',
    badge: 'CV',
    title: 'CV Analyzer',
    description: 'Upload your CV and get AI-powered feedback on strengths, weaknesses, and specific improvements.',
    color: 'blue',
    buttonText: 'Analyze My CV →',
  },
  {
    path: '/interview',
    badge: 'MI',
    title: 'Mock Interview',
    description: 'Practice with AI-generated interview questions for your target role and get instant feedback.',
    color: 'purple',
    buttonText: 'Start Interview →',
  },
  {
    path: '/linkedin',
    badge: 'LI',
    title: 'LinkedIn Optimizer',
    description: 'Paste your LinkedIn summary and let AI rewrite it to be more compelling and keyword-rich.',
    color: 'green',
    buttonText: 'Optimize Profile →',
  },
  {
    path: '/skills-gap',
    badge: 'SG',
    title: 'Skills Gap Analysis',
    description: 'Find out exactly which skills you have vs. which ones are required for your dream job.',
    color: 'orange',
    buttonText: 'Check Skills Gap →',
  },
  {
    path: '/roadmap',
    badge: 'CR',
    title: 'Career Roadmap',
    description: 'Get a personalised week-by-week learning plan to go from your current skills to your target role.',
    color: 'teal',
    buttonText: 'Build My Roadmap →',
  },
]

const colorMap = {
  blue:   'bg-blue-50/80 border-blue-200 hover:border-blue-400',
  purple: 'bg-violet-50/80 border-violet-200 hover:border-violet-400',
  green:  'bg-emerald-50/80 border-emerald-200 hover:border-emerald-400',
  orange: 'bg-amber-50/80 border-amber-200 hover:border-amber-400',
  teal:   'bg-cyan-50/80 border-cyan-200 hover:border-cyan-400',
}

const btnColorMap = {
  blue:   'bg-blue-600 hover:bg-blue-700',
  purple: 'bg-violet-600 hover:bg-violet-700',
  green:  'bg-emerald-600 hover:bg-emerald-700',
  orange: 'bg-amber-600 hover:bg-amber-700',
  teal:   'bg-cyan-600 hover:bg-cyan-700',
}

const badgeMap = {
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-violet-100 text-violet-700',
  green: 'bg-emerald-100 text-emerald-700',
  orange: 'bg-amber-100 text-amber-700',
  teal: 'bg-cyan-100 text-cyan-700',
}

function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 overflow-hidden">

      {/* Hero section */}
      <div className="text-center mb-14 relative rounded-3xl px-4 py-12 bg-white/75 border border-white/80 shadow-[0_24px_44px_rgba(15,23,42,0.08)]">
        <span className="hero-orb w-40 h-40 bg-cyan-200 -top-8 left-10" />
        <span className="hero-orb w-44 h-44 bg-amber-200 -bottom-8 right-10" />

        <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 
                        text-cyan-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          AI-Powered Career Tools for Graduates
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
          From Graduate to{' '}
          <span className="bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">Job-Ready</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Use the power of AI to analyze your CV, practice interviews, optimize your
          LinkedIn, and close the skills gap — all in one place.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            to="/cv"
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold 
                       py-3 px-8 rounded-xl transition-colors duration-200 text-lg shadow-md"
          >
            Get Started — Upload CV
          </Link>
          <Link
            to="/interview"
            className="bg-white hover:bg-slate-100 text-slate-700 font-semibold 
                       py-3 px-8 rounded-xl border border-slate-200 transition-colors duration-200 text-lg"
          >
            Practice Interview
          </Link>
        </div>
      </div>

      {/* Feature cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div
            key={feature.path}
            className={`feature-card stagger-enter border-2 rounded-2xl p-6 ${colorMap[feature.color]}`}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 text-sm font-bold ${badgeMap[feature.color]}`}>
              {feature.badge}
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">{feature.description}</p>
            <Link
              to={feature.path}
              className={`inline-block ${btnColorMap[feature.color]} text-white font-semibold 
                         py-2 px-6 rounded-lg transition-colors duration-200`}
            >
              {feature.buttonText}
            </Link>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-14 text-center text-slate-500 text-sm">
        <p>Built by AI Titans • Powered by Groq AI </p>
      </div>
    </div>
  )
}

export default Home
