import React, { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { TopBar } from '../UI/TopBar/TopBar';
import { Conversation } from '../../types/chat';

interface MainLayoutProps {
  children: React.ReactNode;
  onNewChat: () => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  onTitleChange: (id: string, newTitle: string) => void;
}

export function MainLayout({
  children,
  onNewChat,
  conversations,
  activeConversationId,
  onTitleChange,
}: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-[#141414] overflow-hidden">
      <TopBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'w-64' : 'w-0'
          }`}
        >
          <Sidebar
            conversations={conversations}
            activeConversationId={activeConversationId}
            onNewChat={onNewChat}
            onTitleChange={onTitleChange}
            isOpen={isSidebarOpen}
          />
        </div>
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}