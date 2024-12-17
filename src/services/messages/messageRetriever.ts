import OpenAI from 'openai';
import { MessageContent } from './types';
import { MessageError } from './errors/MessageError';
import { validateMessageContent } from './utils/validation';
import { ERROR_MESSAGES } from './constants';

export class MessageRetriever {
  constructor(private client: OpenAI) {}

  async retrieveMessage(threadId: string, messageId: string): Promise<MessageContent> {
    try {
      const message = await this.client.beta.threads.messages.retrieve(
        threadId,
        messageId
      );

      const content: MessageContent = {
        value: message.content[0].text.value,
        annotations: message.content[0].text.annotations
      };

      validateMessageContent(content);
      return content;
    } catch (error) {
      throw new MessageError(
        ERROR_MESSAGES.RETRIEVAL_FAILED,
        'RETRIEVAL_ERROR',
        error
      );
    }
  }
}