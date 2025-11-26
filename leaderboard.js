const express = require('express');
const router = express.Router();
const TestResult = require('../models/TestResult');

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const leaderboard = await TestResult.getLeaderboard(20);

    // Format leaderboard data
    const formattedLeaderboard = leaderboard.map((entry, index) => ({
      rank: index + 1,
      username: entry.username,
      testsTaken: entry.tests_taken,
      averageScore: Math.round(entry.average_score * 100) / 100,
      highestScore: entry.highest_score
    }));

    res.json({
      success: true,
      leaderboard: formattedLeaderboard
    });

  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching leaderboard'
    });
  }
});

module.exports = router;