
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your PrepTrack assistant. How can I help you with your placement preparation today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Knowledge base for placement preparation
  const knowledgeBase = {
    greeting: [
      "Hello! Welcome to PrepTrack! 👋",
      "Hi there! Ready to ace your placements?",
      "Hey! How can I assist with your preparation today?"
    ],
    aptitude: {
      preparation: "Aptitude tests typically cover quantitative aptitude, logical reasoning, and verbal ability. Practice regularly with mock tests and focus on time management. Key topics include percentages, ratios, probability, puzzles, and data interpretation.",
      resources: "Best resources: Practice platforms like PrepTrack, books by R.S. Aggarwal, and previous company question papers. Focus on speed and accuracy.",
      pattern: "Most companies follow similar patterns: 20-30 questions in 30-45 minutes. Practice with time constraints to improve speed."
    },
    technical: {
      preparation: "Technical rounds test programming skills, CS fundamentals, and problem-solving. Focus on data structures, algorithms, OOP, DBMS, and OS concepts.",
      languages: "Most companies prefer: Java, Python, C++, or JavaScript. Be proficient in at least one language and understand its core concepts.",
      dsa: "Data Structures & Algorithms: Practice arrays, strings, linked lists, trees, graphs, sorting, and searching algorithms. Use platforms like LeetCode and GeeksforGeeks."
    },
    interview: {
      preparation: "Prepare your introduction, projects explanation, and behavioral questions. Practice coding problems on whiteboard and system design basics.",
      tips: "Research the company, dress professionally, maintain eye contact, and communicate your thought process clearly during problem-solving.",
      common: "Common questions: 'Tell me about yourself', 'Explain your projects', 'Why should we hire you?', and situation-based behavioral questions."
    },
    roadmap: {
      beginner: "Start with aptitude basics, then move to programming fundamentals. Practice 2-3 problems daily and gradually increase difficulty.",
      intermediate: "Focus on DSA, participate in coding contests, build projects, and start company-specific preparation.",
      advanced: "Mock interviews, system design, competitive programming, and soft skills development."
    },
    resume: {
      tips: "Keep it one page, highlight projects and achievements, use action verbs, tailor for each company, and include relevant technical skills.",
      projects: "Include 2-3 good projects with clear descriptions of technologies used and your contributions. GitHub profile should be updated.",
      skills: "List programming languages, frameworks, tools, and soft skills. Be honest about your proficiency level."
    },
    companies: {
      product: "Product companies (Google, Amazon, Microsoft) focus on DSA, system design, and problem-solving skills.",
      service: "Service companies (TCS, Infosys, Wipro) emphasize aptitude, communication, and basic technical knowledge.",
      startup: "Startups look for practical skills, project experience, and adaptability to different technologies."
    },
    default: "I'm here to help with placement preparation topics like aptitude tests, technical interviews, resume building, and company-specific preparation. Could you please be more specific about what you need help with?"
  };

  const findBestResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      const greetings = knowledgeBase.greeting;
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Aptitude related
    if (message.includes('aptitude') || message.includes('quant') || message.includes('reasoning')) {
      if (message.includes('prepare') || message.includes('how') || message.includes('tips')) {
        return knowledgeBase.aptitude.preparation;
      }
      if (message.includes('resource') || message.includes('book') || message.includes('material')) {
        return knowledgeBase.aptitude.resources;
      }
      if (message.includes('pattern') || message.includes('format') || message.includes('type')) {
        return knowledgeBase.aptitude.pattern;
      }
      return "For aptitude preparation: " + knowledgeBase.aptitude.preparation;
    }

    // Technical interview
    if (message.includes('technical') || message.includes('coding') || message.includes('programming')) {
      if (message.includes('language') || message.includes('java') || message.includes('python')) {
        return knowledgeBase.technical.languages;
      }
      if (message.includes('dsa') || message.includes('data structure') || message.includes('algorithm')) {
        return knowledgeBase.technical.dsa;
      }
      return knowledgeBase.technical.preparation;
    }

    // Interview preparation
    if (message.includes('interview') || message.includes('hr') || message.includes('behavioral')) {
      if (message.includes('tip') || message.includes('advice')) {
        return knowledgeBase.interview.tips;
      }
      if (message.includes('question') || message.includes('ask')) {
        return knowledgeBase.interview.common;
      }
      return knowledgeBase.interview.preparation;
    }

    // Roadmap
    if (message.includes('roadmap') || message.includes('plan') || message.includes('schedule')) {
      if (message.includes('beginner') || message.includes('start')) {
        return knowledgeBase.roadmap.beginner;
      }
      if (message.includes('advanced') || message.includes('expert')) {
        return knowledgeBase.roadmap.advanced;
      }
      return knowledgeBase.roadmap.intermediate;
    }

    // Resume
    if (message.includes('resume') || message.includes('cv') || message.includes('profile')) {
      if (message.includes('project')) {
        return knowledgeBase.resume.projects;
      }
      if (message.includes('skill')) {
        return knowledgeBase.resume.skills;
      }
      return knowledgeBase.resume.tips;
    }

    // Companies
    if (message.includes('company') || message.includes('google') || message.includes('amazon') || message.includes('microsoft')) {
      if (message.includes('product')) {
        return knowledgeBase.companies.product;
      }
      if (message.includes('service')) {
        return knowledgeBase.companies.service;
      }
      if (message.includes('startup')) {
        return knowledgeBase.companies.startup;
      }
      return "Companies generally fall into three categories:\n\n" +
             "🏢 Product Companies: " + knowledgeBase.companies.product + "\n\n" +
             "💼 Service Companies: " + knowledgeBase.companies.service + "\n\n" +
             "🚀 Startups: " + knowledgeBase.companies.startup;
    }

    // Default response
    return knowledgeBase.default;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: findBestResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How to prepare for aptitude?",
    "Technical interview tips",
    "Resume building advice",
    "Best programming language?",
    "Company preparation strategy"
  ];

  return (
    <div className="position-fixed bottom-0 end-0 m-3" style={{ zIndex: 1050 }}>
      {/* Chatbot Toggle Button */}
      {!isOpen && (
        <button
          className="btn btn-primary rounded-circle shadow-lg"
          style={{ width: '60px', height: '60px' }}
          onClick={() => setIsOpen(true)}
        >
          <i className="bi bi-robot fs-4"></i>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="card shadow-lg" style={{ width: '350px', height: '500px' }}>
          {/* Header */}
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <i className="bi bi-robot me-2"></i>
              <strong>PrepTrack Assistant</strong>
            </div>
            <button
              className="btn btn-sm btn-light"
              onClick={() => setIsOpen(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Messages Area */}
          <div 
            className="card-body p-3 d-flex flex-column"
            style={{ height: '400px', overflowY: 'auto' }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`d-flex mb-3 ${message.isUser ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div
                  className={`chatbot-message p-3 rounded-3 ${
                    message.isUser
                      ? 'bg-primary text-white'
                      : 'bg-light border'
                  }`}
                >
                  <div className="message-text">{message.text}</div>
                  <small className={`d-block mt-1 ${message.isUser ? 'text-white-50' : 'text-muted'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </small>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="d-flex justify-content-start mb-3">
                <div className="bg-light border p-3 rounded-3">
                  <div className="d-flex align-items-center">
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="mt-2">
                <small className="text-muted">Quick questions you can ask:</small>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="btn btn-sm btn-outline-primary d-block w-100 text-start mb-1"
                    onClick={() => setInputMessage(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="card-footer">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Ask about placements..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                className="btn btn-primary"
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
              >
                <i className="bi bi-send"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;