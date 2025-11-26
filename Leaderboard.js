const db = require('../config/database');

class Leaderboard {
  static async getTopUsers(limit = 20) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT 
          u.username,
          u.college,
          COUNT(tr.id) as tests_taken,
          AVG(tr.score) as average_score,
          MAX(tr.score) as highest_score
         FROM users u
         JOIN test_results tr ON u.id = tr.user_id
         GROUP BY u.id, u.username, u.college
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

  static async getUserRank(userId) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT rank FROM (
          SELECT 
            user_id,
            AVG(score) as avg_score,
            RANK() OVER (ORDER BY AVG(score) DESC) as rank
          FROM test_results 
          GROUP BY user_id
        ) WHERE user_id = ?`,
        [userId],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row ? row.rank : null);
          }
        }
      );
    });
  }
}

module.exports = Leaderboard;