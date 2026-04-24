import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-4 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="*"
            element={(
              <div className="max-w-5xl mx-auto px-4 py-10">
                <h1 className="text-2xl font-bold text-gray-900">Coming soon</h1>
                <p className="text-gray-600 mt-2">This page will be added in the next commit.</p>
              </div>
            )}
          />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
