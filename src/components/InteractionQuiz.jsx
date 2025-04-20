import React, { useState } from 'react';
import axios from 'axios';

const InteractionQuiz = ({ user }) => {
  const levels = ['easy', 'medium', 'hard'];
  const scenarios = {
    easy: {
      character: 'Riya',
      question: "Hi, my name is Riya. What's your name?",
      options: [
        { id: 'ignore', text: "I don't want to talk.", correct: false },
        { id: 'respond', text: "Hi, I'm Dhruv. It's nice to meet you!", correct: true }
      ]
    },
    medium: {
      character: 'Arun',
      question: "I feel sad because I lost my toy. What should you say?",
      options: [
        { id: 'empathy', text: "I'm sorry you lost your toy. Can I help you find it?", correct: true },
        { id: 'dismiss', text: "It's just a toy, don't be sad.", correct: false },
        { id: 'change', text: "Let's talk about something else.", correct: false }
      ]
    },
    hard: {
      character: 'Group of children',
      question: "We're playing a game. Would you like to join us?",
      options: [
        { id: 'join', text: "Yes, I'd love to! What are the rules?", correct: true },
        { id: 'watch', text: "I'll just watch you all play.", correct: false },
        { id: 'reject', text: "No, I want to play alone.", correct: false },
        { id: 'takeover', text: "Only if I can be the leader and make the rules.", correct: false }
      ]
    }
  };

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  const level = levels[currentLevelIndex];
  const scenario = scenarios[level];

  const handleSelect = (optionId) => {
    const option = scenario.options.find(opt => opt.id === optionId);
    const correct = option.correct;

    setSelected(optionId);
    setIsCorrect(correct);
    setAttempts(prev => prev + 1);

    if (correct) {
      const levelScore = attempts === 0 ? 100 : attempts === 1 ? 75 : 50;
      setScore(levelScore);
      setTotalScore(prev => prev + levelScore);

      setTimeout(() => {
        if (currentLevelIndex < levels.length - 1) {
          setCurrentLevelIndex(prev => prev + 1);
          setSelected(null);
          setIsCorrect(null);
          setAttempts(0);
          setScore(0);
        } else {
          setGameCompleted(true);
          saveScoreToBackend(totalScore + levelScore);
        }
      }, 1500);
    }
  };

  const saveScoreToBackend = async (finalScore) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/score`, {
        name: user.name,
        score: finalScore,
        game: 'interaction'
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
        <div className="character-bubble">
          <div className="character-name">{scenario.character}</div>
          <div className="speech-bubble">
            <p>{scenario.question}</p>
          </div>
        </div>
      </div>

      <div className="answer-section">
        <div className="answer-options">
          {scenario.options.map(option => (
            <button
              key={option.id}
              className={`answer-button ${selected === option.id ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
              onClick={() => handleSelect(option.id)}
              disabled={isCorrect === true}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      {isCorrect !== null && (
        <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
          {isCorrect
            ? <p>Well done{user.wardName ? ', ' + user.wardName : ''}! That's a good response.</p>
            : <p>Think again about how your response affects others.</p>}

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
          align-items: center;
        }

        .character-bubble {
          width: 90%;
          max-width: 500px;
        }

        .character-name {
          font-size: 1.5rem;
          font-weight: bold;
          color: #5e35b1;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .speech-bubble {
          position: relative;
          background-color: #e0e0ff;
          border-radius: 20px;
          padding: 1.5rem;
          font-size: 1.2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border: 2px solid #c0c0ff;
        }

        .speech-bubble:after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 15px 15px 0;
          border-style: solid;
          border-color: #e0e0ff transparent;
        }

        .speech-bubble p {
          margin: 0;
          font-size: 1.3rem;
        }

        .answer-section {
          margin: 2rem 0;
        }

        .answer-options {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 600px;
          margin: 0 auto;
        }

        .answer-button {
          padding: 1rem;
          font-size: 1.2rem;
          border: none;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.3s;
          background-color: #e0e0ff;
          color: #333;
          font-weight: bold;
          text-align: left;
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

export default InteractionQuiz;