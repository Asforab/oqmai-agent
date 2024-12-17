import { ThreadService } from './threadService';
import { Message } from '../../types/chat';
import { ChatService, ChatServiceResponse } from './types';

export class AssistantService implements ChatService {
  private threadService: ThreadService;

  constructor() {
    this.threadService = new ThreadService();
  }

  async startNewThread() {
    await this.threadService.createThread();
  }

  async generateResponse(messages: Message[]): Promise<ChatServiceResponse> {
    try {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage?.isUser) {
        throw new Error('Last message must be from user');
      }

      await this.threadService.addMessage(lastMessage.text);
      const response = await this.threadService.runAssistant();

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
    return await this.threadService.getMessages();
  }
}