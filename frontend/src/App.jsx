import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CVAnalyzer from './pages/CVAnalyzer'
import Interview from './pages/Interview'
import LinkedInOptimizer from './pages/LinkedInOptimizer'
import SkillsGap from './pages/SkillsGap'
import CareerRoadmap from './pages/CareerRoadmap'

function App() {
  return (
    <BrowserRouter>
      {/* Navbar shows on every page */}
      <Navbar />

      {/* Main content area */}
      <main className="min-h-screen bg-gray-50 pt-4 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cv" element={<CVAnalyzer />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/linkedin" element={<LinkedInOptimizer />} />
          <Route path="/skills-gap" element={<SkillsGap />} />
          <Route path="/roadmap" element={<CareerRoadmap />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
