import React, { useState, useEffect } from 'react'

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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            🎵 Audio Learning Game 🎵
          </h1>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-block">
            <p className="text-white text-lg">Score: {score} | Streak: {streak} 🔥</p>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 flex gap-2">
            <button
              onClick={() => switchMode('number')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                gameMode === 'number' 
                  ? 'bg-white text-purple-600 shadow-lg transform scale-105' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              🔢 Number Game
            </button>
            <button
              onClick={() => switchMode('math')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                gameMode === 'math' 
                  ? 'bg-white text-purple-600 shadow-lg transform scale-105' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              ➕ Math Game
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-6">
          {gameMode === 'number' ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Listen and Click the Number!</h2>
              {showResult && (
                <div className="mb-6 p-4 bg-white/20 rounded-xl">
                  <p className="text-white text-xl">The number was: <span className="text-3xl font-bold">{displayIdx}</span></p>
                </div>
              )}
              <button
                onClick={generateRandomNumber}
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-bold py-4 px-8 rounded-xl text-xl mb-8 transition-all transform hover:scale-105 shadow-lg"
              >
                🎵 Play Sound
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Listen and Add the Numbers!</h2>
              {showResult ? (
                <div className="mb-6 p-4 bg-white/20 rounded-xl">
                  <p className="text-white text-xl">
                    {num1} + {num2} = <span className="text-3xl font-bold">{correctAnswer}</span>
                  </p>
                  <p className="text-white mt-2">
                    Your answer: <span className={`font-bold ${parseInt(userAnswer) === correctAnswer ? 'text-green-300' : 'text-red-300'}`}>
                      {userAnswer || 'None'}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-white/20 rounded-xl">
                  <p className="text-white text-lg">Your answer: <span className="text-2xl font-bold">{userAnswer || '_'}</span></p>
                </div>
              )}
              <div className="flex gap-4 justify-center mb-6">
                <button
                  onClick={generateMathProblem}
                  className="bg-green-400 hover:bg-green-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                >
                  🎵 New Problem
                </button>
                {userAnswer && !showResult && (
                  <>
                    <button
                      onClick={checkMathAnswer}
                      className="bg-blue-400 hover:bg-blue-300 text-gray-800 font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                    >
                      ✓ Submit
                    </button>
                    <button
                      onClick={clearMathAnswer}
                      className="bg-red-400 hover:bg-red-300 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                    >
                      🗑️ Clear
                    </button>
                  </>
                )}
                {showResult && (
                  <button
                    onClick={() => setShowResult(false)}
                    className="bg-purple-400 hover:bg-purple-300 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                  >
                    ↻ Try Again
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Number Buttons */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                onClick={() => handleNumberClick(i)}
                className="bg-white/20 hover:bg-white/30 text-white font-bold text-2xl py-6 px-4 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-lg backdrop-blur-sm border border-white/20"
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-3">How to Play:</h3>
          <div className="text-white space-y-2">
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