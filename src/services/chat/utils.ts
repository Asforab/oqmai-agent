import { Message } from '../../types/chat';
import { ChatCompletionMessage } from './types';

export function formatMessagesForAPI(messages: Message[]): ChatCompletionMessage[] {
  return messages.map(msg => ({
    role: msg.isUser ? 'user' : 'assistant',
    content: msg.text
  }));
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}