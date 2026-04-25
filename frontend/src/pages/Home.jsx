import { Link } from 'react-router-dom'

// Feature cards shown on the home page
const features = [
  {
    path: '/cv',
    icon: '',
    title: 'CV Analyzer',
    description: 'Upload your CV and get AI-powered feedback on strengths, weaknesses, and specific improvements.',
    color: 'blue',
    buttonText: 'Analyze My CV →',
  },
  {
    path: '/interview',
    icon: '',
    title: 'Mock Interview',
    description: 'Practice with AI-generated interview questions for your target role and get instant feedback.',
    color: 'purple',
    buttonText: 'Start Interview →',
  },
  {
    path: '/linkedin',
    icon: '',
    title: 'LinkedIn Optimizer',
    description: 'Paste your LinkedIn summary and let AI rewrite it to be more compelling and keyword-rich.',
    color: 'green',
    buttonText: 'Optimize Profile →',
  },
  {
    path: '/skills-gap',
    icon: '',
    title: 'Skills Gap Analysis',
    description: 'Find out exactly which skills you have vs. which ones are required for your dream job.',
    color: 'orange',
    buttonText: 'Check Skills Gap →',
  },
  {
    path: '/roadmap',
    icon: '',
    title: 'Career Roadmap',
    description: 'Get a personalised week-by-week learning plan to go from your current skills to your target role.',
    color: 'teal',
    buttonText: 'Build My Roadmap →',
  },
]

const colorMap = {
  blue:   'bg-blue-50 border-blue-200 hover:border-blue-400',
  purple: 'bg-purple-50 border-purple-200 hover:border-purple-400',
  green:  'bg-green-50 border-green-200 hover:border-green-400',
  orange: 'bg-orange-50 border-orange-200 hover:border-orange-400',
  teal:   'bg-teal-50 border-teal-200 hover:border-teal-400',
}

const btnColorMap = {
  blue:   'bg-blue-500 hover:bg-blue-600',
  purple: 'bg-purple-500 hover:bg-purple-600',
  green:  'bg-green-500 hover:bg-green-600',
  orange: 'bg-orange-500 hover:bg-orange-600',
  teal:   'bg-teal-500 hover:bg-teal-600',
}

function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Hero section */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 
                        text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          AI-Powered Career Tools for Graduates
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          From Graduate to{' '}
          <span className="text-blue-500">Job-Ready</span>
        </h1>

        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Use the power of AI to analyze your CV, practice interviews, optimize your
          LinkedIn, and close the skills gap — all in one place.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            to="/cv"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold 
                       py-3 px-8 rounded-lg transition-colors duration-200 text-lg shadow-md"
          >
            Get Started — Upload CV
          </Link>
          <Link
            to="/interview"
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold 
                       py-3 px-8 rounded-lg border border-gray-200 transition-colors duration-200 text-lg"
          >
            Practice Interview
          </Link>
        </div>
      </div>

      {/* Feature cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <div
            key={feature.path}
            className={`border-2 rounded-xl p-6 transition-all duration-200 ${colorMap[feature.color]}`}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
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
      <div className="mt-14 text-center text-gray-400 text-sm">
        <p>Built by AI Titans • Powered by Groq AI </p>
      </div>
    </div>
  )
}

export default Home
