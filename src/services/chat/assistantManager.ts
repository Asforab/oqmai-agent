import { ThreadManager } from './threadManager';
import { AssistantError } from './errors';
import { Message } from '../../types/chat';
import { ChatServiceResponse } from './types';

export class AssistantManager {
  private threadManager: ThreadManager;

  constructor() {
    this.threadManager = new ThreadManager();
  }

  async startNewThread() {
    try {
      await this.threadManager.createThread();
    } catch (error) {
      throw new AssistantError('Failed to start new thread', error);
    }
  }

  async generateResponse(messages: Message[]): Promise<ChatServiceResponse> {
    try {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage?.isUser) {
        throw new Error('Last message must be from user');
      }

      await this.threadManager.addMessage(lastMessage.text);
      const response = await this.threadManager.runAssistant();

      return { text: response };
    } catch (error) {
      console.error('Error generating response:', error);
      return {
        text: 'Desculpe, não consegui gerar uma resposta.',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      };
    }
  }

  async getThreadMessages(): Promise<Message[]> {
    try {
      return await this.threadManager.getMessages();
    } catch (error) {
      throw new AssistantError('Failed to get thread messages', error);
    }
  }

  async cancelResponse() {
    try {
      await this.threadManager.cancelRun();
    } catch (error) {
      throw new AssistantError('Failed to cancel response', error);
    }
  }
}