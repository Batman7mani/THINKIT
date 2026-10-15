import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import css from '../styles/quiz-style.css?inline'
import usePage from '../usePage.js'

const questionsMap = {
  under10: [
    { question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' },
    { question: 'Which is a fruit?', options: ['Car', 'Banana', 'Chair'], answer: 'Banana' },
    { question: "Which animal says 'meow'?", options: ['Dog', 'Cat', 'Cow'], answer: 'Cat' },
    { question: 'What color is the sun?', options: ['Blue', 'Yellow', 'Green'], answer: 'Yellow' },
    { question: 'Which one can fly?', options: ['Ball', 'Bird', 'Fish'], answer: 'Bird' },
  ],
  above10: [
    { question: 'What is 12 x 3?', options: ['36', '30', '24'], answer: '36' },
    { question: 'What gas do humans breathe in?', options: ['Oxygen', 'Nitrogen', 'Hydrogen'], answer: 'Oxygen' },
    { question: 'Which is a verb?', options: ['Run', 'Red', 'Soft'], answer: 'Run' },
    { question: 'Who wrote books?', options: ['Einstein', 'Shakespeare', 'Newton'], answer: 'Shakespeare' },
    { question: 'Which planet is known as the Red Planet?', options: ['Mars', 'Venus', 'Jupiter'], answer: 'Mars' },
  ],
}
const BEAR = 'animated-bear-dancing-xm4258py14d9arkl.gif'

export default function Quiz() {
  usePage(css, 'THINKIT Quiz')
  const [stage, setStage] = useState('start') // start → age → intro → quiz
  const [group, setGroup] = useState(null)
  const [score, setScore] = useState(null)

  useEffect(() => {
    if (stage !== 'intro') return
    const id = setTimeout(() => setStage('quiz'), 3000)
    return () => clearTimeout(id)
  }, [stage])

  const questions = group ? questionsMap[group] : []

  function submit(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    setScore(questions.filter((q, i) => form.get(`q${i}`) === q.answer).length)
  }

  return (
    <>
      <header className="quiz-header">
        <img src="logo.png" className="quiz-logo" alt="THINKIT Logo" />
        <h1>🧠 THINKIT Quiz Challenge</h1>
        <p className="quiz-intro">Boost your brain, Thinker! Let’s test your skills.</p>
        <Link to="/" className="quiz-back">← Back to THINKIT Home</Link>
      </header>

      <main className="quiz-container">
        {stage === 'age' && (
          <div className="age-popup">
            <h2>🎉 Welcome, Thinker!</h2>
            <p>Choose your age group:</p>
            <button onClick={() => { setGroup('under10'); setStage('intro') }}>Under 10</button>
            <button onClick={() => { setGroup('above10'); setStage('intro') }}>11 and above</button>
          </div>
        )}

        {stage === 'intro' && (
          <div className="mascot-intro">
            <img src={BEAR} alt="Bear Mascot" className="bear-mascot" />
            <p>Hello smart thinker! 🐻 I’ll be with you through this fun quiz!<br />Let’s start and good luck! 🍀</p>
          </div>
        )}

        {stage === 'quiz' && (
          <form onSubmit={submit} onChange={() => setScore(null)}>
            {questions.map((q, i) => (
              <div className="question-box" key={q.question} role="radiogroup" aria-labelledby={`q${i}-label`}>
                <p id={`q${i}-label`}><strong>Q{i + 1}. {q.question}</strong></p>
                {q.options.map(option => (
                  <label key={option}>
                    <input type="radio" name={`q${i}`} value={option} required /> {option}
                    <br />
                  </label>
                ))}
              </div>
            ))}
            <button type="submit">Submit Quiz</button>
          </form>
        )}

        {score !== null && (
          <div id="resultBox" role="status">
            <img src={BEAR} alt="Bear Mascot" className="bear-mascot" />
            <p>
              {score >= 4
                ? <>🎉 Yay! You scored {score}/{questions.length}<br />You're a THINKING STAR! 🌟</>
                : <>💪 You scored {score}/{questions.length}<br />Don't worry! Great minds keep trying! 💡</>}
            </p>
          </div>
        )}

        {stage === 'start' && <button onClick={() => setStage('age')}>🚀 Take the Test</button>}
      </main>
    </>
  )
}
