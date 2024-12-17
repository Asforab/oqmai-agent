import React from 'react';
import { ChatTabs } from './ChatTabs';
import { ChatContainer } from './ChatContainer';
import { ChatInput } from './ChatInput';
import { Conversation } from '../../types/chat';

interface ChatSectionProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSwitchConversation: (id: string) => void;
  onCloseConversation: (id: string) => void;
  onTitleChange: (id: string, newTitle: string) => void;
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isAnalyzing?: boolean;
}

export function ChatSection({
  conversations,
  activeConversationId,
  onSwitchConversation,
  onCloseConversation,
  onTitleChange,
  message,
  setMessage,
  onSubmit,
  isAnalyzing = false,
}: ChatSectionProps) {
  const activeConversation = conversations.find(
    (conv) => conv.id === activeConversationId
  );

  return (
    <div className="flex flex-col h-full">
      <ChatTabs
        conversations={conversations}
        activeId={activeConversationId}
        onTabClick={onSwitchConversation}
        onTabClose={onCloseConversation}
        onTitleChange={onTitleChange}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0">
          {activeConversation && (
            <ChatContainer 
              messages={activeConversation.messages}
              isAnalyzing={isAnalyzing}
            />
          )}
        </div>
        
        <ChatInput
          message={message}
          setMessage={setMessage}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}