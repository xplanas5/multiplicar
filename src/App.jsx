import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import LevelSelector from './components/LevelSelector.jsx'
import TopicSelector from './components/TopicSelector.jsx'
import ExerciseSession from './components/ExerciseSession.jsx'
import ResultsSummary from './components/ResultsSummary.jsx'
import ProgressDashboard from './components/ProgressDashboard.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nivell" element={<LevelSelector />} />
        <Route path="/temes/:level" element={<TopicSelector />} />
        <Route path="/exercicis/:level/:topicId" element={<ExerciseSession />} />
        <Route path="/resultats" element={<ResultsSummary />} />
        <Route path="/progres" element={<ProgressDashboard />} />
      </Routes>
    </div>
  )
}
