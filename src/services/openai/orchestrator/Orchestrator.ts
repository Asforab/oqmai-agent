import OpenAI from 'openai';
import { ThreadManager } from '../thread/ThreadManager';
import { ASSISTANT_CONFIG } from '../config/constants';
import { OpenAIError } from '../core/errors/OpenAIError';
import { Logger } from '../core/utils/Logger';

export class Orchestrator {
  private threadManager: ThreadManager;
  private logger: Logger;

  constructor(private openai: OpenAI) {
    this.threadManager = new ThreadManager(openai);
    this.logger = new Logger('Orchestrator');
  }

  private async processAssistantStep(
    message: string,
    assistantId: string,
    stepName: string
  ): Promise<string> {
    try {
      const threadId = await this.threadManager.createThread();
      await this.threadManager.addMessage(threadId, "user", message);
      const runId = await this.threadManager.createRun(threadId, assistantId);
      const status = await this.threadManager.checkRunStatus(threadId, runId);

      if (status === "failed") {
        throw new OpenAIError(`${stepName} failed to process message`);
      }

      const messages = await this.threadManager.getMessages(threadId);
      if (!messages?.length) {
        throw new OpenAIError(`No messages found from ${stepName}`);
      }

      return messages[messages.length - 1];
    } catch (error) {
      this.logger.error(`Error in ${stepName}`, { error });
      throw error;
    }
  }

  async orchestrateConversation(userMessage: string): Promise<string> {
    try {
      // 1. Process with Ortobot
      const ortobotResponse = await this.processAssistantStep(
        userMessage,
        ASSISTANT_CONFIG.ORTOBOT.ID,
        'Ortobot'
      );

      // 2. Refine query
      const refinedQuery = await this.processAssistantStep(
        ortobotResponse,
        ASSISTANT_CONFIG.REFINE_QUERY.ID,
        'RefineQueryBot'
      );

      // 3. Process refined query with Ortobot
      const ortobotFinalResponse = await this.processAssistantStep(
        refinedQuery,
        ASSISTANT_CONFIG.ORTOBOT.ID,
        'Ortobot'
      );

      // 4. Validate response
      const validatedResponse = await this.processAssistantStep(
        ortobotFinalResponse,
        ASSISTANT_CONFIG.VALIDATION.ID,
        'ValidationBot'
      );

      return validatedResponse;
    } catch (error) {
      this.logger.error('Orchestration error:', { error });
      throw error;
    }
  }
}