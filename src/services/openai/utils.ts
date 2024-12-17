import { Message } from '../../types/chat';
import { OpenAIMessage } from './types';

export function formatMessagesForAPI(messages: Message[]): OpenAIMessage[] {
  return messages.map(msg => ({
    role: msg.isUser ? 'user' : 'assistant',
    content: msg.text
  }));
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}