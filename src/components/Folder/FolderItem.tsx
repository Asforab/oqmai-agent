import React from 'react';
import { Folder, ChevronRight, ChevronDown, Plus, Pencil, Trash2 } from 'lucide-react';
import { EditableText } from '../UI/EditableText';
import { KebabMenu } from '../UI/KebabMenu/KebabMenu';
import { Folder as FolderType } from '../../types/folder';

interface FolderItemProps {
  folder: FolderType;
  isExpanded: boolean;
  hasChildren: boolean;
  onToggle: () => void;
  onRename: (newName: string) => void;
  onDelete: () => void;
  onCreateSubfolder: () => void;
}

export function FolderItem({
  folder,
  isExpanded,
  hasChildren,
  onToggle,
  onRename,
  onDelete,
  onCreateSubfolder
}: FolderItemProps) {
  const menuItems = [
    {
      label: 'Nova Subpasta',
      onClick: onCreateSubfolder,
      icon: <Plus className="w-4 h-4" />
    },
    {
      label: 'Renomear',
      onClick: () => {/* Handled by EditableText */},
      icon: <Pencil className="w-4 h-4" />
    },
    {
      label: 'Excluir',
      onClick: onDelete,
      icon: <Trash2 className="w-4 h-4" />
    }
  ];

  return (
    <div className="group flex items-center px-2 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg transition-colors">
      <button
        onClick={onToggle}
        className="mr-1 hover:text-orange-500"
      >
        {hasChildren && (
          isExpanded ? 
            <ChevronDown className="w-4 h-4" /> : 
            <ChevronRight className="w-4 h-4" />
        )}
      </button>
      
      <Folder className="w-4 h-4 mr-2 text-orange-500" />
      
      <EditableText
        value={folder.name}
        onChange={onRename}
        className="flex-1 truncate text-sm"
      />
      
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <KebabMenu items={menuItems} />
      </div>
    </div>
  );
}