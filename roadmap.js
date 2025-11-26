const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authmiddleware');
const Roadmap = require('../models/Roadmap');

// Get all roadmap topics
router.get('/topics', authMiddleware, async (req, res) => {
  try {
    const topics = await Roadmap.getTopics();
    const userProgress = await Roadmap.getUserProgress(req.user.id);

    // Merge topics with user progress
    const topicsWithProgress = topics.map(topic => {
      const progress = userProgress.find(p => p.topic === topic.title) || {};
      return {
        ...topic,
        userProgress: progress.progress || 0,
        completed: progress.completed || false
      };
    });

    res.json({
      success: true,
      topics: topicsWithProgress
    });

  } catch (error) {
    console.error('Get topics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching roadmap topics'
    });
  }
});

// Update progress
router.post('/progress', authMiddleware, async (req, res) => {
  try {
    const { topic, progress, completed } = req.body;

    const updatedProgress = await Roadmap.updateProgress(
      req.user.id,
      topic,
      progress,
      completed
    );

    res.json({
      success: true,
      message: 'Progress updated successfully',
      progress: updatedProgress
    });

  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while updating progress'
    });
  }
});

module.exports = router;