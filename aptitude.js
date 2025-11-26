const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authmiddleware');
const TestResult = require('../models/TestResult');
const aptitudeQuestions = require('../data/aptitudeQuestions');  // 📌 Import external dataset

// 📌 GET Aptitude Questions (Dynamic filtering)
router.get('/questions', authMiddleware, (req, res) => {
  const { category = 'all', difficulty = 'all', limit = 20 } = req.query;

  if (!aptitudeQuestions || aptitudeQuestions.length === 0) {
    return res.status(404).json({ success: false, error: 'No questions available.' });
  }

  let filteredQuestions = [...aptitudeQuestions];

  // 🔍 Filter by Category
  if (category !== 'all') {
    filteredQuestions = filteredQuestions.filter(
      q => q.type.toLowerCase() === category.toLowerCase()
    );
  }

  // 🔍 Filter by Difficulty
  if (difficulty !== 'all') {
    filteredQuestions = filteredQuestions.filter(
      q => q.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }

  // 🔀 Shuffle and Limit
  const shuffledQuestions = filteredQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, parseInt(limit));

  res.json({
    success: true,
    questions: shuffledQuestions,
    total: filteredQuestions.length,
    filtered: shuffledQuestions.length
  });
});

// 📌 POST Submit Test Results
router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const { score, total_questions, time_taken, correct_answers, wrong_answers, test_data } = req.body;

    const testResult = await TestResult.create({
      user_id: req.user.id,
      test_type: 'aptitude',
      score,
      total_questions,
      time_taken,
      correct_answers,
      wrong_answers,
      test_data
    });

    res.json({
      success: true,
      message: 'Test results saved successfully',
      result: testResult
    });

  } catch (error) {
    console.error('Submit test error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while saving test results'
    });
  }
});

// 📌 GET User Test History
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const testResults = await TestResult.findByUserId(req.user.id);

    res.json({
      success: true,
      results: testResults
    });

  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching test history'
    });
  }
});

// 📌 GET Category Count
router.get('/categories', authMiddleware, (req, res) => {
  const categories = {
    quantitative: aptitudeQuestions.filter(q => q.type.toLowerCase() === 'quantitative').length,
    logical: aptitudeQuestions.filter(q => q.type.toLowerCase() === 'logical').length,
    verbal: aptitudeQuestions.filter(q => q.type.toLowerCase() === 'verbal').length,
    programming: aptitudeQuestions.filter(q => q.type.toLowerCase() === 'programming').length
  };

  res.json({
    success: true,
    categories
  });
});

module.exports = router;
