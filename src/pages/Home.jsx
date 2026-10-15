import { useState } from 'react'
import { Link } from 'react-router-dom'
import css from '../styles/styles.css?inline'
import usePage from '../usePage.js'

const features = [
  { to: '/text-to-speech', label: 'Text-to-Speech + Highlighting' },
  { to: '/phonetic', label: 'Phonetic Segmentation' },
  { to: '/worksheets', label: 'Downloadable Worksheets' },
  { to: '/typing', label: 'Typing Practice' },
  { to: '/quiz', label: 'Daily THINKIT QUIZ' },
]

export default function Home() {
  usePage(css, 'THINKIT - A Place Where Every Kid Evolves')
  const [showLogin, setShowLogin] = useState(false)
  const [consent, setConsent] = useState(false)
  const [query, setQuery] = useState('')

  const shown = features.filter(f => f.label.toLowerCase().includes(query.trim().toLowerCase()))

  function handleSubmit(e) {
    e.preventDefault()
    alert('Welcome to THINKIT! 🎉')
    setShowLogin(false)
  }

  return (
    <>
      {showLogin && (
        <div className="login-modal" onClick={e => e.target === e.currentTarget && setShowLogin(false)}>
          <div className="login-popup" role="dialog" aria-modal="true" aria-labelledby="login-title">
            <h2 id="login-title">👋 Hello New Thinker!</h2>
            <img src="bear-hungry.gif" alt="Bear Mascot" className="b-mascot" />
            <p>Start your journey by filling the form below:</p>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Your Name" aria-label="Your name" required />
              <input type="email" placeholder="Your Email" aria-label="Your email" required />
              <input type="date" aria-label="Date of birth" required />
              <label className="consent">
                <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
                I have parent/guardian consent.
              </label>
              <button type="submit" disabled={!consent}>🚀 Let's Begin!</button>
            </form>
            <button className="close-btn" aria-label="Close" onClick={() => setShowLogin(false)}>✖</button>
          </div>
        </div>
      )}

      <header className="header main-header">
        <div className="header-left">
          <img src="logo.png" alt="ThinkIt Logo" className="logo" />
          <div>
            <h1 className="project-name">THINKIT</h1>
            <p className="tagline">A place where every kid evolves</p>
          </div>
        </div>
        <div className="header-right">
          <button className="login-btn" onClick={() => setShowLogin(true)}>Login</button>
        </div>
      </header>

      <div className="banner-section">
        <h1>Empowering Young Minds to Read, Learn, and Grow</h1>
        <p>Interactive tools built with love for children with dyslexia</p>
      </div>

      <hr className="divider" />

      <section className="search-area">
        <input
          type="text"
          className="search-input"
          placeholder="Think with me..."
          aria-label="Search tools"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="search-btn" aria-label="Search">🔍</button>
      </section>

      <main className="features">
        {shown.map(f => (
          <Link key={f.to} to={f.to} className="feature">{f.label}</Link>
        ))}
        {shown.length === 0 && <p>No tools match "{query}". Try another word!</p>}
      </main>

      <footer className="about">
        <h2>About Us</h2>
        <p>
          THINKIT is an inclusive learning platform designed to support children with dyslexia and other learning
          needs. Our goal is to build a space where kids can grow through personalized, multi-sensory, and accessible
          education tools.
        </p>
      </footer>

      <footer className="thinkit-footer">
        <div className="footer-content">
          <div className="footer-social">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><img src="download.webp" alt="LinkedIn" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><img src="OIP (1).webp" alt="Twitter" /></a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer"><img src="OIP.webp" alt="YouTube" /></a>
          </div>
          <p>©2025 THINKIT. Built with ❤️ for smart kids worldwide.</p>
          <div className="footer-links">
            <a href="#/">Privacy Policy</a>
            <a href="#/">Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  )
}
