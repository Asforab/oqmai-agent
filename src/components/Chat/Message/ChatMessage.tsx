import React from 'react';
import { Avatar } from '../../UI/Avatar';
import { MessageContent } from './MessageContent';
import { MessageMeta } from './MessageMeta';
import { MessageStatus } from './MessageStatus';
import { ChatMessageProps } from '../../../types/chat';

export function ChatMessage({ text, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex items-start gap-3 group animate-fade-in ${
      isUser ? 'flex-row-reverse' : ''
    }`}>
      <Avatar
        name={isUser ? 'Você' : 'OQM.ia'}
        className={isUser ? 'bg-[#FFA500]' : 'bg-[#333333]'}
      />
      
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
        <MessageMeta 
          name={isUser ? 'Você' : 'OQM.ia'} 
          timestamp={timestamp} 
        />
        
        <MessageContent 
          text={text} 
          isUser={isUser} 
        />
        
        {isUser && <MessageStatus />}
      </div>
    </div>
  );
}