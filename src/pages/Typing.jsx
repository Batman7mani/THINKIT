import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import css from '../styles/typing-style.css?inline'
import usePage from '../usePage.js'

const sentences = [
  'I love learning new things.',
  'Practice makes perfect.',
  'You are a smart thinker.',
  'Reading is fun and powerful.',
  'Be proud of your progress.',
]
const keyRows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
const POINTS = 10
const POINTS_PER_LEVEL = 50

const randomSentence = () => sentences[Math.floor(Math.random() * sentences.length)]
const clickSound = new Audio('https://www.soundjay.com/button/beep-07.wav')

function readHighScore() {
  try { return Number(localStorage.getItem('highScore')) || 0 } catch { return 0 }
}

export default function Typing() {
  usePage(css, 'Typing Practice - THINKIT')
  const [target, setTarget] = useState(randomSentence)
  const [typed, setTyped] = useState('')
  const [startTime, setStartTime] = useState(Date.now)
  const [elapsed, setElapsed] = useState(0)
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [highScore, setHighScore] = useState(readHighScore)
  const [levelUp, setLevelUp] = useState(false)
  const fanfare = useRef(null)
  const inputRef = useRef(null)

  const done = typed === target
  const onTrack = target.startsWith(typed)
  const correct = [...typed].filter((ch, i) => ch === target[i]).length
  const accuracy = typed.length === 0 ? 100 : Math.round((correct / typed.length) * 100)
  const lastKey = typed.slice(-1).toLowerCase()

  useEffect(() => {
    if (done) return
    const id = setInterval(() => setElapsed((Date.now() - startTime) / 1000), 100)
    return () => clearInterval(id)
  }, [startTime, done])

  useEffect(() => {
    if (!levelUp) return
    fanfare.current?.play().catch(() => {})
    const id = setTimeout(() => setLevelUp(false), 3000)
    return () => clearTimeout(id)
  }, [levelUp])

  function handleType(e) {
    clickSound.currentTime = 0
    clickSound.play().catch(() => {}) // browsers may block autoplay; sound is optional
    setTyped(e.target.value)
  }

  function next() {
    const newScore = score + POINTS
    setScore(newScore)
    if (newScore >= level * POINTS_PER_LEVEL) {
      setLevel(level + 1)
      setLevelUp(true)
    }
    if (newScore > highScore) {
      setHighScore(newScore)
      try { localStorage.setItem('highScore', newScore) } catch { /* private mode: keep in memory only */ }
    }
    setTarget(randomSentence())
    setTyped('')
    setStartTime(Date.now())
    setElapsed(0)
    setTimeout(() => inputRef.current?.focus())
  }

  let feedback = ''
  if (done) feedback = '🎉 Great job! You typed it perfectly!'
  else if (typed && onTrack) feedback = '✅ Keep going!'
  else if (typed) feedback = '❌ Oops! Check your letters.'

  return (
    <>
      <header className="typing-header">
        <img src="logo.png" className="typing-logo" alt="THINKIT Logo" />
        <h1>Typing Practice</h1>
        <p className="typing-tagline">Train your fingers, teach your mind 🧠⌨️</p>
        <Link to="/" className="back-home">← Back to THINKIT Home</Link>
      </header>

      <main className="typing-container">
        <div className="display-box">{target}</div>

        <input
          ref={inputRef}
          type="text"
          id="typingInput"
          className={typed ? (onTrack ? 'correct' : 'incorrect') : ''}
          placeholder="Start typing here..."
          aria-label="Type the sentence above"
          autoComplete="off"
          autoFocus
          disabled={done}
          value={typed}
          onChange={handleType}
        />

        <div className="typing-metrics">
          <p>⏱ Time: <span>{elapsed.toFixed(1)}</span>s</p>
          <p>🎯 Accuracy: <span>{accuracy}</span>%</p>
        </div>

        <div className="keyboard-visual" aria-hidden="true">
          {keyRows.map(row => (
            <div className="key-row" key={row}>
              {[...row].map(k => <div key={k} className={`key${k === lastKey ? ' active' : ''}`}>{k}</div>)}
            </div>
          ))}
        </div>

        <div className="level-box">
          <div className="level-progress">
            <div className="progress-bar" style={{ width: `${(score % POINTS_PER_LEVEL) * 2}%` }}></div>
          </div>
          <p>🎓 Current Level: <span id="level">{level}</span></p>
          <p>🏆 Best Score: <span id="highScore">{highScore}</span></p>
          <p>🥇 Score: <span id="score">{score}</span></p>
        </div>

        <div className={`popup${levelUp ? '' : ' hidden'}`} role="status">
          <img src="animated-bear-dancing-xm4258py14d9arkl.gif" alt="Mascot" className="bear-gif" />
          <p>🎉 Level Up, Smart Thinker!</p>
        </div>
        <audio ref={fanfare} src="22-player-fanfare-5-101soundboards.mp3" preload="auto"></audio>

        <div className="feedback-message" aria-live="polite">{feedback}</div>

        {done && <button id="nextBtn" onClick={next}>➡️ Next Sentence</button>}
      </main>
    </>
  )
}
