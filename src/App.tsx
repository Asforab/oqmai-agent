import React, { useState } from 'react';
import { MainLayout } from './components/Layout/MainLayout';
import { WelcomeSection } from './components/Welcome/WelcomeSection';
import { ChatSection } from './components/Chat/ChatSection';
import { AssistantStatusChecker } from './components/UI/AssistantStatus/AssistantStatusChecker';
import { useChat } from './hooks/useChat';

export default function App() {
  const {
    chatState,
    isAnalyzing,
    createNewConversation,
    updateConversationTitle,
    addMessage,
    switchConversation,
    closeConversation,
  } = useChat();
  
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    addMessage({ text: message, isUser: true });
    setMessage('');
  };

  const handleNewChat = () => {
    createNewConversation();
  };

  const showWelcome = chatState.conversations.length === 0;

  return (
    <MainLayout
      onNewChat={handleNewChat}
      conversations={chatState.conversations}
      activeConversationId={chatState.activeConversationId}
      onTitleChange={updateConversationTitle}
    >
      {showWelcome ? (
        <>
          <WelcomeSection />
          <AssistantStatusChecker />
        </>
      ) : (
        <ChatSection
          conversations={chatState.conversations}
          activeConversationId={chatState.activeConversationId}
          onSwitchConversation={switchConversation}
          onCloseConversation={closeConversation}
          onTitleChange={updateConversationTitle}
          message={message}
          setMessage={setMessage}
          onSubmit={handleSubmit}
          isAnalyzing={isAnalyzing}
        />
      )}
    </MainLayout>
  );
}