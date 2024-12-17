import React from 'react';

interface SettingsMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export function SettingsMenuItem({ icon, label, onClick }: SettingsMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] transition-colors"
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
}