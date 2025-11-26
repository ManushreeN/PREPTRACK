const db = require('../config/database');

class Roadmap {
  static async getTopics() {
    return [
      // Core Computer Science (15 domains)
      {
        id: 1,
        title: "Programming Fundamentals",
        description: "Master basic programming concepts and problem-solving",
        category: "core-cs",
        steps: [
          "Choose a Programming Language (Python/Java/C++)",
          "Basic Syntax and Data Types",
          "Variables and Operators",
          "Control Structures (if-else, loops)",
          "Functions and Methods",
          "Basic I/O Operations",
          "Debugging Techniques"
        ],
        estimated_time: "3-4 weeks",
        priority: "high",
        resources: ["Codecademy", "freeCodeCamp", "GeeksforGeeks"]
      },
      {
        id: 2,
        title: "Object-Oriented Programming",
        description: "Learn OOP principles and design patterns",
        category: "core-cs",
        steps: [
          "Classes and Objects",
          "Inheritance and Polymorphism",
          "Encapsulation and Abstraction",
          "Interfaces and Abstract Classes",
          "Design Patterns Basics",
          "SOLID Principles",
          "OOP Project Implementation"
        ],
        estimated_time: "4-5 weeks",
        priority: "high",
        resources: ["Head First OOP", "GeeksforGeeks OOP"]
      },
      {
        id: 3,
        title: "Data Structures",
        description: "Essential data structures for efficient programming",
        category: "core-cs",
        steps: [
          "Arrays and Strings",
          "Linked Lists (Singly, Doubly, Circular)",
          "Stacks and Queues",
          "Trees (Binary, BST, AVL)",
          "Graphs (Representation, Traversal)",
          "Hash Tables and Maps",
          "Heaps and Priority Queues"
        ],
        estimated_time: "6-8 weeks",
        priority: "high",
        resources: ["CLRS Book", "LeetCode", "HackerRank"]
      },
      {
        id: 4,
        title: "Algorithms",
        description: "Algorithm design and analysis techniques",
        category: "core-cs",
        steps: [
          "Time and Space Complexity",
          "Searching Algorithms",
          "Sorting Algorithms",
          "Recursion and Backtracking",
          "Dynamic Programming",
          "Greedy Algorithms",
          "Divide and Conquer"
        ],
        estimated_time: "6-8 weeks",
        priority: "high",
        resources: ["CLRS Book", "Algorithm Design Manual"]
      },
      {
        id: 5,
        title: "Database Management Systems",
        description: "Database design, SQL, and normalization",
        category: "core-cs",
        steps: [
          "Relational Database Concepts",
          "SQL Queries (Basic to Advanced)",
          "Database Normalization",
          "Indexing and Optimization",
          "ACID Properties",
          "Transactions and Concurrency",
          "NoSQL Databases Overview"
        ],
        estimated_time: "4-5 weeks",
        priority: "medium",
        resources: ["SQLZoo", "Mode Analytics", "MySQL Docs"]
      },
      {
        id: 6,
        title: "Operating Systems",
        description: "OS concepts, processes, memory management",
        category: "core-cs",
        steps: [
          "Process Management",
          "Threads and Concurrency",
          "Memory Management",
          "File Systems",
          "Deadlocks",
          "Scheduling Algorithms",
          "Virtual Memory"
        ],
        estimated_time: "4-5 weeks",
        priority: "medium",
        resources: ["Operating System Concepts", "Teach Yourself OS"]
      },
      {
        id: 7,
        title: "Computer Networks",
        description: "Networking protocols and internet fundamentals",
        category: "core-cs",
        steps: [
          "OSI and TCP/IP Models",
          "HTTP/HT Protocols",
          "DNS and DHCP",
          "Network Security",
          "Socket Programming",
          "Routing Algorithms",
          "Wireless Networks"
        ],
        estimated_time: "3-4 weeks",
        priority: "medium",
        resources: ["Computer Networking: Top-Down", "Cisco Networking"]
      },
      {
        id: 8,
        title: "Software Engineering",
        description: "Software development methodologies and practices",
        category: "core-cs",
        steps: [
          "SDLC Models",
          "Agile Methodology",
          "Version Control (Git)",
          "Testing Strategies",
          "Software Design Patterns",
          "Code Review Practices",
          "CI/CD Pipelines"
        ],
        estimated_time: "4-5 weeks",
        priority: "medium",
        resources: ["Clean Code", "Git Documentation", "Agile Manifesto"]
      },

      // Web Development (12 domains)
      {
        id: 9,
        title: "Frontend Development",
        description: "Modern frontend technologies and frameworks",
        category: "web-dev",
        steps: [
          "HTML5 and Semantic HTML",
          "CSS3 and Flexbox/Grid",
          "JavaScript Fundamentals",
          "DOM Manipulation",
          "React.js/Vue.js Basics",
          "State Management",
          "Responsive Design"
        ],
        estimated_time: "6-8 weeks",
        priority: "medium",
        resources: ["MDN Web Docs", "freeCodeCamp", "React Documentation"]
      },
      {
        id: 10,
        title: "Backend Development",
        description: "Server-side programming and APIs",
        category: "web-dev",
        steps: [
          "Node.js/Express or Django/Flask",
          "REST API Design",
          "Authentication and Authorization",
          "Database Integration",
          "Middleware Concepts",
          "API Testing",
          "Deployment Strategies"
        ],
        estimated_time: "6-8 weeks",
        priority: "medium",
        resources: ["Express.js Guide", "Django Documentation", "Postman"]
      },
      {
        id: 11,
        title: "Full Stack Development",
        description: "End-to-end web application development",
        category: "web-dev",
        steps: [
          "Project Architecture",
          "Frontend-Backend Integration",
          "State Management",
          "Database Design",
          "Authentication Flow",
          "Deployment and DevOps",
          "Performance Optimization"
        ],
        estimated_time: "8-10 weeks",
        priority: "medium",
        resources: ["Full Stack Open", "The Odin Project"]
      },
      {
        id: 12,
        title: "Web Security",
        description: "Security best practices and vulnerabilities",
        category: "web-dev",
        steps: [
          "OWASP Top 10",
          "SQL Injection Prevention",
          "XSS and CSRF Protection",
          "HTTPS and SSL/TLS",
          "Authentication Security",
          "Data Validation",
          "Security Headers"
        ],
        estimated_time: "3-4 weeks",
        priority: "low",
        resources: ["OWASP Website", "Web Security Academy"]
      },

      // Aptitude & Soft Skills (10 domains)
      {
        id: 13,
        title: "Quantitative Aptitude",
        description: "Mathematical and numerical ability",
        category: "aptitude",
        steps: [
          "Number Systems",
          "Percentages and Ratios",
          "Time and Work",
          "Profit and Loss",
          "Simple and Compound Interest",
          "Time, Speed and Distance",
          "Probability and Statistics"
        ],
        estimated_time: "4-6 weeks",
        priority: "high",
        resources: ["R.S. Aggarwal", "Indiabix", "Aptitude Preparation Sites"]
      },
      {
        id: 14,
        title: "Logical Reasoning",
        description: "Analytical and logical thinking skills",
        category: "aptitude",
        steps: [
          "Number Series",
          "Coding-Decoding",
          "Blood Relations",
          "Direction Sense",
          "Syllogisms",
          "Puzzles",
          "Data Interpretation"
        ],
        estimated_time: "3-4 weeks",
        priority: "high",
        resources: ["Verbal and Non-verbal Reasoning", "Practice Websites"]
      },
      {
        id: 15,
        title: "Verbal Ability",
        description: "English language and communication skills",
        category: "aptitude",
        steps: [
          "Grammar Fundamentals",
          "Vocabulary Building",
          "Reading Comprehension",
          "Sentence Correction",
          "Para Jumbles",
          "Idioms and Phrases",
          "Communication Skills"
        ],
        estimated_time: "4-5 weeks",
        priority: "medium",
        resources: ["Word Power Made Easy", "English Grammar Books"]
      },
      {
        id: 16,
        title: "Soft Skills Development",
        description: "Professional and interpersonal skills",
        category: "aptitude",
        steps: [
          "Communication Skills",
          "Teamwork and Collaboration",
          "Problem-Solving Approach",
          "Time Management",
          "Leadership Qualities",
          "Conflict Resolution",
          "Professional Etiquette"
        ],
        estimated_time: "Ongoing",
        priority: "medium",
        resources: ["Professional Development Books", "Workshops"]
      },

      // Interview Preparation (8 domains)
      {
        id: 17,
        title: "Resume Building",
        description: "Create an impressive and professional resume",
        category: "interview",
        steps: [
          "Resume Structure and Format",
          "Highlighting Projects and Skills",
          "Achievements and Experience",
          "ATS Optimization",
          "Cover Letter Writing",
          "LinkedIn Profile Optimization",
          "Portfolio Development"
        ],
        estimated_time: "2-3 weeks",
        priority: "high",
        resources: ["Resume Templates", "Career Services", "LinkedIn Learning"]
      },
      {
        id: 18,
        title: "Technical Interview Preparation",
        description: "Master technical problem-solving and coding interviews",
        category: "interview",
        steps: [
          "Data Structures Revision",
          "Algorithm Practice",
          "System Design Basics",
          "Object-Oriented Design",
          "Database Design Questions",
          "Coding Best Practices",
          "Mock Technical Interviews"
        ],
        estimated_time: "8-10 weeks",
        priority: "high",
        resources: ["LeetCode", "HackerRank", "InterviewBit", "Pramp"]
      },
      {
        id: 19,
        title: "HR Interview Preparation",
        description: "Prepare for behavioral and situational questions",
        category: "interview",
        steps: [
          "Common HR Questions",
          "STAR Method Practice",
          "Company Research",
          "Salary Negotiation",
          "Body Language and Presentation",
          "Questions to Ask Interviewers",
          "Follow-up Etiquette"
        ],
        estimated_time: "2-3 weeks",
        priority: "medium",
        resources: ["HR Interview Guides", "Mock Interview Platforms"]
      },
      {
        id: 20,
        title: "Mock Interviews",
        description: "Practice with simulated interview scenarios",
        category: "interview",
        steps: [
          "Technical Mock Interviews",
          "HR Mock Interviews",
          "Coding Challenge Practice",
          "Whiteboard Practice",
          "Video Interview Practice",
          "Feedback Incorporation",
          "Performance Tracking"
        ],
        estimated_time: "4-5 weeks",
        priority: "high",
        resources: ["Pramp", "Interviewing.io", "Peer Practice"]
      },

      // Advanced Topics (10 domains)
      {
        id: 21,
        title: "System Design",
        description: "Design scalable and efficient systems",
        category: "advanced",
        steps: [
          "System Design Fundamentals",
          "Load Balancing and Caching",
          "Database Scaling",
          "Microservices Architecture",
          "API Design",
          "Performance Optimization",
          "Case Studies (Twitter, Uber, Netflix)"
        ],
        estimated_time: "6-8 weeks",
        priority: "medium",
        resources: ["System Design Primer", "Grokking System Design", "YouTube Channels"]
      },
      {
        id: 22,
        title: "Cloud Computing",
        description: "Cloud platforms and services",
        category: "advanced",
        steps: [
          "Cloud Concepts (IaaS, PaaS, SaaS)",
          "AWS/Azure/GCP Fundamentals",
          "Virtual Machines and Containers",
          "Serverless Computing",
          "Cloud Storage Solutions",
          "Cloud Security",
          "Deployment on Cloud"
        ],
        estimated_time: "4-5 weeks",
        priority: "low",
        resources: ["AWS Documentation", "Cloud Guru", "Official Cert Guides"]
      },
      {
        id: 23,
        title: "DevOps Practices",
        description: "Development and operations integration",
        category: "advanced",
        steps: [
          "Continuous Integration",
          "Continuous Deployment",
          "Docker and Containerization",
          "Kubernetes Basics",
          "Infrastructure as Code",
          "Monitoring and Logging",
          "DevOps Culture"
        ],
        estimated_time: "5-6 weeks",
        priority: "low",
        resources: ["Docker Documentation", "Kubernetes.io", "DevOps Roadmap"]
      },
      {
        id: 24,
        title: "Machine Learning Basics",
        description: "Introduction to ML concepts and algorithms",
        category: "advanced",
        steps: [
          "Python for ML (NumPy, Pandas)",
          "Supervised Learning",
          "Unsupervised Learning",
          "Model Evaluation",
          "Feature Engineering",
          "Basic Neural Networks",
          "ML Project Implementation"
        ],
        estimated_time: "6-8 weeks",
        priority: "low",
        resources: ["Coursera ML", "Fast.ai", "Kaggle Courses"]
      },
      {
        id: 25,
        title: "Mobile Development",
        description: "Android/iOS app development",
        category: "advanced",
        steps: [
          "Choose Platform (Android/iOS/Cross-platform)",
          "Mobile UI/UX Principles",
          "API Integration",
          "State Management",
          "App Deployment",
          "Performance Optimization",
          "App Store Guidelines"
        ],
        estimated_time: "8-10 weeks",
        priority: "low",
        resources: ["Android Developer Guide", "iOS Developer", "React Native Docs"]
      },
      {
        id: 26,
        title: "Competitive Programming",
        description: "Advanced problem-solving for coding competitions",
        category: "advanced",
        steps: [
          "Advanced Data Structures",
          "Complex Algorithms",
          "Competition Strategies",
          "Time Complexity Optimization",
          "Practice on Platforms",
          "Participate in Contests",
          "Learn from Solutions"
        ],
        estimated_time: "12-16 weeks",
        priority: "low",
        resources: ["Codeforces", "TopCoder", "Competitive Programmer's Handbook"]
      },

      // Specialized Domains (15 domains)
      {
        id: 27,
        title: "Cybersecurity Fundamentals",
        description: "Basic cybersecurity concepts and practices",
        category: "specialized",
        steps: [
          "Security Principles",
          "Network Security",
          "Cryptography Basics",
          "Vulnerability Assessment",
          "Ethical Hacking Concepts",
          "Security Tools",
          "Incident Response"
        ],
        estimated_time: "5-6 weeks",
        priority: "low"
      },
      {
        id: 28,
        title: "Blockchain Technology",
        description: "Blockchain and cryptocurrency fundamentals",
        category: "specialized",
        steps: [
          "Blockchain Concepts",
          "Cryptocurrency Basics",
          "Smart Contracts",
          "DApp Development",
          "Blockchain Security",
          "Use Cases",
          "Industry Trends"
        ],
        estimated_time: "4-5 weeks",
        priority: "low"
      },
      {
        id: 29,
        title: "IoT Development",
        description: "Internet of Things programming",
        category: "specialized",
        steps: [
          "IoT Architecture",
          "Sensor Programming",
          "Embedded Systems",
          "IoT Protocols",
          "Cloud Integration",
          "Security Considerations",
          "Project Implementation"
        ],
        estimated_time: "6-8 weeks",
        priority: "low"
      },
      {
        id: 30,
        title: "Game Development",
        description: "Video game design and development",
        category: "specialized",
        steps: [
          "Game Design Principles",
          "Game Engines (Unity/Unreal)",
          "2D/3D Graphics",
          "Physics Simulation",
          "Game AI",
          "Multiplayer Networking",
          "Game Publishing"
        ],
        estimated_time: "10-12 weeks",
        priority: "low"
      },
      {
        id: 31,
        title: "Data Science",
        description: "Data analysis and visualization",
        category: "specialized",
        steps: [
          "Data Analysis with Python",
          "Statistical Analysis",
          "Data Visualization",
          "Machine Learning Application",
          "Big Data Tools",
          "Data Storytelling",
          "Real-world Projects"
        ],
        estimated_time: "8-10 weeks",
        priority: "low"
      },
      {
        id: 32,
        title: "UI/UX Design",
        description: "User interface and experience design",
        category: "specialized",
        steps: [
          "Design Principles",
          "Wireframing and Prototyping",
          "User Research",
          "Interaction Design",
          "Design Tools (Figma/Sketch)",
          "Usability Testing",
          "Design Systems"
        ],
        estimated_time: "6-8 weeks",
        priority: "low"
      },
      {
        id: 33,
        title: "Quality Assurance",
        description: "Software testing and quality assurance",
        category: "specialized",
        steps: [
          "Testing Fundamentals",
          "Test Case Design",
          "Automation Testing",
          "Performance Testing",
          "Security Testing",
          "Testing Tools",
          "QA Processes"
        ],
        estimated_time: "4-5 weeks",
        priority: "low"
      },
      {
        id: 34,
        title: "Project Management",
        description: "Software project planning and execution",
        category: "specialized",
        steps: [
          "Project Planning",
          "Risk Management",
          "Team Management",
          "Agile Methodology",
          "Project Tracking",
          "Stakeholder Communication",
          "Delivery Management"
        ],
        estimated_time: "4-5 weeks",
        priority: "low"
      },
      {
        id: 35,
        title: "Technical Writing",
        description: "Documentation and technical communication",
        category: "specialized",
        steps: [
          "Documentation Standards",
          "API Documentation",
          "Technical Guides",
          "Documentation Tools",
          "Content Organization",
          "Review Processes",
          "Publishing Platforms"
        ],
        estimated_time: "3-4 weeks",
        priority: "low"
      },
      {
        id: 36,
        title: "Open Source Contribution",
        description: "Contributing to open source projects",
        category: "specialized",
        steps: [
          "Git and GitHub Mastery",
          "Finding Suitable Projects",
          "Understanding Codebases",
          "Issue Tracking",
          "Pull Request Process",
          "Community Engagement",
          "Maintaining Projects"
        ],
        estimated_time: "4-5 weeks",
        priority: "low"
      },
      {
        id: 37,
        title: "Entrepreneurship in Tech",
        description: "Starting tech businesses and startups",
        category: "specialized",
        steps: [
          "Idea Validation",
          "Business Planning",
          "MVP Development",
          "Funding Strategies",
          "Market Research",
          "Product Marketing",
          "Growth Strategies"
        ],
        estimated_time: "8-10 weeks",
        priority: "low"
      },
      {
        id: 38,
        title: "Research and Development",
        description: "Academic research and innovation",
        category: "specialized",
        steps: [
          "Research Methodology",
          "Literature Review",
          "Experimental Design",
          "Data Collection",
          "Paper Writing",
          "Conference Presentations",
          "Patent Process"
        ],
        estimated_time: "12-16 weeks",
        priority: "low"
      },
      {
        id: 39,
        title: "Ethical Hacking",
        description: "Penetration testing and security assessment",
        category: "specialized",
        steps: [
          "Ethical Hacking Principles",
          "Vulnerability Scanning",
          "Penetration Testing",
          "Social Engineering",
          "Security Tools Mastery",
          "Reporting and Documentation",
          "Legal and Ethical Considerations"
        ],
        estimated_time: "8-10 weeks",
        priority: "low"
      },
      {
        id: 40,
        title: "Digital Marketing for Tech",
        description: "Marketing technology products and services",
        category: "specialized",
        steps: [
          "SEO Fundamentals",
          "Content Marketing",
          "Social Media Strategy",
          "Email Marketing",
          "Analytics and Tracking",
          "Conversion Optimization",
          "Marketing Automation"
        ],
        estimated_time: "4-5 weeks",
        priority: "low"
      },
      {
        id: 41,
        title: "AR/VR Development",
        description: "Augmented and Virtual Reality programming",
        category: "specialized",
        steps: [
          "AR/VR Concepts",
          "Development Platforms",
          "3D Modeling Basics",
          "Spatial Computing",
          "User Interaction Design",
          "Performance Optimization",
          "Deployment and Distribution"
        ],
        estimated_time: "8-10 weeks",
        priority: "low"
      },
      {
        id: 42,
        title: "Quantum Computing",
        description: "Introduction to quantum computing concepts",
        category: "specialized",
        steps: [
          "Quantum Mechanics Basics",
          "Qubits and Quantum States",
          "Quantum Gates",
          "Quantum Algorithms",
          "Quantum Programming",
          "Quantum Hardware",
          "Applications and Limitations"
        ],
        estimated_time: "10-12 weeks",
        priority: "low"
      },
      {
        id: 43,
        title: "Bioinformatics",
        description: "Computational biology and data analysis",
        category: "specialized",
        steps: [
          "Biological Databases",
          "Sequence Alignment",
          "Genomic Data Analysis",
          "Phylogenetics",
          "Structural Bioinformatics",
          "Bioinformatics Tools",
          "Research Applications"
        ],
        estimated_time: "8-10 weeks",
        priority: "low"
      },
      {
        id: 44,
        title: "FinTech Development",
        description: "Financial technology applications",
        category: "specialized",
        steps: [
          "Financial Systems Overview",
          "Payment Processing",
          "Blockchain in Finance",
          "Algorithmic Trading",
          "Risk Management Systems",
          "Regulatory Compliance",
          "Security in FinTech"
        ],
        estimated_time: "6-8 weeks",
        priority: "low"
      },
      {
        id: 45,
        title: "Edge Computing",
        description: "Distributed computing at the edge",
        category: "specialized",
        steps: [
          "Edge Computing Architecture",
          "Fog Computing Concepts",
          "Edge Devices Programming",
          "Latency Optimization",
          "Security in Edge Computing",
          "Use Cases and Applications",
          "Industry Trends"
        ],
        estimated_time: "5-6 weeks",
        priority: "low"
      },
      {
        id: 46,
        title: "Natural Language Processing",
        description: "Text processing and language understanding",
        category: "specialized",
        steps: [
          "Text Preprocessing",
          "Tokenization and Stemming",
          "Sentiment Analysis",
          "Named Entity Recognition",
          "Language Models",
          "Chatbot Development",
          "Advanced NLP Techniques"
        ],
        estimated_time: "6-8 weeks",
        priority: "low"
      },
      {
        id: 47,
        title: "Computer Vision",
        description: "Image and video processing",
        category: "specialized",
        steps: [
          "Image Processing Basics",
          "Feature Detection",
          "Object Recognition",
          "Deep Learning for CV",
          "Video Analysis",
          "Real-time Processing",
          "CV Applications"
        ],
        estimated_time: "8-10 weeks",
        priority: "low"
      },
      {
        id: 48,
        title: "Robotics Programming",
        description: "Robot control and automation",
        category: "specialized",
        steps: [
          "Robotics Fundamentals",
          "Sensor Integration",
          "Motion Planning",
          "Control Systems",
          "ROS (Robot Operating System)",
          "Autonomous Navigation",
          "Robotics Projects"
        ],
        estimated_time: "10-12 weeks",
        priority: "low"
      },
      {
        id: 49,
        title: "Embedded Systems",
        description: "Microcontroller and embedded programming",
        category: "specialized",
        steps: [
          "Microcontroller Architecture",
          "Embedded C/C++",
          "Real-time Operating Systems",
          "Peripheral Interfacing",
          "Low-power Design",
          "Embedded Linux",
          "Project Development"
        ],
        estimated_time: "8-10 weeks",
        priority: "low"
      },
      {
        id: 50,
        title: "High Performance Computing",
        description: "Parallel and distributed computing",
        category: "specialized",
        steps: [
          "Parallel Computing Concepts",
          "Multi-threading",
          "GPU Programming",
          "Distributed Systems",
          "Cluster Computing",
          "Performance Optimization",
          "HPC Applications"
        ],
        estimated_time: "8-10 weeks",
        priority: "low"
      }
    ];
  }

  static async getUserProgress(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM roadmap_progress WHERE user_id = ?`,
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

  static async updateProgress(userId, topic, progress, completed = false) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT OR REPLACE INTO roadmap_progress (user_id, topic, progress, completed, last_updated)
         VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
        [userId, topic, progress, completed],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ userId, topic, progress, completed });
          }
        }
      );
    });
  }

  static async getCategories() {
    const topics = await this.getTopics();
    const categories = {};
    
    topics.forEach(topic => {
      if (!categories[topic.category]) {
        categories[topic.category] = 0;
      }
      categories[topic.category]++;
    });
    
    return categories;
  }
}

module.exports = Roadmap;