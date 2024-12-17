import { Message } from '../types/chat';

export function formatMessagesForAPI(messages: Message[]) {
  return messages.map(msg => ({
    role: msg.isUser ? 'user' : 'assistant',
    content: msg.text
  }));
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}