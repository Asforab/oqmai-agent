import { Message } from '../../../types/chat';

export interface OpenAIResponse {
  text: string;
  error?: string;
}

export interface AssistantService {
  generateResponse(messages: Message[]): Promise<OpenAIResponse>;
}