import { Message } from '../../types/chat';

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIResponse {
  text: string;
  error?: string;
}

export interface OpenAIService {
  generateResponse(messages: Message[]): Promise<OpenAIResponse>;
}

export interface ThreadMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string[];
  createdAt: number;
}

export interface Thread {
  id: string;
  messages: ThreadMessage[];
}