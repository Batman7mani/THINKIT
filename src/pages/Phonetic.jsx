import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import css from '../styles/phonetic-style.css?inline'
import usePage from '../usePage.js'

const phonemeMap = {
  cat: ['k', 'a', 't'],
  dog: ['d', 'o', 'g'],
  ship: ['sh', 'i', 'p'],
  phone: ['f', 'o', 'n'],
  think: ['th', 'i', 'n', 'k'],
  elephant: ['e', 'l', 'uh', 'f', 'uh', 'n', 't'],
}
const examples = [['🐘', 'elephant'], ['🐱', 'cat'], ['🚢', 'ship'], ['💭', 'think']]

// shortcut: unknown words fall back to one box per letter; swap in a real phoneme dictionary (e.g. CMUdict) for full coverage.
const segment = word => phonemeMap[word] || word.split('')

function say(sound) {
  const utter = new SpeechSynthesisUtterance(sound)
  utter.rate = 0.8
  speechSynthesis.speak(utter)
}

export default function Phonetic() {
  usePage(css, 'Phonetic Segmentation - THINKIT')
  const [word, setWord] = useState('')
  const [segments, setSegments] = useState([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Mount boxes hidden, then reveal one after another (staggered via transition-delay).
    const id = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(id)
  }, [segments])

  function run(w = word) {
    const clean = w.trim().toLowerCase()
    if (!clean) return alert('Please enter a word.')
    setVisible(false)
    setSegments(segment(clean))
  }

  return (
    <>
      <header className="phonetic-header">
        <div className="logo-box">
          <img src="logo.png" alt="THINKIT Logo" className="small-logo" />
          <div className="logo-text">
            <h1>PHONETIC SEGMENTATION</h1>
            <p className="phonetic-tagline">Break it. Speak it. Master it.</p>
          </div>
          <Link to="/" className="back-home">← Back to THINKIT Home</Link>
        </div>
      </header>

      <main className="phonetic-main">
        <input
          type="text"
          id="wordInput"
          placeholder="Type a word to segment..."
          aria-label="Word to segment"
          value={word}
          onChange={e => setWord(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && run()}
        />
        <button onClick={() => run()}>🔍 Segment Word</button>

        <div className="phoneme-output">
          {segments.map((sound, i) => (
            <div
              key={`${segments.join('')}-${i}`}
              className={`phoneme-box syllable-${i % 4}`}
              role="button"
              tabIndex={0}
              title="Click to hear this sound"
              onClick={() => say(sound)}
              onKeyDown={e => e.key === 'Enter' && say(sound)}
              style={visible ? { opacity: 1, transform: 'scale(1)', transitionDelay: `${i * 100}ms` } : undefined}
            >
              {sound}
            </div>
          ))}
        </div>

        <div className="example-words">
          <h3>🔤 Try These!</h3>
          <div className="example-buttons">
            {examples.map(([emoji, w]) => (
              <button key={w} onClick={() => { setWord(w); run(w) }}>{emoji} {w}</button>
            ))}
          </div>
        </div>

        <div className="phoneme-guide">
          <p>💡 <strong>Tip:</strong> Phonemes are tiny sound units. Breaking them down builds sound-mastery!</p>
        </div>

        <div className="next-section">
          <h3>🧠 Want to Practice More?</h3>
          <p>Try typing your favorite animal or fruit! Then break it into sounds!</p>
          <Link className="next-btn" to="/text-to-speech">→ Try Speaking It Aloud</Link>
        </div>

        <div className="segment-tip">
          <h3>💡 Why Segment?</h3>
          <p>
            Segmenting words into sounds helps learners understand how letters build pronunciation. This technique is
            key for decoding and spelling in early literacy, especially for students with dyslexia.
          </p>
        </div>
      </main>
    </>
  )
}
