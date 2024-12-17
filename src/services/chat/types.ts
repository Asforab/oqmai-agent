import { Message } from '../../types/chat';

export interface ChatCompletionMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatServiceResponse {
  text: string;
  error?: string;
}

export interface ChatService {
  generateResponse(messages: Message[]): Promise<ChatServiceResponse>;
}