import { openai } from '../core/OpenAIClient';
import { OpenAIError } from '../core/errors';
import { Logger } from '../core/utils';
import { MessageContent } from './types';

export class MessageRetriever {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('MessageRetriever');
  }

  async retrieveMessage(threadId: string, messageId: string): Promise<MessageContent> {
    try {
      const message = await openai.beta.threads.messages.retrieve(threadId, messageId);
      
      if (!message.content[0]?.text) {
        throw new OpenAIError('Message content is empty', 'EMPTY_CONTENT_ERROR');
      }

      return {
        value: message.content[0].text.value,
        annotations: message.content[0].text.annotations || []
      };
    } catch (error) {
      this.logger.error('Failed to retrieve message', { error, threadId, messageId });
      throw new OpenAIError(
        'Failed to retrieve message',
        'MESSAGE_RETRIEVAL_ERROR',
        undefined,
        error
      );
    }
  }
}