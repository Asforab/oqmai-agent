import React, { useEffect, useRef } from 'react';
import { Message } from '../../types/chat';
import { ChatMessage } from './Message/ChatMessage';
import { AnalyzingIndicator } from './Message/AnalyzingIndicator';

interface ChatContainerProps {
  messages: Message[];
  isAnalyzing?: boolean;
}

export function ChatContainer({ messages, isAnalyzing = false }: ChatContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isAnalyzing]);

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-auto px-4 py-6 space-y-6"
      style={{ scrollbarGutter: 'stable' }}
    >
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          text={msg.text}
          isUser={msg.isUser}
          timestamp={msg.timestamp}
        />
      ))}
      
      {isAnalyzing && <AnalyzingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
}