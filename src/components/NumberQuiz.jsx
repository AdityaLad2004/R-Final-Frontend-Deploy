import React, { useState } from 'react';
import axios from 'axios';  // Import axios to send HTTP requests

const NumbersQuiz = ({ user }) => {
  const levels = ['easy', 'medium', 'hard'];
  const problems = {
    easy: { num1: 2, num2: 5, operator: '+', correctAnswer: '7', options: ['10', '7', '4'] },
    medium: { num1: 8, num2: 5, operator: '-', correctAnswer: '3', options: ['13', '3', '5'] },
    hard: { num1: 3, num2: 4, operator: '×', correctAnswer: '12', options: ['7', '12', '15'] }
  };

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const level = levels[currentLevelIndex];
  const problem = problems[level];

  const checkAnswer = (selectedAnswer) => {
    const correct = selectedAnswer === problem.correctAnswer;
    setAnswer(selectedAnswer);
    setIsCorrect(correct);
    setAttempts((prev) => prev + 1);

    if (correct) {
      const currentScore = attempts === 0 ? 100 : attempts === 1 ? 75 : 50;
      setScore(currentScore);
      setTotalScore((prev) => prev + currentScore);

      setTimeout(() => {
        if (currentLevelIndex < levels.length - 1) {
          setCurrentLevelIndex(currentLevelIndex + 1);
          setAnswer('');
          setIsCorrect(null);
          setAttempts(0);
          setScore(0);
        } else {
          setGameCompleted(true);
          saveScoreToBackend(totalScore + currentScore);
        }
      }, 1500);
    }
  };

  const saveScoreToBackend = async (finalScore) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/score`, {
        name: user.name,
        score: finalScore,
        game: 'numbers'
      });
      console.log('Score saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving score:', error.response?.data || error.message);
    }
  };

  const renderVisualAids = () => {
    const visualItems = [];
    for (let i = 0; i < problem.num1; i++) {
      visualItems.push(
        <div key={`first-${i}`} className="number-icon">
          🐣
        </div>
      );
    }
    
    visualItems.push(
      <div key="operator" className="operator-icon">
        {problem.operator}
      </div>
    );
    
    for (let i = 0; i < problem.num2; i++) {
      visualItems.push(
        <div key={`second-${i}`} className="number-icon">
          🐣
        </div>
      );
    }
    
    return visualItems;
  };

  const getLevelColor = () => {
    switch (level) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#4CAF50';
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="level-badge" style={{ backgroundColor: getLevelColor() }}>
          Level {currentLevelIndex + 1}: {level.toUpperCase()}
        </div>
        {user.name && <div className="player-name">Player: {user.wardName || user.name}</div>}
      </div>

      <div className="problem-display">
        <div className="equation">
          <span className="number">{problem.num1}</span>
          <span className="operator">{problem.operator}</span>
          <span className="number">{problem.num2}</span>
          <span className="equals">=</span>
          <span className="question-mark">?</span>
        </div>
        
        <div className="visual-aids">
          {renderVisualAids()}
        </div>
      </div>

      <div className="answer-section">
        <div className="answer-options">
          {problem.options.map((option) => (
            <button
              key={option}
              className={`answer-button ${answer === option ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
              onClick={() => checkAnswer(option)}
              disabled={isCorrect === true}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {isCorrect !== null && (
        <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
          {isCorrect
            ? <p>Great job{user.wardName ? ', ' + user.wardName : ''}! That's correct!</p>
            : <p>Try again!</p>}

          {isCorrect && (
            <div className="score-display">
              <p>Level Score: {score} points</p>
            </div>
          )}

          {isCorrect && currentLevelIndex < levels.length - 1 && (
            <div className="level-completion">
              <p>Moving to next level...</p>
              <div className="loading-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}

          {gameCompleted && (
            <div className="game-completion">
              <h3>🎉 Congratulations! You've completed all levels!</h3>
              <p className="final-score">Total Score: {totalScore}</p>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .quiz-container {
          font-family: 'Comic Sans MS', 'Chalkboard SE', sans-serif;
          text-align: center;
          padding: 2rem;
          max-width: 700px;
          margin: 0 auto;
          background-color: #f9f7ff;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border: 3px solid #e0e0ff;
        }

        .quiz-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px dashed #d0d0ff;
        }

        .level-badge {
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }

        .player-name {
          font-size: 1.1rem;
          color: #555;
          background-color: #e8f5e9;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          border: 2px solid #c8e6c9;
        }

        .problem-display {
          margin: 2rem 0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .equation {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }

        .number {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 60px;
          height: 60px;
          background-color: #e0e0ff;
          border-radius: 50%;
          margin: 0 0.5rem;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }

        .operator, .equals {
          margin: 0 0.5rem;
          color: #5e35b1;
        }

        .question-mark {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 60px;
          height: 60px;
          background-color: #ffecb3;
          border-radius: 50%;
          margin: 0 0.5rem;
          color: #ff6f00;
          animation: pulse 1.5s infinite;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }

        .visual-aids {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin: 0 auto;
          max-width: 500px;
        }

        .number-icon {
          font-size: 2rem;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          background-color: #e8f5e9;
          border-radius: 50%;
          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }

        .number-icon:hover {
          transform: scale(1.1);
        }

        .operator-icon {
          font-size: 1.8rem;
          margin: 0 1rem;
          color: #5e35b1;
          font-weight: bold;
        }

        .answer-section {
          margin: 2rem 0;
        }

        .answer-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          max-width: 500px;
          margin: 0 auto;
        }

        .answer-button {
          padding: 1rem 0;
          font-size: 1.5rem;
          border: none;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s;
          background-color: #e0e0ff;
          color: #333;
          font-weight: bold;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .answer-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        .answer-button:active {
          transform: translateY(1px);
        }

        .answer-button.correct {
          background-color: #4CAF50;
          color: white;
        }

        .answer-button.incorrect {
          background-color: #F44336;
          color: white;
        }

        .feedback {
          margin-top: 2rem;
          padding: 1rem;
          border-radius: 15px;
          font-size: 1.3rem;
          font-weight: bold;
        }

        .correct-feedback {
          background-color: rgba(76, 175, 80, 0.1);
          color: #2E7D32;
          border: 2px solid #4CAF50;
        }

        .incorrect-feedback {
          background-color: rgba(244, 67, 54, 0.1);
          color: #C62828;
          border: 2px solid #F44336;
        }

        .score-display {
          margin-top: 1rem;
          font-size: 1.2rem;
          color: #4527A0;
        }

        .level-completion {
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .loading-dots {
          display: flex;
          justify-content: center;
        }

        .loading-dots span {
          animation: bounce 1s infinite;
          font-size: 2rem;
          margin: 0 3px;
        }

        .loading-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loading-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        .game-completion {
          margin-top: 1.5rem;
          padding: 1.5rem;
          background-color: #FFF9C4;
          border-radius: 15px;
          border: 3px dashed #FBC02D;
        }

        .game-completion h3 {
          color: #F57F17;
          margin-bottom: 1rem;
        }

        .final-score {
          font-size: 1.5rem;
          color: #4527A0;
          font-weight: bold;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default NumbersQuiz;