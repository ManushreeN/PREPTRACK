const db = require('../config/database');
const bcrypt = require('bcryptjs');
const Roadmap = require('../models/Roadmap');

async function seedData() {
  console.log('Seeding initial data...');

  // Create sample users
  const sampleUsers = [
    {
      username: 'john_doe',
      email: 'john@example.com',
      password: await bcrypt.hash('password123', 10),
      full_name: 'John Doe',
      college: 'ABC Engineering College',
      branch: 'Computer Science',
      semester: '6th'
    },
    {
      username: 'jane_smith',
      email: 'jane@example.com',
      password: await bcrypt.hash('password123', 10),
      full_name: 'Jane Smith',
      college: 'XYZ Institute of Technology',
      branch: 'Information Technology',
      semester: '5th'
    },
    {
      username: 'alex_wilson',
      email: 'alex@example.com',
      password: await bcrypt.hash('password123', 10),
      full_name: 'Alex Wilson',
      college: 'PQR College of Engineering',
      branch: 'Electronics',
      semester: '7th'
    },
    {
      username: 'sarah_chen',
      email: 'sarah@example.com',
      password: await bcrypt.hash('password123', 10),
      full_name: 'Sarah Chen',
      college: 'LMN University',
      branch: 'Computer Engineering',
      semester: '4th'
    },
    {
      username: 'mike_brown',
      email: 'mike@example.com',
      password: await bcrypt.hash('password123', 10),
      full_name: 'Mike Brown',
      college: 'DEF Institute',
      branch: 'Mechanical Engineering',
      semester: '8th'
    }
  ];

  // Insert sample users
  for (const user of sampleUsers) {
    db.run(
      `INSERT OR IGNORE INTO users (username, email, password, full_name, college, branch, semester) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user.username, user.email, user.password, user.full_name, user.college, user.branch, user.semester]
    );
  }

  // Create sample test results
  const sampleTestResults = [
    { user_id: 1, test_type: 'aptitude', score: 85, total_questions: 20, time_taken: 1800, correct_answers: 17, wrong_answers: 3 },
    { user_id: 2, test_type: 'aptitude', score: 92, total_questions: 20, time_taken: 1600, correct_answers: 18, wrong_answers: 2 },
    { user_id: 3, test_type: 'aptitude', score: 78, total_questions: 20, time_taken: 2000, correct_answers: 15, wrong_answers: 5 },
    { user_id: 1, test_type: 'aptitude', score: 88, total_questions: 20, time_taken: 1700, correct_answers: 17, wrong_answers: 3 },
    { user_id: 4, test_type: 'aptitude', score: 95, total_questions: 20, time_taken: 1500, correct_answers: 19, wrong_answers: 1 },
    { user_id: 5, test_type: 'aptitude', score: 82, total_questions: 20, time_taken: 1900, correct_answers: 16, wrong_answers: 4 },
    { user_id: 2, test_type: 'aptitude', score: 90, total_questions: 20, time_taken: 1650, correct_answers: 18, wrong_answers: 2 }
  ];

  for (const result of sampleTestResults) {
    db.run(
      `INSERT INTO test_results (user_id, test_type, score, total_questions, time_taken, correct_answers, wrong_answers) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [result.user_id, result.test_type, result.score, result.total_questions, result.time_taken, result.correct_answers, result.wrong_answers]
    );
  }

  // Create sample roadmap progress
  const topics = await Roadmap.getTopics();
  for (let i = 1; i <= 5; i++) { // For each user
    for (let j = 0; j < 10; j++) { // 10 random topics per user
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      const progress = Math.floor(Math.random() * 100);
      const completed = progress === 100;
      
      db.run(
        `INSERT OR REPLACE INTO roadmap_progress (user_id, topic, progress, completed) 
         VALUES (?, ?, ?, ?)`,
        [i, randomTopic.title, progress, completed]
      );
    }
  }

  console.log('Sample data seeded successfully!');
  console.log('Created:');
  console.log('- 5 sample users');
  console.log('- 7 sample test results');
  console.log('- 50 roadmap progress entries');
  console.log('- 100+ aptitude questions available');
  console.log('- 50+ roadmap domains available');
  console.log('\nYou can now start the server with: npm start');
}

seedData();