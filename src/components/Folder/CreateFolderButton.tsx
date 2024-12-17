import React from 'react';
import { FolderPlus } from 'lucide-react';

interface CreateFolderButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function CreateFolderButton({ onClick, disabled = false }: CreateFolderButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-center px-3 py-2 text-white bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FolderPlus className="w-4 h-4 mr-2" />
      Nova pasta
    </button>
  );
}