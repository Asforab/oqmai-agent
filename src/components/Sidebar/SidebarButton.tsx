import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  children: React.ReactNode;
}

export function SidebarButton({ icon: Icon, onClick, children }: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center px-3 py-2 text-white bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-lg transition-colors"
    >
      <Icon className="w-4 h-4 mr-2" />
      {children}
    </button>
  );
}