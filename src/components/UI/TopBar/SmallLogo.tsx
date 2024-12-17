import React from 'react';

export function SmallLogo() {
  return (
    <div className="w-8 h-8 relative">
      <div className="absolute inset-0 rounded-full border-2 border-orange-500" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <span className="text-xl font-bold text-white tracking-tighter">Q</span>
          <div className="absolute bottom-0 right-[-4px] w-2 h-[2px] bg-white transform rotate-[-45deg]" />
        </div>
      </div>
    </div>
  );
}