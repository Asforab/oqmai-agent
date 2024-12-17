import React from 'react';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
}

export function IconButton({ icon: Icon, className = '', ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      className={`transition-colors ${className}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}