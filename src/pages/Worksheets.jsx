import { Link } from 'react-router-dom'
import css from '../styles/worksheets-style.css?inline'
import usePage from '../usePage.js'

const sheets = [
  { img: 'preview-letters.png', alt: 'Letters Preview', title: 'Letters & Sounds', file: 'worksheets/letters-a-z.pdf' },
  { img: 'preview-phonics.png', alt: 'Phonics Preview', title: 'Phonics Match', file: 'worksheets/phonics-match.pdf' },
  { img: 'preview-reading.png', alt: 'Reading Practice', title: 'Reading Practice', file: 'worksheets/reading-sheet.pdf' },
]

export default function Worksheets() {
  usePage(css, 'Downloadable Worksheets - THINKIT')

  return (
    <>
      <header className="ws-header">
        <img src="logo.png" className="ws-logo" alt="ThinkIt Logo" />
        <h1>Downloadable Worksheets</h1>
        <p className="ws-tagline">Practice makes progress!</p>
        <Link to="/" className="back-home">← Back to THINKIT Home</Link>
      </header>

      <main className="worksheet-grid">
        {sheets.map(s => (
          <div className="worksheet-card" key={s.file}>
            <img src={s.img} alt={s.alt} />
            <h3>{s.title}</h3>
            <a href={s.file} download className="download-btn">⬇ Download PDF</a>
          </div>
        ))}
      </main>

      <footer>
        <section className="mascot-wrapup">
          <div className="bear">🐻</div>
          <div className="bear-message">
            <h2>Hey there, Brave Thinker!</h2>
            <p>
              You've made it this far, and that means something big — you’re curious, committed, and growing every
              minute.
            </p>
            <p>
              Keep exploring, keep learning, and never forget that your voice and mind are powerful. The world needs
              more thinkers like YOU.
            </p>
            <p className="bear-signoff">— With paws and pride, <strong>The ThinkIt Bear 🐾</strong></p>
          </div>
        </section>
      </footer>
    </>
  )
}
