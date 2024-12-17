import OpenAI from 'openai';
import { Logger } from '../core/utils/Logger';
import { OpenAIError } from '../core/errors/OpenAIError';
import { withRetry } from '../core/utils/retry';
import { Thread, ThreadMessage, ThreadRun } from '../core/types/thread';

export class ThreadManager {
  private logger: Logger;

  constructor(private openai: OpenAI) {
    this.logger = new Logger('ThreadManager');
  }

  async createThread(): Promise<string> {
    return withRetry(async () => {
      try {
        this.logger.info('Creating new thread');
        const thread = await this.openai.beta.threads.create();
        this.logger.info('Thread created', { threadId: thread.id });
        return thread.id;
      } catch (error) {
        this.logger.error('Failed to create thread', { error });
        throw new OpenAIError('Failed to create thread', undefined, undefined, error);
      }
    });
  }

  async addMessage(threadId: string, role: string, content: string): Promise<void> {
    return withRetry(async () => {
      try {
        this.logger.info('Adding message to thread', { threadId, role });
        await this.openai.beta.threads.messages.create(threadId, {
          role,
          content
        });
        this.logger.info('Message added successfully');
      } catch (error) {
        this.logger.error('Failed to add message', { error, threadId });
        throw new OpenAIError('Failed to add message', undefined, undefined, error);
      }
    });
  }

  async createRun(threadId: string, assistantId: string): Promise<string> {
    return withRetry(async () => {
      try {
        this.logger.info('Creating run', { threadId, assistantId });
        const run = await this.openai.beta.threads.runs.create(threadId, {
          assistant_id: assistantId
        });
        this.logger.info('Run created', { runId: run.id });
        return run.id;
      } catch (error) {
        this.logger.error('Failed to create run', { error, threadId, assistantId });
        throw new OpenAIError('Failed to create run', undefined, undefined, error);
      }
    });
  }

  async checkRunStatus(threadId: string, runId: string): Promise<string> {
    return withRetry(async () => {
      try {
        while (true) {
          const run = await this.openai.beta.threads.runs.retrieve(threadId, runId);
          this.logger.info('Run status', { threadId, runId, status: run.status });

          if (run.status === 'completed' || run.status === 'failed' || run.status === 'cancelled') {
            if (run.status === 'failed') {
              this.logger.error('Run failed', { 
                threadId, 
                runId, 
                error: run.last_error?.message 
              });
            }
            return run.status;
          }

          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        this.logger.error('Failed to check run status', { error, threadId, runId });
        throw new OpenAIError('Failed to check run status', undefined, undefined, error);
      }
    });
  }

  async getMessages(threadId: string): Promise<string[]> {
    return withRetry(async () => {
      try {
        this.logger.info('Getting messages from thread', { threadId });
        const messages = await this.openai.beta.threads.messages.list(threadId);
        
        const assistantMessages = messages.data
          .filter(message => message.role === "assistant")
          .map(message => message.content[0]?.text?.value)
          .filter(Boolean);

        this.logger.info('Retrieved messages', { 
          threadId, 
          messageCount: assistantMessages.length 
        });
        
        return assistantMessages;
      } catch (error) {
        this.logger.error('Failed to get messages', { error, threadId });
        throw new OpenAIError('Failed to get messages', undefined, undefined, error);
      }
    });
  }

  async deleteThread(threadId: string): Promise<void> {
    return withRetry(async () => {
      try {
        this.logger.info('Deleting thread', { threadId });
        await this.openai.beta.threads.delete(threadId);
        this.logger.info('Thread deleted successfully', { threadId });
      } catch (error) {
        this.logger.error('Failed to delete thread', { error, threadId });
        throw new OpenAIError('Failed to delete thread', undefined, undefined, error);
      }
    });
  }
}