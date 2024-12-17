import React from 'react';

interface AvatarProps {
  name: string;
  className?: string;
}

export function Avatar({ name, className = '' }: AvatarProps) {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div 
      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${className}`}
      aria-label={`Avatar de ${name}`}
    >
      {initials}
    </div>
  );
}