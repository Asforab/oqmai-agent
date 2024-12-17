import React from 'react';
import { SmallLogo } from './SmallLogo';
import { Menu } from 'lucide-react';
import { SettingsMenu } from '../Settings/SettingsMenu';

interface TopBarProps {
  onToggleSidebar: () => void;
}

export function TopBar({ onToggleSidebar }: TopBarProps) {
  return (
    <div className="h-14 bg-black border-b border-[#2a2a2a] flex items-center justify-between px-4">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors mr-2"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
        <div className="flex items-center space-x-2">
          <SmallLogo />
          <span className="text-white text-lg font-semibold">OQM.ia</span>
        </div>
      </div>
      
      <SettingsMenu />
    </div>
  );
}