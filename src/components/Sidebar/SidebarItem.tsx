import React from 'react';
import { MessageSquare, Pencil, Trash2 } from 'lucide-react';
import { EditableText } from '../UI/EditableText';
import { KebabMenu } from '../UI/KebabMenu/KebabMenu';

interface SidebarItemProps {
  id: string;
  type: 'conversation';
  title: string;
  onRename: (id: string, newTitle: string) => void;
  onDelete: () => void;
  isActive?: boolean;
}

export function SidebarItem({
  id,
  title,
  onRename,
  onDelete,
  isActive
}: SidebarItemProps) {
  const menuItems = [
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
    <div className="group relative">
      <div 
        className={`flex items-center px-2 py-2 text-gray-300 hover:bg-[#2a2a2a] rounded-lg transition-colors ${
          isActive ? 'bg-[#2a2a2a]' : ''
        }`}
      >
        <div className="flex items-center flex-1 min-w-0">
          <MessageSquare className="w-4 h-4 mr-2 text-orange-500" />
          <EditableText
            value={title}
            onChange={(newTitle) => onRename(id, newTitle)}
            className="flex-1 truncate text-sm"
          />
        </div>
        
        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <KebabMenu items={menuItems} />
        </div>
      </div>
    </div>
  );
}