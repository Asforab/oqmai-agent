import OpenAI from 'openai';
import { MessageRetriever } from './messageRetriever';
import { CitationManager } from './citationManager';
import { MessageFormatter } from './messageFormatter';
import { MessageError } from './errors/MessageError';
import { ERROR_MESSAGES } from './constants';

export class MessageProcessor {
  private messageRetriever: MessageRetriever;
  private citationManager: CitationManager;
  private messageFormatter: MessageFormatter;

  constructor(private client: OpenAI) {
    this.messageRetriever = new MessageRetriever(client);
    this.citationManager = new CitationManager(client);
    this.messageFormatter = new MessageFormatter();
  }

  async processMessage(threadId: string, messageId: string): Promise<string> {
    try {
      // Retrieve message content
      const messageContent = await this.messageRetriever.retrieveMessage(
        threadId,
        messageId
      );

      // Process citations
      const citations = await Promise.all(
        messageContent.annotations.map((annotation, index) =>
          this.citationManager.createCitation(annotation, index)
        )
      );

      // Format final message
      return this.messageFormatter.formatMessage(messageContent, citations);
    } catch (error) {
      if (error instanceof MessageError) {
        throw error;
      }
      throw new MessageError(
        ERROR_MESSAGES.PROCESSING_FAILED,
        'PROCESSING_ERROR',
        error
      );
    }
  }
}