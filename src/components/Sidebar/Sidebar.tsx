import React from 'react';
import { Plus } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { Conversation } from '../../types/chat';

interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onNewChat: () => void;
  onTitleChange: (id: string, newTitle: string) => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
}

export function Sidebar({
  conversations,
  activeConversationId,
  onNewChat,
  onTitleChange,
  onDeleteConversation,
  isOpen
}: SidebarProps) {
  return (
    <div className={`fixed top-14 bottom-0 bg-[#141414] border-r border-[#2a2a2a] transition-all duration-300 ease-in-out overflow-hidden ${
      isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
    }`}>
      <div className="h-full flex flex-col">
        <div className="p-2">
          <button
            onClick={onNewChat}
            className="w-full flex items-center px-3 py-2 text-white bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova conversa
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.map((conversation) => (
            <SidebarItem
              key={conversation.id}
              id={conversation.id}
              type="conversation"
              title={conversation.title}
              onRename={onTitleChange}
              onDelete={() => onDeleteConversation(conversation.id)}
              isActive={conversation.id === activeConversationId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}