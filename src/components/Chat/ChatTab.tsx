import React from 'react';
import { X } from 'lucide-react';
import { EditableText } from '../UI/EditableText';

interface ChatTabProps {
  id: string;
  title: string;
  isActive: boolean;
  onTitleChange: (id: string, newTitle: string) => void;
  onClick: () => void;
  onClose: () => void;
}

export function ChatTab({
  id,
  title,
  isActive,
  onTitleChange,
  onClick,
  onClose,
}: ChatTabProps) {
  return (
    <div
      className={`flex items-center min-w-[200px] max-w-[300px] px-4 py-2 border-r border-[#2a2a2a] cursor-pointer transition-colors ${
        isActive ? 'bg-[#2a2a2a] text-white' : 'text-gray-400 hover:bg-[#242424]'
      }`}
    >
      <EditableText
        value={title}
        onChange={(newTitle) => onTitleChange(id, newTitle)}
        onClick={onClick}
        className="flex-1 truncate text-left text-sm"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="ml-2 p-1 rounded-full hover:bg-[#363636] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}