import { ThreadManager } from '../../thread/ThreadManager';
import { Logger } from '../../utils/Logger';
import { OpenAIError } from '../../errors/OpenAIError';
import { ASSISTANT_CONFIG } from '../../config/assistants';

export abstract class BaseStep {
  protected logger: Logger;
  protected threadManager: ThreadManager;

  constructor(
    protected assistantId: string,
    protected stepName: string
  ) {
    this.logger = new Logger(stepName);
    this.threadManager = new ThreadManager();
  }

  protected async process(message: string): Promise<string> {
    try {
      const threadId = await this.threadManager.createThread();
      await this.threadManager.addMessage(threadId, 'user', message);
      const runId = await this.threadManager.createRun(threadId, this.assistantId);
      const status = await this.threadManager.checkRunStatus(threadId, runId);

      if (status === 'failed') {
        throw new OpenAIError(`${this.stepName} failed to process message`);
      }

      const messages = await this.threadManager.getMessages(threadId);
      if (!messages.length) {
        throw new OpenAIError(`No messages found from ${this.stepName}`);
      }

      return messages[messages.length - 1];
    } catch (error) {
      this.logger.error('Processing error', { error });
      throw error;
    }
  }

  abstract execute(input: string): Promise<string>;
}