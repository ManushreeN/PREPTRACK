import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AptitudeTest = () => {
  const [domain, setDomain] = useState('Programming');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch questions on domain change
  useEffect(() => {
    fetchQuestions();
  }, [domain]);

  // Timer functionality
  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !showResult && questions.length > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleSubmit();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, showResult, questions]);

  // 🚀 Corrected API request here
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/aptitude/questions?category=${domain}&limit=15`
      );
      setQuestions(response.data.questions || []);
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setScore(0);
      setShowResult(false);
      setTimeLeft(900);
    } catch (error) {
      console.error('Error fetching questions:', error);
      alert('Failed to load questions. Please try again.');
    }
    setLoading(false);
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct_answer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setShowResult(true);

    try {
      await axios.post('/api/stats/submit', {
        user_id: user?.id,
        test_type: domain,
        score: calculatedScore,
        total_questions: questions.length,
        time_taken: 900 - timeLeft,
        correct_answers: calculatedScore,
        wrong_answers: questions.length - calculatedScore,
        test_data: questions
      });
    } catch (error) {
      console.error('Error submitting test results:', error);
    }
  };

  // Utility functions
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const calculatePercentage = () => {
    return questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  };

  const getPerformanceMessage = percentage => {
    if (percentage >= 90) return { message: 'Excellent! 🎉', color: 'success' };
    if (percentage >= 70) return { message: 'Great job! 👍', color: 'primary' };
    if (percentage >= 50) return { message: 'Good effort! 💪', color: 'info' };
    return { message: 'Keep practicing! 📚', color: 'warning' };
  };

  // Handle loading and no questions
  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary"></div>
        <p>Loading {domain} questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h4>No Questions Available</h4>
        <button className="btn btn-primary" onClick={fetchQuestions}>
          Try Again
        </button>
      </div>
    );
  }

  // Handle results page
  if (showResult) {
    const percentage = calculatePercentage();
    const performance = getPerformanceMessage(percentage);

    return (
      <div className="container mt-4">
        <div className="card text-center p-4 shadow">
          <h3>{performance.message}</h3>
          <p>Score: {score}/{questions.length}</p>
          <p>Percentage: {percentage}%</p>
          <p>Time Taken: {formatTime(900 - timeLeft)}</p>
          <button className="btn btn-primary" onClick={fetchQuestions}>Try Again</button>
          <a href="/leaderboard" className="btn btn-success ms-2">View Leaderboard</a>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  // Main test UI
  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between">
          <h4>{domain} Aptitude Test</h4>
          <div>Time Left: {formatTime(timeLeft)}</div>
        </div>

        <div className="card-body">
          <h5>{question.question_text}</h5>
          {['A', 'B', 'C', 'D'].map(option => (
            question[`option_${option.toLowerCase()}`] && (
              <div key={option} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={selectedAnswers[question.id] === option}
                  onChange={() => handleAnswerSelect(question.id, option)}
                />
                <label className="form-check-label">
                  <strong>{option}.</strong> {question[`option_${option.toLowerCase()}`]}
                </label>
              </div>
            )
          ))}
        </div>

        <div className="card-footer d-flex justify-content-between">
          <button
            className="btn btn-outline-primary"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button className="btn btn-success" onClick={handleSubmit}>Submit Test</button>
          ) : (
            <button
              className="btn btn-primary"
              disabled={!selectedAnswers[question.id]}
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AptitudeTest;
