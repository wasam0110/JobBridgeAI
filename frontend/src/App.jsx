import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CVAnalyzer from './pages/CVAnalyzer'
import Interview from './pages/Interview'
import LinkedInOptimizer from './pages/LinkedInOptimizer'
import SkillsGap from './pages/SkillsGap'
import CareerRoadmap from './pages/CareerRoadmap'

function App() {
  // CV Analyzer state
  const [cvSelectedFile, setCvSelectedFile] = useState(null)
  const [cvResults, setCvResults] = useState(null)

  // Interview state
  const [interviewView, setInterviewView] = useState('setup')
  const [interviewJobRole, setInterviewJobRole] = useState('')
  const [interviewQuestions, setInterviewQuestions] = useState([])
  const [interviewCurrentIndex, setInterviewCurrentIndex] = useState(0)
  const [interviewCurrentAnswer, setInterviewCurrentAnswer] = useState('')
  const [interviewSessionResults, setInterviewSessionResults] = useState([])

  // LinkedIn state
  const [linkedinSummary, setLinkedinSummary] = useState('')
  const [linkedinJobRole, setLinkedinJobRole] = useState('')
  const [linkedinResults, setLinkedinResults] = useState(null)

  // Skills gap state
  const [skillsCvText, setSkillsCvText] = useState('')
  const [skillsJobRole, setSkillsJobRole] = useState('')
  const [skillsResults, setSkillsResults] = useState(null)

  return (
    <BrowserRouter>
      {/* Navbar shows on every page */}
      <Navbar />

      {/* Main content area */}
      <main className="min-h-screen app-shell-bg pt-4 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cv"
            element={
              <CVAnalyzer
                selectedFile={cvSelectedFile}
                setSelectedFile={setCvSelectedFile}
                results={cvResults}
                setResults={setCvResults}
              />
            }
          />
          <Route
            path="/interview"
            element={
              <Interview
                view={interviewView}
                setView={setInterviewView}
                jobRole={interviewJobRole}
                setJobRole={setInterviewJobRole}
                questions={interviewQuestions}
                setQuestions={setInterviewQuestions}
                currentIndex={interviewCurrentIndex}
                setCurrentIndex={setInterviewCurrentIndex}
                currentAnswer={interviewCurrentAnswer}
                setCurrentAnswer={setInterviewCurrentAnswer}
                sessionResults={interviewSessionResults}
                setSessionResults={setInterviewSessionResults}
              />
            }
          />
          <Route
            path="/linkedin"
            element={
              <LinkedInOptimizer
                summary={linkedinSummary}
                setSummary={setLinkedinSummary}
                jobRole={linkedinJobRole}
                setJobRole={setLinkedinJobRole}
                results={linkedinResults}
                setResults={setLinkedinResults}
              />
            }
          />
          <Route
            path="/skills-gap"
            element={
              <SkillsGap
                cvText={skillsCvText}
                setCvText={setSkillsCvText}
                jobRole={skillsJobRole}
                setJobRole={setSkillsJobRole}
                results={skillsResults}
                setResults={setSkillsResults}
              />
            }
          />
          <Route path="/roadmap" element={<CareerRoadmap />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
