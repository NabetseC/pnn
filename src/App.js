import React, { useState, useEffect } from 'react'
import "./App.css"

function App() {
  const [gameMode, setGameMode] = useState('number') // 'number' or 'math'
  const [displayIdx, setDisplayIdx] = useState(0)
  const [idx, setIdx] = useState(0)
  
  // Math mode states
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [correctAnswer, setCorrectAnswer] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)

  // Create audio objects (using simple beep tones since we can't import files)
  const createBeepTone = (frequency, duration = 0.3) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  }

  const playNumberSound = (number) => {
    // Different frequencies for each number (200-900 Hz range)
    const frequencies = [200, 250, 300, 350, 400, 450, 500, 550, 600, 650]
    createBeepTone(frequencies[number])
  }

  const playGoodSound = () => {
    // Pleasant ascending chord
    setTimeout(() => createBeepTone(523), 0)    // C
    setTimeout(() => createBeepTone(659), 100)  // E
    setTimeout(() => createBeepTone(784), 200)  // G
  }

  const playBadSound = () => {
    // Descending tone
    setTimeout(() => createBeepTone(300), 0)
    setTimeout(() => createBeepTone(200), 200)
  }

  function generateRandomNumber() {
    const randomIdx = Math.floor(Math.random() * 10)
    setIdx(randomIdx)
    playNumberSound(randomIdx)
    setShowResult(false)
  }

  function generateMathProblem() {
    const n1 = Math.floor(Math.random() * 10)
    const n2 = Math.floor(Math.random() * 10)
    const answer = n1 + n2
    
    setNum1(n1)
    setNum2(n2)
    setCorrectAnswer(answer)
    setUserAnswer('')
    setShowResult(false)
    
    // Play the two numbers with a pause between
    playNumberSound(n1)
    setTimeout(() => playNumberSound(n2), 800)
  }

  function handleNumberClick(clickedNum) {
    if (gameMode === 'number') {
      if (clickedNum === idx) {
        playGoodSound()
        setScore(score + 1)
        setStreak(streak + 1)
      } else {
        playBadSound()
        setStreak(0)
      }
      setDisplayIdx(idx)
      setShowResult(true)
    } else {
      // Math mode - build answer
      setUserAnswer(prev => prev + clickedNum.toString())
      playNumberSound(clickedNum)
    }
  }

  function checkMathAnswer() {
    const userNum = parseInt(userAnswer)
    if (userNum === correctAnswer) {
      playGoodSound()
      setScore(score + 1)
      setStreak(streak + 1)
    } else {
      playBadSound()
      setStreak(0)
    }
    setShowResult(true)
  }

  function clearMathAnswer() {
    setUserAnswer('')
  }

  function switchMode(mode) {
    setGameMode(mode)
    setUserAnswer('')
    setShowResult(false)
    setDisplayIdx(0)
  }

  return (
    <div className="app-container">
      <div className="main-wrapper">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="app-title">
            🎵 Audio Learning Game 🎵
          </h1>
          <div className="score-container">
            <p className="score-text">Score: {score} | Streak: {streak} 🔥</p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="mode-selector-wrapper">
          <div className="mode-selector">
            <button
              onClick={() => switchMode('number')}
              className={`mode-button ${gameMode === 'number' ? 'active' : 'inactive'}`}
            >
              🔢 Number Game
            </button>
            <button
              onClick={() => switchMode('math')}
              className={`mode-button ${gameMode === 'math' ? 'active' : 'inactive'}`}
            >
              ➕ Math Game
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div className="game-area">
          {gameMode === 'number' ? (
            <div>
              <h2 className="game-title">Listen and Click the Number!</h2>
              {showResult && (
                <div className="result-display">
                  <p className="result-text">The number was: <span className="result-number">{displayIdx}</span></p>
                </div>
              )}
              <button
                onClick={generateRandomNumber}
                className="btn-primary btn-yellow"
              >
                🎵 Play Sound
              </button>
            </div>
          ) : (
            <div>
              <h2 className="game-title">Listen and Add the Numbers!</h2>
              {showResult ? (
                <div className="result-display">
                  <p className="result-text">
                    {num1} + {num2} = <span className="result-number">{correctAnswer}</span>
                  </p>
                  <p className="result-text" style={{ marginTop: '0.5rem' }}>
                    Your answer: <span className={`${parseInt(userAnswer) === correctAnswer ? 'correct-answer' : 'wrong-answer'}`} style={{ fontWeight: 'bold' }}>
                      {userAnswer || 'None'}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="answer-display">
                  <p className="answer-text">Your answer: <span className="answer-number">{userAnswer || '_'}</span></p>
                </div>
              )}
              <div className="action-buttons">
                <button
                  onClick={generateMathProblem}
                  className="btn-primary btn-green btn-small"
                >
                  🎵 New Problem
                </button>
                {userAnswer && !showResult && (
                  <>
                    <button
                      onClick={checkMathAnswer}
                      className="btn-primary btn-blue btn-small"
                    >
                      ✓ Submit
                    </button>
                    <button
                      onClick={clearMathAnswer}
                      className="btn-primary btn-red btn-small"
                    >
                      🗑️ Clear
                    </button>
                  </>
                )}
                {showResult && (
                  <button
                    onClick={() => setShowResult(false)}
                    className="btn-primary btn-purple btn-small"
                  >
                    ↻ Try Again
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Number Buttons */}
        <div className="number-grid-container">
          <div className="number-grid">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                onClick={() => handleNumberClick(i)}
                className="number-button"
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="instructions">
          <h3 className="instructions-title">How to Play:</h3>
          <div className="instructions-content">
            <p><strong>Number Game:</strong> Click "Play Sound" to hear a number, then click the matching button!</p>
            <p><strong>Math Game:</strong> Listen to two numbers being played, add them together, and click the digits to enter your answer!</p>
            <p>🎵 Each number has its own unique sound - learn to recognize them!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App