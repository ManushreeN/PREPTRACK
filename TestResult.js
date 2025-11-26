const db = require('../config/database');

class TestResult {
  static async create(testData) {
    const { user_id, test_type, score, total_questions, time_taken, correct_answers, wrong_answers, test_data } = testData;
    
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO test_results (user_id, test_type, score, total_questions, time_taken, correct_answers, wrong_answers, test_data) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [user_id, test_type, score, total_questions, time_taken, correct_answers, wrong_answers, JSON.stringify(test_data)],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, ...testData });
          }
        }
      );
    });
  }

  static async findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM test_results WHERE user_id = ? ORDER BY created_at DESC`,
        [userId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async getLeaderboard(limit = 10) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT 
          u.username,
          COUNT(tr.id) as tests_taken,
          AVG(tr.score) as average_score,
          MAX(tr.score) as highest_score
         FROM users u
         LEFT JOIN test_results tr ON u.id = tr.user_id
         WHERE tr.id IS NOT NULL
         GROUP BY u.id, u.username
         ORDER BY average_score DESC
         LIMIT ?`,
        [limit],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }
}

module.exports = TestResult;