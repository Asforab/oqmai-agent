import React from 'react';
import { formatMessageWithStructure } from '../../../utils/formatting';
import { MessageContentProps } from '../../../types/chat';

export function MessageContent({ text, isUser }: MessageContentProps) {
  const formattedText = formatMessageWithStructure(text);

  return (
    <div className={`rounded-lg p-4 shadow-md ${
      isUser 
        ? 'bg-[#D35400] text-white rounded-tr-none' 
        : 'bg-[#333333] text-white rounded-tl-none'
    }`}>
      <div 
        className="message-content"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    </div>
  );
}