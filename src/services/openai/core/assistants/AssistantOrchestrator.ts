import OpenAI from 'openai';
import { Logger } from '../utils/Logger';
import { OpenAIError } from '../errors/OpenAIError';
import { AssistantManager } from './AssistantManager';
import { ConversationProcessor } from './ConversationProcessor';
import { ASSISTANT_CONFIG } from '../../config/constants';

export class AssistantOrchestrator {
  private logger: Logger;
  private assistantManager: AssistantManager;
  private conversationProcessor: ConversationProcessor;

  constructor(private openai: OpenAI) {
    this.logger = new Logger('AssistantOrchestrator');
    this.assistantManager = new AssistantManager(openai);
    this.conversationProcessor = new ConversationProcessor(openai);
  }

  async processConversation(message: string): Promise<string> {
    try {
      // Process with Ortobot
      const ortobotResponse = await this.conversationProcessor.processStep(
        message,
        ASSISTANT_CONFIG.ORTOBOT.ID,
        'Ortobot'
      );

      // Refine query
      const refinedQuery = await this.conversationProcessor.processStep(
        ortobotResponse,
        ASSISTANT_CONFIG.REFINE_QUERY.ID,
        'RefineQueryBot'
      );

      // Process refined query
      const finalResponse = await this.conversationProcessor.processStep(
        refinedQuery,
        ASSISTANT_CONFIG.ORTOBOT.ID,
        'Ortobot'
      );

      // Validate response
      const validatedResponse = await this.conversationProcessor.processStep(
        finalResponse,
        ASSISTANT_CONFIG.VALIDATION.ID,
        'ValidationBot'
      );

      return validatedResponse;
    } catch (error) {
      this.logger.error('Conversation processing failed', { error });
      throw new OpenAIError(
        'Failed to process conversation',
        'CONVERSATION_ERROR',
        undefined,
        error
      );
    }
  }

  async checkAssistantsStatus(): Promise<Record<string, boolean>> {
    return this.assistantManager.checkAllAssistants();
  }
}