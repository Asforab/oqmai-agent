import React from 'react';
import { ChatTab } from './ChatTab';
import { Conversation } from '../../types/chat';

interface ChatTabsProps {
  conversations: Conversation[];
  activeId: string | null;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  onTitleChange: (id: string, newTitle: string) => void;
}

export function ChatTabs({
  conversations,
  activeId,
  onTabClick,
  onTabClose,
  onTitleChange,
}: ChatTabsProps) {
  if (conversations.length === 0) return null;

  return (
    <div className="flex overflow-x-auto bg-[#1A1A1A] border-b border-[#2a2a2a] px-2">
      {conversations.map((conversation) => (
        <ChatTab
          key={conversation.id}
          id={conversation.id}
          title={conversation.title}
          isActive={activeId === conversation.id}
          onClick={() => onTabClick(conversation.id)}
          onClose={() => onTabClose(conversation.id)}
          onTitleChange={onTitleChange}
        />
      ))}
    </div>
  );
}