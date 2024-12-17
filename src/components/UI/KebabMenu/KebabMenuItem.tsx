import React from 'react';

interface KebabMenuItemProps {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

export function KebabMenuItem({ label, onClick, icon }: KebabMenuItemProps) {
  return (
    <button
      className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#2a2a2a] transition-colors focus:outline-none focus:bg-[#2a2a2a]"
      role="menuitem"
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
}