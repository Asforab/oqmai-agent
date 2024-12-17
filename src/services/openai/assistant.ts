import { ThreadManager } from './thread';
import { Message } from '../../types/chat';
import { OpenAIResponse } from './types';

export class AssistantManager {
  private threadManager: ThreadManager;

  constructor() {
    this.threadManager = new ThreadManager();
  }

  async startNewThread(): Promise<void> {
    try {
      await this.threadManager.createThread();
    } catch (error) {
      console.error('Failed to start new thread:', error);
      throw new Error('Failed to start new thread');
    }
  }

  async generateResponse(messages: Message[]): Promise<OpenAIResponse> {
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

  async cancelResponse(): Promise<void> {
    try {
      await this.threadManager.cancelRun();
    } catch (error) {
      console.error('Failed to cancel response:', error);
      throw new Error('Failed to cancel response');
    }
  }
}