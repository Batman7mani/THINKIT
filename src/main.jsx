import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import TextToSpeech from './pages/TextToSpeech.jsx'
import Phonetic from './pages/Phonetic.jsx'
import Worksheets from './pages/Worksheets.jsx'
import Typing from './pages/Typing.jsx'
import Quiz from './pages/Quiz.jsx'

// HashRouter: GitHub Pages has no SPA fallback, so deep links must live after the #.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text-to-speech" element={<TextToSpeech />} />
        <Route path="/phonetic" element={<Phonetic />} />
        <Route path="/worksheets" element={<Worksheets />} />
        <Route path="/typing" element={<Typing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
