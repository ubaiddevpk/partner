import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, X, Loader2, User, Bot, Minimize2 } from 'lucide-react';

const AIChatPanel = ({ user, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hi! I'm your AI assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

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
      return "I can help you create an estimate! To get started, I'll need:\n\n1. Project type\n2. Square footage\n3. Client name\n4. Materials needed\n\nShall we begin?";
    } else if (lowerQuestion.includes('project')) {
      return "I can help with projects! You can:\n\n• Create new projects\n• View project details\n• Update project status\n• Add team members\n\nWhat would you like to do?";
    } else {
      return "I'm here to help! I can assist with:\n\n• Creating estimates\n• Managing projects\n• Client communication\n• Invoice generation\n\nWhat do you need help with?";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    { text: 'Create an estimate', icon: '📝' },
    { text: 'Show my projects', icon: '📊' },
    { text: 'Add a client', icon: '👤' },
    { text: 'Generate invoice', icon: '💳' }
  ];

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="w-96 bg-white border-r border-neutral-200 flex flex-col h-screen sticky top-0">
      {/* Chat Header */}
      <div className="px-4 py-4 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-primary-50 to-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-soft">
            <Sparkles className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 text-sm">AI Assistant</h3>
            <p className="text-xs text-neutral-600">Always here to help</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-neutral-100 transition-colors"
        >
          <X className="w-4 h-4 text-neutral-600" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 1 && (
          <div className="text-center space-y-4 pt-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-large mx-auto">
              <Sparkles className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h4 className="text-lg font-bold text-neutral-900">How can I help?</h4>
            <p className="text-sm text-neutral-600">Ask me anything about your construction business.</p>
            
            <div className="grid grid-cols-2 gap-2 mt-6">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(prompt.text)}
                  className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-left hover:border-primary-500 hover:bg-primary-50 transition-all group"
                >
                  <div className="text-xl mb-1">{prompt.icon}</div>
                  <p className="text-xs font-medium text-neutral-900 group-hover:text-primary-600">
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
            className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' 
                ? 'bg-gradient-to-br from-secondary-400 to-secondary-600' 
                : 'bg-gradient-to-br from-primary-500 to-primary-600'
            }`}>
              {message.role === 'user' ? (
                <User className="w-4 h-4 text-white" strokeWidth={2} />
              ) : (
                <Bot className="w-4 h-4 text-white" strokeWidth={2} />
              )}
            </div>
            
            <div className={`flex-1 ${message.role === 'user' ? 'flex flex-col items-end' : ''}`}>
              <div className={`rounded-xl px-3 py-2 ${
                message.role === 'user'
                  ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-900'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
              </div>
              <p className="text-xs text-neutral-500 mt-1 px-1">{formatTime(message.timestamp)}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <div className="bg-neutral-100 rounded-xl px-3 py-2 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-primary-600 animate-spin" />
              <span className="text-sm text-neutral-600">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-neutral-200 p-3 bg-white">
        <div className="flex gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none resize-none text-sm"
            rows="2"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" strokeWidth={2} />
            )}
          </button>
        </div>
        <p className="text-xs text-neutral-500 mt-2 text-center">
          AI can make mistakes. Verify important info.
        </p>
      </div>
    </div>
  );
};

export default AIChatPanel;