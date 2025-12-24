import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, History, Loader2, User, Bot, ChevronUp } from 'lucide-react';

const AIChatbotPage = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm your AI assistant for Partner. I can help you create estimates, manage projects, answer questions about construction, and more. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([
    { id: 1, title: 'Getting started with Partner', date: 'Today', preview: 'How do I create my first project?' },
    { id: 2, title: 'Estimate for kitchen remodel', date: 'Yesterday', preview: 'Create an estimate for a 200 sq ft kitchen...' },
    { id: 3, title: 'Client communication tips', date: '2 days ago', preview: 'What are best practices for...' }
  ]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: getAIResponse(inputValue.trim()),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('estimate') || lowerQuestion.includes('quote')) {
      return "I can help you create an estimate! To get started, I'll need:\n\n1. Project type (e.g., kitchen remodel, bathroom renovation)\n2. Approximate square footage\n3. Client name or project location\n4. Any specific materials or finishes you're considering\n\nWould you like me to guide you through creating a detailed estimate?";
    } else if (lowerQuestion.includes('project') || lowerQuestion.includes('create')) {
      return "Creating a new project is easy! You can:\n\n1. Click the 'New Project' button on your dashboard\n2. Fill in project details like name, client, and location\n3. Add line items and costs\n4. Generate and send estimates to clients\n\nWould you like me to walk you through any specific part of the project creation process?";
    } else if (lowerQuestion.includes('client')) {
      return "For client management, I can help you:\n\n• Add new clients with contact information\n• Track communication history\n• Send professional estimates and invoices\n• Manage project timelines and milestones\n\nWhat would you like to do with your clients?";
    } else if (lowerQuestion.includes('invoice')) {
      return "I can assist with invoicing! Here's what you can do:\n\n1. Create invoices from approved estimates\n2. Track payment status\n3. Send automated payment reminders\n4. Generate financial reports\n\nWould you like help creating an invoice for a specific project?";
    } else {
      return "I'm here to help with your construction business! I can assist with:\n\n• Creating estimates and quotes\n• Managing projects and timelines\n• Client communication\n• Invoice generation\n• Construction best practices\n\nWhat specific task would you like help with?";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    { icon: '📝', text: 'Create an estimate', color: 'from-primary-500 to-primary-600' },
    { icon: '📊', text: 'Show project summary', color: 'from-secondary-500 to-secondary-600' },
    { icon: '💡', text: 'Construction tips', color: 'from-accent-purple to-accent-blue' },
    { icon: '📧', text: 'Email templates', color: 'from-accent-orange to-accent-yellow' }
  ];

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)] flex gap-0 -m-6 sm:-m-8">
      {/* History Sidebar */}
      <div className={`${showHistory ? 'w-64 border-r' : 'w-0'} border-neutral-200 bg-white transition-all duration-300 overflow-hidden flex-shrink-0`}>
        <div className="p-4 border-b border-neutral-200">
          <h3 className="font-bold text-neutral-900 flex items-center gap-2">
            <History className="w-5 h-5 text-primary-600" />
            Chat History
          </h3>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {conversationHistory.map((chat) => (
            <button
              key={chat.id}
              className="w-full p-4 text-left hover:bg-neutral-50 border-b border-neutral-100 transition-colors group"
            >
              <p className="font-semibold text-sm text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
                {chat.title}
              </p>
              <p className="text-xs text-neutral-500 mb-2">{chat.date}</p>
              <p className="text-xs text-neutral-600 line-clamp-2">{chat.preview}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-primary-50 to-white">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors border border-neutral-200"
              title={showHistory ? "Hide history" : "Show history"}
            >
              {showHistory ? <ChevronUp className="w-5 h-5 text-neutral-600" /> : <History className="w-5 h-5 text-neutral-600" />}
            </button>
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-soft">
              <Sparkles className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900">AI Assistant</h2>
              <p className="text-sm text-neutral-600">Always here to help</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.length === 1 && (
            <div className="max-w-3xl mx-auto text-center space-y-6 pt-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-large mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900">How can I help you today?</h3>
              <p className="text-neutral-600 max-w-md mx-auto">
                I'm your AI assistant for construction management. Ask me anything about estimates, projects, or running your business.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 max-w-2xl mx-auto">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(prompt.text)}
                    className="p-4 bg-white border-2 border-neutral-200 rounded-xl text-left hover:border-primary-500 hover:shadow-soft transition-all duration-300 group"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${prompt.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <span className="text-xl">{prompt.icon}</span>
                    </div>
                    <p className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {prompt.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-secondary-400 to-secondary-600' 
                  : 'bg-gradient-to-br from-primary-500 to-primary-600'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-white" strokeWidth={2} />
                ) : (
                  <Bot className="w-5 h-5 text-white" strokeWidth={2} />
                )}
              </div>
              
              <div className={`flex-1 max-w-2xl ${message.role === 'user' ? 'flex flex-col items-end' : ''}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-900'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                </div>
                <p className="text-xs text-neutral-500 mt-1 px-2">{formatTime(message.timestamp)}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="bg-neutral-100 rounded-2xl px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-primary-600 animate-spin" />
                <span className="text-sm text-neutral-600">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-neutral-200 p-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your construction business..."
                  className="w-full px-4 py-3 pr-12 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none resize-none transition-colors"
                  rows="1"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex-shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" strokeWidth={2} />
                )}
              </button>
            </div>
            <p className="text-xs text-neutral-500 mt-2 text-center">
              AI can make mistakes. Check important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbotPage;