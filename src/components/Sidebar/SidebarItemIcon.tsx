import React from 'react';
import { MessageSquare, Folder } from 'lucide-react';

interface SidebarItemIconProps {
  type: 'conversation' | 'folder';
}

export function SidebarItemIcon({ type }: SidebarItemIconProps) {
  const Icon = type === 'conversation' ? MessageSquare : Folder;
  return <Icon className="w-4 h-4 mr-2 text-orange-500" />;
}