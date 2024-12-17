import React, { useRef, useState, useCallback, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import { KebabMenuItem } from './KebabMenuItem';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { MenuPosition } from '../../../types/ui';

interface KebabMenuProps {
  items: Array<{
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }>;
  position?: MenuPosition;
}

export function KebabMenu({ items, position = 'bottom-right' }: KebabMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
  }, []);

  useClickOutside(menuRef, handleClickOutside, [buttonRef]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getMenuPosition = (): string => {
    switch (position) {
      case 'bottom-right':
        return 'top-full right-0';
      case 'bottom-left':
        return 'top-full left-0';
      case 'top-right':
        return 'bottom-full right-0';
      case 'top-left':
        return 'bottom-full left-0';
      default:
        return 'top-full right-0';
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-[#2a2a2a] transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        aria-label="Menu de opções"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <MoreVertical className="w-4 h-4 text-gray-300" />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute ${getMenuPosition()} z-50 mt-1 w-48 rounded-md bg-[#1f1f1f] shadow-lg ring-1 ring-black ring-opacity-5 transform opacity-100 scale-100 transition-all duration-100 ease-out origin-top-right`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {items.map((item, index) => (
              <KebabMenuItem
                key={index}
                label={item.label}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}