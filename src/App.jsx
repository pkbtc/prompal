import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { getOrCreateAnonymousId } from './utils/anonymousId'
import './App.css'

// Components
import Header from './components/Header'
import Footer from './components/Footer'

// Pages
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import QuizResult from './pages/QuizResult'
import Compatibility from './pages/Compatibility'
import Messages from './pages/Messages'
import PromposalCreator from './pages/PromposalCreator'
import ViewPromposal from './pages/ViewPromposal'
import VipProfile from './pages/VipProfile'
import NotFound from './pages/NotFound'

function App() {
  const [userId, setUserId] = useState('')
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false)
  
  useEffect(() => {
    // Get or create user's anonymous ID
    const id = getOrCreateAnonymousId()
    setUserId(id)
    
    // Check if user has completed the quiz
    const vibeType = localStorage.getItem('vibeType')
    setHasCompletedQuiz(!!vibeType)
  }, [])

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header userId={userId} hasCompletedQuiz={hasCompletedQuiz} />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home userId={userId} hasCompletedQuiz={hasCompletedQuiz} />} />
            <Route path="/quiz" element={<Quiz userId={userId} setHasCompletedQuiz={setHasCompletedQuiz} />} />
            <Route path="/quiz-result" element={<QuizResult userId={userId} />} />
            <Route path="/compatibility" element={<Compatibility userId={userId} />} />
            <Route path="/messages" element={<Messages userId={userId} />} />
            <Route path="/create-promposal" element={<PromposalCreator userId={userId} />} />
            <Route path="/promposal/:id" element={<ViewPromposal />} />
            <Route path="/vip/:id" element={<VipProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App
