import { Conversation } from './chat';

export interface SidebarItemProps {
  id: string;
  type: 'conversation' | 'folder';
  title: string;
  onRename: (id: string, newTitle: string) => void;
  isChild?: boolean;
  onAddConversation?: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  isActive?: boolean;
}