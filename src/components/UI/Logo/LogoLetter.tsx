import React from 'react';

export function LogoLetter() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <span className="text-4xl font-bold text-white tracking-tighter">Q</span>
        <div className="absolute bottom-0 right-[-6px] w-3 h-[3px] bg-white transform rotate-[-45deg]" />
      </div>
    </div>
  );
}