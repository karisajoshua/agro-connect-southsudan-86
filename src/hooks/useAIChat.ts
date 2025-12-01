import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const useAIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Welcome to South Sudan Agro Marketplace! 👋\n\nI'm your AI agricultural assistant. I can help you with:\n• Market prices across regions\n• Weather forecasts\n• Farming tips and advice\n• Information about cooperatives\n• Contact and services\n\nHow can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (userMessage: string) => {
    // Add user message
    const newUserMessage: ChatMessage = {
      text: userMessage,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-ai`;
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            ...messages.map((msg) => ({
              role: msg.isUser ? "user" : "assistant",
              content: msg.text,
            })),
            { role: "user", content: userMessage },
          ],
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again in a moment.");
        }
        if (response.status === 402) {
          throw new Error("Service quota exceeded. Please contact support.");
        }
        throw new Error("Failed to get response from AI");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            
            if (content) {
              assistantText += content;
              
              // Update the last message or add new one
              setMessages((prev) => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg && !lastMsg.isUser) {
                  return [
                    ...prev.slice(0, -1),
                    { ...lastMsg, text: assistantText },
                  ];
                } else {
                  return [
                    ...prev,
                    {
                      text: assistantText,
                      isUser: false,
                      timestamp: new Date(),
                    },
                  ];
                }
              });
            }
          } catch {
            // Incomplete JSON, will be completed in next chunk
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
      
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble connecting right now. Please try again later or contact us directly at info@ssdagromarketplace.org",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const getQuickActions = (): string[] => {
    const actions = [
      "Market prices",
      "Weather forecast",
      "Farming tips",
      "Join cooperative",
      "Contact info",
    ];
    return actions;
  };

  return {
    messages,
    isTyping,
    sendMessage,
    getQuickActions,
  };
};
