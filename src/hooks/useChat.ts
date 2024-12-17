import { useState, useCallback } from 'react';
import { openAIService } from '../services/openai';
import { generateTitle } from '../utils/chat/titleGenerator';
import type { ChatState, Message, Conversation } from '../types/chat';

export function useChat() {
  const [chatState, setChatState] = useState<ChatState>({
    conversations: [],
    activeConversationId: null,
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'Nova Conversa',
      messages: [],
      createdAt: Date.now(),
    };

    setChatState(prev => ({
      conversations: [...prev.conversations, newConversation],
      activeConversationId: newConversation.id,
    }));
  }, []);

  const updateConversationTitle = useCallback((id: string, newTitle: string) => {
    setChatState(prev => ({
      ...prev,
      conversations: prev.conversations.map(conv =>
        conv.id === id ? { ...conv, title: newTitle } : conv
      ),
    }));
  }, []);

  const addMessage = useCallback(async (message: Omit<Message, 'id' | 'timestamp'>) => {
    if (!chatState.activeConversationId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      ...message,
      timestamp: Date.now(),
    };

    setChatState(prev => ({
      ...prev,
      conversations: prev.conversations.map(conv => {
        if (conv.id !== prev.activeConversationId) return conv;
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
        };
      }),
    }));

    if (message.isUser) {
      setIsAnalyzing(true);
      try {
        const response = await openAIService.generateResponse(message.text);
        
        const aiMessage: Message = {
          id: Date.now().toString(),
          text: response.text,
          isUser: false,
          timestamp: Date.now(),
        };

        setChatState(prev => ({
          ...prev,
          conversations: prev.conversations.map(conv => {
            if (conv.id !== prev.activeConversationId) return conv;
            
            const updatedMessages = [...conv.messages, aiMessage];
            const newTitle = conv.messages.length === 0 
              ? generateTitle(updatedMessages) 
              : conv.title;

            return {
              ...conv,
              title: newTitle,
              messages: updatedMessages,
            };
          }),
        }));
      } catch (error) {
        console.error('Error generating response:', error);
      } finally {
        setIsAnalyzing(false);
      }
    }
  }, [chatState.activeConversationId]);

  const switchConversation = useCallback((id: string) => {
    setChatState(prev => ({
      ...prev,
      activeConversationId: id,
    }));
  }, []);

  const closeConversation = useCallback((id: string) => {
    setChatState(prev => {
      const newConversations = prev.conversations.filter(conv => conv.id !== id);
      const newActiveId = prev.activeConversationId === id
        ? newConversations[newConversations.length - 1]?.id || null
        : prev.activeConversationId;

      return {
        conversations: newConversations,
        activeConversationId: newActiveId,
      };
    });
  }, []);

  return {
    chatState,
    isAnalyzing,
    createNewConversation,
    updateConversationTitle,
    addMessage,
    switchConversation,
    closeConversation,
  };
}