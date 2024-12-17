import OpenAI from 'openai';
import { OpenAIError } from '../core/errors/OpenAIError';
import { Logger } from '../core/utils/Logger';

export class ThreadManager {
  private logger: Logger;

  constructor(private openai: OpenAI) {
    this.logger = new Logger('ThreadManager');
  }

  async createThread() {
    try {
      const thread = await this.openai.beta.threads.create();
      return thread.id;
    } catch (error) {
      this.logger.error('Failed to create thread', { error });
      throw new OpenAIError('Failed to create thread', undefined, undefined, error);
    }
  }

  async addMessage(threadId: string, role: string, content: string) {
    try {
      await this.openai.beta.threads.messages.create(threadId, {
        role,
        content
      });
    } catch (error) {
      this.logger.error('Failed to add message', { error });
      throw new OpenAIError('Failed to add message', undefined, undefined, error);
    }
  }

  async createRun(threadId: string, assistantId: string) {
    try {
      const run = await this.openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId
      });
      return run.id;
    } catch (error) {
      this.logger.error('Failed to create run', { error });
      throw new OpenAIError('Failed to create run', undefined, undefined, error);
    }
  }

  async checkRunStatus(threadId: string, runId: string): Promise<string> {
    try {
      while (true) {
        const run = await this.openai.beta.threads.runs.retrieve(threadId, runId);
        if (run.status === 'completed' || run.status === 'failed' || run.status === 'cancelled') {
          return run.status;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      this.logger.error('Failed to check run status', { error });
      throw new OpenAIError('Failed to check run status', undefined, undefined, error);
    }
  }

  async getMessages(threadId: string) {
    try {
      const messages = await this.openai.beta.threads.messages.list(threadId);
      return messages.data
        .filter(message => message.role === "assistant")
        .map(message => message.content[0]?.text?.value)
        .filter(Boolean);
    } catch (error) {
      this.logger.error('Failed to get messages', { error });
      throw new OpenAIError('Failed to get messages', undefined, undefined, error);
    }
  }
}