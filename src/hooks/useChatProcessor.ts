
import { useState, useCallback } from 'react';
import { knowledgeBase, keywordMatching, fallbackResponses, ChatResponse } from '@/data/chatKnowledgeBase';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ContactInfo {
  email: string;
  phone: string;
}

export const useChatProcessor = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: knowledgeBase.greeting.text, 
      isUser: false, 
      timestamp: new Date() 
    }
  ]);
  const [isCollectingContact, setIsCollectingContact] = useState(false);
  const [contactStep, setContactStep] = useState<'email' | 'phone' | 'complete'>('email');
  const [contactInfo, setContactInfo] = useState<Partial<ContactInfo>>({});
  const [isTyping, setIsTyping] = useState(false);

  const findBestMatch = useCallback((userMessage: string): ChatResponse | null => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keyword matches
    for (const [category, keywords] of Object.entries(keywordMatching)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return knowledgeBase[category] || null;
      }
    }
    
    // Check for exact matches in knowledge base
    for (const [key, response] of Object.entries(knowledgeBase)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return null;
  }, []);

  const simulateTyping = useCallback(async (delay: number = 1000) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, delay));
    setIsTyping(false);
  }, []);

  const addMessage = useCallback((text: string, isUser: boolean) => {
    setMessages(prev => [...prev, { text, isUser, timestamp: new Date() }]);
  }, []);

  const processContactCollection = useCallback(async (userMessage: string) => {
    await simulateTyping(800);
    
    if (contactStep === 'email') {
      const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
      if (emailRegex.test(userMessage)) {
        setContactInfo(prev => ({ ...prev, email: userMessage.match(emailRegex)?.[0] || '' }));
        setContactStep('phone');
        addMessage("Great! Now please provide your phone number so our team can reach you.", false);
      } else {
        addMessage("Please provide a valid email address (e.g., yourname@example.com)", false);
      }
    } else if (contactStep === 'phone') {
      const phoneRegex = /[\+]?[\d\s\-\(\)]{7,}/;
      if (phoneRegex.test(userMessage)) {
        setContactInfo(prev => ({ ...prev, phone: userMessage.match(phoneRegex)?.[0] || '' }));
        setContactStep('complete');
        setIsCollectingContact(false);
        addMessage(
          `Perfect! We have your details:\n📧 Email: ${contactInfo.email}\n📞 Phone: ${userMessage.match(phoneRegex)?.[0]}\n\nOur agricultural experts will contact you within 24 hours. Is there anything else I can help you with in the meantime?`,
          false
        );
        // Reset for next time
        setTimeout(() => {
          setContactStep('email');
          setContactInfo({});
        }, 1000);
      } else {
        addMessage("Please provide a valid phone number (e.g., +211 922 423 065 or 0922423065)", false);
      }
    }
  }, [contactStep, contactInfo, addMessage, simulateTyping]);

  const processMessage = useCallback(async (userMessage: string) => {
    // Add user message immediately
    addMessage(userMessage, true);
    
    // Handle contact collection flow
    if (isCollectingContact) {
      await processContactCollection(userMessage);
      return;
    }
    
    await simulateTyping();
    
    // Try to find a match in knowledge base
    const match = findBestMatch(userMessage);
    
    if (match) {
      addMessage(match.text, false);
      
      // Add suggestions if available
      if (match.suggestions && match.suggestions.length > 0) {
        setTimeout(() => {
          addMessage(`💡 You might also be interested in: ${match.suggestions!.join(' • ')}`, false);
        }, 1500);
      }
    } else {
      // No match found, start contact collection
      const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      addMessage(randomFallback, false);
      setIsCollectingContact(true);
      setContactStep('email');
    }
  }, [isCollectingContact, findBestMatch, addMessage, simulateTyping, processContactCollection]);

  const getQuickActions = useCallback(() => {
    return [
      'Market prices',
      'Weather forecast', 
      'Join cooperative',
      'Farming tips',
      'Contact information',
      'Our services'
    ];
  }, []);

  return {
    messages,
    isTyping,
    isCollectingContact,
    processMessage,
    getQuickActions
  };
};
