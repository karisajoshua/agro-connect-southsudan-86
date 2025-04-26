
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([
    { text: "Welcome to South Sudan Agro Marketplace! How can we help you today?", isUser: false }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = { text: message, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    
    // Simulate response
    setTimeout(() => {
      const responseMessage = { 
        text: "Thank you for your message. One of our agricultural experts will respond shortly. Is there anything else you would like to know?", 
        isUser: false 
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-80 sm:w-96 overflow-hidden transition-all animate-fade-in">
          <div className="bg-agro-blue text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Live Chat Support</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-blue-800"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>
          
          <div className="h-72 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 ${msg.isUser ? "text-right" : "text-left"}`}
              >
                <span 
                  className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                    msg.isUser 
                      ? "bg-agro-blue text-white" 
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-agro-blue"
              />
              <Button type="submit" className="bg-agro-green text-agro-blue hover:bg-agro-green/90">
                Send
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-agro-orange text-white shadow-lg hover:bg-agro-orange/90 flex items-center justify-center"
        >
          <span className="text-2xl">💬</span>
        </Button>
      )}
    </div>
  );
};

export default LiveChat;
