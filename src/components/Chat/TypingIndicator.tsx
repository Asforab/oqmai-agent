import React from 'react';
import { Avatar } from '../UI/Avatar';

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <Avatar name="OQM.ia" className="bg-[#2a2a2a]" />
      
      <div className="flex flex-col items-start max-w-[80%]">
        <span className="text-sm text-gray-400 mb-1">
          OQM.ia está digitando...
        </span>
        
        <div className="bg-[#2a2a2a] rounded-lg p-4 rounded-tl-none">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-100" />
            <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce delay-200" />
          </div>
        </div>
      </div>
    </div>
  );
}