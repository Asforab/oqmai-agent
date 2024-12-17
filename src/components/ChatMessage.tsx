import React from 'react';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
}

export function ChatMessage({ text, isUser }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? 'bg-orange-500 text-white'
            : 'bg-[#2a2a2a] text-white'
        }`}
      >
        {text}
      </div>
    </div>
  );
}