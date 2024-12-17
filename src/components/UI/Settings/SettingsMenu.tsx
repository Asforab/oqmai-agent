import React, { useState, useRef } from 'react';
import { Settings, LogOut } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { SettingsMenuItem } from './SettingsMenuItem';

export function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useClickOutside(menuRef, () => setIsOpen(false), [buttonRef]);

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
        aria-label="Configurações"
      >
        <Settings className="w-5 h-5 text-white" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 rounded-lg bg-[#1f1f1f] shadow-lg ring-1 ring-black ring-opacity-5 transform opacity-100 scale-100 transition-all duration-200 ease-out origin-top-right z-50"
        >
          <div className="py-1">
            <SettingsMenuItem
              icon={<LogOut className="w-4 h-4" />}
              label="Sair"
              onClick={handleLogout}
            />
          </div>
        </div>
      )}
    </div>
  );
}