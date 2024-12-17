import React from 'react';
import { Avatar } from '../UI/Avatar';
import { formatTimestamp } from '../../utils/chat';
import { formatMessageWithStructure } from '../../utils/formatting';

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  timestamp: number;
}

export function ChatMessage({ text, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex items-start gap-3 group animate-fade-in ${
      isUser ? 'flex-row-reverse' : ''
    }`}>
      <Avatar
        name={isUser ? 'Você' : 'OQM.ia'}
        className={isUser ? 'bg-orange-500' : 'bg-[#2a2a2a]'}
      />
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
        <span className="text-sm text-gray-400 mb-1">
          {isUser ? 'Você' : 'OQM.ia'} • {formatTimestamp(timestamp)}
        </span>
        
        <div className={`rounded-lg p-4 shadow-md ${
          isUser
            ? 'bg-orange-500 text-white rounded-tr-none'
            : 'bg-[#2a2a2a] text-white rounded-tl-none'
        }`}>
          <div className="prose prose-invert max-w-none">
            {formatMessageWithStructure(text)}
          </div>
        </div>
        
        {isUser && (
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              Enviado
            </span>
            <span>•</span>
            <span>Lido</span>
          </div>
        )}
      </div>
    </div>
  );
}