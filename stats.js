const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authmiddleware');
const db = require('../config/database');

router.get('/user-stats', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const testStats = await new Promise((resolve, reject) => {
      db.get(
        `SELECT 
          COUNT(*) as total_tests,
          AVG(score) as average_score,
          MAX(score) as best_score,
          SUM(time_taken) as total_time
         FROM test_results 
         WHERE user_id = ?`,
        [userId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });

    const roadmapStats = await new Promise((resolve, reject) => {
      db.get(
        `SELECT 
          COUNT(*) as total_topics,
          SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed_topics,
          AVG(progress) as average_progress
         FROM roadmap_progress 
         WHERE user_id = ?`,
        [userId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row);
        }
      );
    });

    res.json({
      success: true,
      stats: {
        testStats,
        roadmapStats,
        streak: Math.floor(Math.random() * 30)
      }
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching statistics'
    });
  }
});

module.exports = router;