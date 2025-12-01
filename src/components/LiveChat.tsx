
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useAIChat } from "@/hooks/useAIChat";

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { messages, isTyping, sendMessage, getQuickActions } = useAIChat();

  // Format message to strip markdown
  const formatMessage = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove **bold**
      .replace(/\*(.*?)\*/g, '$1')       // Remove *italic*
      .replace(/#{1,6}\s/g, '')          // Remove # headers
      .replace(/```[\s\S]*?```/g, '')    // Remove code blocks
      .replace(/`(.*?)`/g, '$1')         // Remove `inline code`
      .replace(/\n-\s/g, '\n• ')         // Convert - bullets to •
      .replace(/\n\*\s/g, '\n• ');       // Convert * bullets to •
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    await sendMessage(message);
    setMessage("");
  };

  const handleQuickAction = async (action: string) => {
    await sendMessage(action);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-80 sm:w-96 overflow-hidden transition-all animate-fade-in">
          <div className="bg-agro-blue text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Live Chat Support</h3>
              <p className="text-xs opacity-90">AI-powered agricultural assistance</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-blue-800"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`${msg.isUser ? "text-right" : "text-left"}`}
              >
                <div 
                  className={`inline-block rounded-lg px-4 py-2 max-w-[85%] whitespace-pre-line ${
                    msg.isUser 
                      ? "bg-agro-blue text-white" 
                      : "bg-white text-gray-800 shadow-sm border"
                  }`}
                >
                  {formatMessage(msg.text)}
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${msg.isUser ? "text-right" : "text-left"}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="text-left">
                <div className="inline-block bg-white rounded-lg px-4 py-2 shadow-sm border">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="px-3 py-2 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-1">
              {getQuickActions().slice(0, 3).map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 px-2"
                  onClick={() => handleQuickAction(action)}
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
          
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about farming, prices, weather..."
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-agro-blue text-sm"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                className="bg-agro-green text-agro-blue hover:bg-agro-green/90"
                disabled={isTyping || !message.trim()}
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 bg-agro-orange text-white shadow-lg hover:bg-agro-orange/90 flex items-center justify-center relative"
        >
          <span className="text-2xl">💬</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </Button>
      )}
    </div>
  );
};

export default LiveChat;
