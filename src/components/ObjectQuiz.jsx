import React, { useState } from 'react';
import axios from 'axios';

const ObjectsQuiz = ({ user }) => {
  const levels = ['easy', 'medium', 'hard'];
  const objects = {
    easy: {
      image: 'data:image/jpeg;base64,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', // URL to the apple image
      question: 'Guess the fruit!',
      correctAnswer: 'apple',
      options: ['mango', 'apple', 'banana'],
    },
    medium: {
      image: 'data:image/jpeg;base64,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', // URL to the bus image
      question: 'What vehicle is this?',
      correctAnswer: 'bus',
      options: ['car', 'bus', 'bicycle', 'train'],
    },
    hard: {
      image: 'data:image/jpeg;base64,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', // URL to the violin image
      question: 'Name this musical instrument!',
      correctAnswer: 'violin',
      options: ['guitar', 'flute', 'violin', 'drums', 'piano'],
    },
  };

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const level = levels[currentLevelIndex];
  const object = objects[level];

  const handleSelect = (option) => {
    const correct = option === object.correctAnswer;
    setSelected(option);
    setIsCorrect(correct);
    setAttempts((prev) => prev + 1);

    if (correct) {
      const currentScore = attempts === 0 ? 100 : attempts === 1 ? 75 : 50;
      setScore(currentScore);
      setTotalScore((prev) => prev + currentScore);

      setTimeout(() => {
        if (currentLevelIndex < levels.length - 1) {
          setCurrentLevelIndex((prev) => prev + 1);
          setSelected('');
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
        game: 'objects',
      });
      console.log('Score saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving score:', error.response?.data || error.message);
    }
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
        <h2 className="question-title">{object.question}</h2>
        <div className="image-container">
          <img src={object.image || "/api/placeholder/300/300"} alt="quiz object" className="object-image" />
        </div>
      </div>

      <div className="answer-section">
        <div className="answer-options">
          {object.options.map((option) => (
            <button
              key={option}
              className={`answer-button ${selected === option ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleSelect(option)}
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

        .question-title {
          font-size: 2rem;
          font-weight: bold;
          color: #5e35b1;
          margin-bottom: 1rem;
        }

        .image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          width: 300px;
          height: 300px;
          background-color: #e0e0ff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: 3px solid #c0c0ff;
        }

        .object-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .answer-section {
          margin: 2rem 0;
        }

        .answer-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
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

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default ObjectsQuiz;