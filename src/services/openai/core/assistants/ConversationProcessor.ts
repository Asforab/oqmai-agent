import OpenAI from 'openai';
import { Logger } from '../utils/Logger';
import { OpenAIError } from '../errors/OpenAIError';
import { ThreadManager } from '../thread/ThreadManager';

export class ConversationProcessor {
  private logger: Logger;
  private threadManager: ThreadManager;

  constructor(private openai: OpenAI) {
    this.logger = new Logger('ConversationProcessor');
    this.threadManager = new ThreadManager(openai);
  }

  async processStep(message: string, assistantId: string, stepName: string): Promise<string> {
    try {
      const threadId = await this.threadManager.createThread();
      await this.threadManager.addMessage(threadId, 'user', message);
      const runId = await this.threadManager.createRun(threadId, assistantId);
      const status = await this.threadManager.checkRunStatus(threadId, runId);

      if (status === 'failed') {
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
}