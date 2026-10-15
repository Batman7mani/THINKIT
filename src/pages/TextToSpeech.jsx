import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import css from '../styles/tts-style.css?inline'
import usePage from '../usePage.js'

const phrases = [
  'Hello, how are you today?',
  'I need help with my homework.',
  'Can you say that again?',
  'Thank you for helping me.',
]
const DAILY_GOAL = 100

const countWords = text => (text.trim() === '' ? 0 : text.trim().split(/\s+/).length)

export default function TextToSpeech() {
  usePage(css, 'Text-to-Speech - THINKIT')
  const [started, setStarted] = useState(false)
  const [text, setText] = useState('')
  const [voices, setVoices] = useState([])
  const [voiceIndex, setVoiceIndex] = useState(0)
  const [spokenWords, setSpokenWords] = useState(0)
  const [showWrapup, setShowWrapup] = useState(false)

  useEffect(() => {
    if (!('speechSynthesis' in window)) return
    // Chrome loads voices async; Firefox/Safari may already have them.
    const load = () => setVoices(speechSynthesis.getVoices())
    load()
    speechSynthesis.addEventListener('voiceschanged', load)
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', load)
      speechSynthesis.cancel()
    }
  }, [])

  function choose(mode) {
    alert(mode === 'beginner'
      ? '🧠 Instructions:\n\n1. Type or paste text in the box.\n2. Click the Speak button to hear it.\n3. Enjoy learning at your own pace!'
      : '🎉 Welcome back, Pro Thinker! Keep evolving and helping others!')
    setStarted(true)
  }

  function speak() {
    const input = text.trim()
    if (!input) return alert('Please enter some text.')
    if (!('speechSynthesis' in window)) return alert('Sorry, your browser does not support speech. Try Chrome or Edge.')

    setSpokenWords(n => n + countWords(input))
    const utterance = new SpeechSynthesisUtterance(input)
    if (voices[voiceIndex]) utterance.voice = voices[voiceIndex]
    utterance.onend = () => setShowWrapup(true)
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }

  const progress = Math.min(spokenWords, DAILY_GOAL)

  return (
    <>
      <header className="tts-header">
        <div className="logo-box">
          <img src="logo.png" alt="THINKIT Logo" className="small-logo" />
          <div className="logo-text">
            <h1>TEXT TO SPEECH</h1>
            <p className="tts-tagline">Thinking It To Speech</p>
          </div>
        </div>
      </header>

      <main className="tts-main">
        {!started ? (
          <div className="instruction-popup">
            <h2>Welcome, Thinker!</h2>
            <p>Choose your mode to continue:</p>
            <div className="popup-buttons">
              <button onClick={() => choose('beginner')}>New Thinker</button>
              <button onClick={() => choose('pro')}>Pro Thinker</button>
              <div className="learning-card">
                <h3>💡 Quick Tip</h3>
                <p>Reading aloud activates multiple brain regions — type your favorite sentence and press Speak!</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="tts-box">
            <textarea
              rows="6"
              placeholder="Type or paste your sentence here..."
              aria-label="Text to speak"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <div className="common-phrases">
              <h4>💬 Common Phrases</h4>
              <div className="phrase-list">
                {phrases.map(p => <button key={p} onClick={() => setText(p)}>{p}</button>)}
              </div>
            </div>

            <p className="counter">Words: {countWords(text)} | Characters: {text.trim().length}</p>
            <select
              className="voice-select"
              aria-label="Voice"
              value={voiceIndex}
              onChange={e => setVoiceIndex(Number(e.target.value))}
            >
              {voices.map((v, i) => <option key={v.voiceURI + i} value={i}>{v.name} ({v.lang})</option>)}
            </select>
            <button onClick={speak}>🔊 Speak</button>
          </div>
        )}

        <div className="why-box">
          <div className="why-title">🤔 WHY USE ME</div>
          <div className="why-content">
            <p>
              Children with dyslexia often struggle with decoding and processing written text. Our Text-to-Speech
              (TTS) tool converts typed or pasted words into clear audio, helping students connect written language
              to spoken language. This strengthens phonemic awareness, boosts comprehension, and fosters confidence.
            </p>
            <p>
              By hearing what they read, dyslexic learners can focus on <strong>meaning</strong>, not just decoding.
              This empowers them to engage with stories, instructions, and educational material at their own pace —
              independently and with dignity.
            </p>
            <p>
              THINKIT’s TTS is built with accessibility-first design, customizable voices, and responsive feedback —
              because every learner deserves to be heard, understood, and uplifted.
            </p>
          </div>
        </div>

        <div className="back-home">
          <Link to="/">← Back to THINKIT Home</Link>
        </div>
      </main>

      <div className="progress-section">
        <label htmlFor="progressBar">📊 Your Progress Today:</label>
        <progress id="progressBar" value={progress} max={DAILY_GOAL}></progress>
        <span id="progressCount">{progress} / {DAILY_GOAL} words</span>
      </div>

      {showWrapup && (
        <div className="tts-wrapup" style={{ animation: 'fadeInUp 1s ease forwards' }}>
          <h2>You’re One Click Away From Clarity</h2>
          <p>
            Whether you're a new thinker discovering your voice, or a pro mastering fluency — every word you hear
            brings you closer to understanding.
          </p>
          <p>Reading is not just about letters. It’s about confidence. Comprehension. Growth.</p>
          <p>Go ahead — type a thought, a sentence, or your favorite word. Let THINKIT speak it for you. 💬</p>
          <div className="encourage-footer">
            <p>🌟 Ready to explore more ways to grow? Head back to THINKIT Home to try another feature!</p>
            <Link to="/" className="home-link">← Explore Other Tools</Link>
          </div>
        </div>
      )}
    </>
  )
}
