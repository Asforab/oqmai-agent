import React from 'react';
import { Avatar } from '../../UI/Avatar';
import { Brain } from 'lucide-react';

export function AnalyzingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <Avatar 
        name="OQM.ia" 
        className="bg-[#333333]" 
      />
      
      <div className="flex flex-col items-start max-w-[80%]">
        <span className="text-sm text-gray-400 mb-1">
          OQM.ia está analisando...
        </span>
        
        <div className="bg-[#333333] rounded-lg p-4 rounded-tl-none shadow-md">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-orange-500 animate-pulse" />
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}