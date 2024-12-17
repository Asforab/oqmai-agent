import { MessageRetriever } from './MessageRetriever';
import { CitationManager } from './CitationManager';
import { MessageFormatter } from './MessageFormatter';
import { OpenAIError } from '../core/errors';
import { Logger } from '../core/utils';
import { MessageContent } from './types';

export class MessageProcessor {
  private logger: Logger;
  private messageRetriever: MessageRetriever;
  private citationManager: CitationManager;
  private messageFormatter: MessageFormatter;

  constructor() {
    this.logger = new Logger('MessageProcessor');
    this.messageRetriever = new MessageRetriever();
    this.citationManager = new CitationManager();
    this.messageFormatter = new MessageFormatter();
  }

  async processMessage(threadId: string, messageId: string): Promise<string> {
    try {
      // Retrieve message content
      const messageContent = await this.messageRetriever.retrieveMessage(threadId, messageId);
      this.logger.debug('Retrieved message content', { threadId, messageId });

      // Process citations
      const citations = await this.citationManager.processCitations(messageContent.annotations);
      this.logger.debug('Processed citations', { citationCount: citations.length });

      // Format final message
      return this.messageFormatter.formatMessage(messageContent, citations);
    } catch (error) {
      this.logger.error('Failed to process message', { error });
      throw new OpenAIError(
        'Failed to process message',
        'MESSAGE_PROCESSING_ERROR',
        undefined,
        error
      );
    }
  }
}