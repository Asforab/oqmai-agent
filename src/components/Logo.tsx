import React from 'react';

export function Logo() {
  return (
    <div className="w-20 h-20 relative mb-6">
      {/* Outer circle */}
      <div className="absolute inset-0 rounded-full border-[3px] border-orange-500"></div>
      
      {/* White Q letter with tail */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <span className="text-4xl font-bold text-white tracking-tighter">Q</span>
          {/* Custom tail for Q */}
          <div className="absolute bottom-0 right-[-6px] w-3 h-[3px] bg-white transform rotate-[-45deg]"></div>
        </div>
      </div>
    </div>
  );
}