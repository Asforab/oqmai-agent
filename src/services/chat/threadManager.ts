import { openai } from './client';
import { config } from './config';
import { ThreadError } from './errors';
import { Message } from '../../types/chat';

export class ThreadManager {
  private threadId: string | null = null;
  private runId: string | null = null;

  async createThread() {
    try {
      const thread = await openai.beta.threads.create();
      this.threadId = thread.id;
      return thread;
    } catch (error) {
      throw new ThreadError('Failed to create thread', error);
    }
  }

  async addMessage(content: string) {
    if (!this.threadId) {
      throw new ThreadError('Thread not initialized');
    }

    try {
      return await openai.beta.threads.messages.create(this.threadId, {
        role: 'user',
        content,
      });
    } catch (error) {
      throw new ThreadError('Failed to add message', error);
    }
  }

  async runAssistant() {
    if (!this.threadId) {
      throw new ThreadError('Thread not initialized');
    }

    try {
      const run = await openai.beta.threads.runs.create(this.threadId, {
        assistant_id: config.ASSISTANT_ID,
      });
      this.runId = run.id;
      return this.waitForCompletion();
    } catch (error) {
      throw new ThreadError('Failed to run assistant', error);
    }
  }

  private async waitForCompletion(): Promise<string> {
    if (!this.threadId || !this.runId) {
      throw new ThreadError('Thread or run not initialized');
    }

    try {
      let run;
      do {
        run = await openai.beta.threads.runs.retrieve(this.threadId, this.runId);
        
        if (run.status === 'failed') {
          throw new Error(run.last_error?.message || 'Run failed');
        }
        
        if (run.status !== 'completed') {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } while (run.status !== 'completed');

      const messages = await openai.beta.threads.messages.list(this.threadId);
      return messages.data[0]?.content[0]?.text?.value || '';
    } catch (error) {
      throw new ThreadError('Failed while waiting for completion', error);
    }
  }

  async getMessages(): Promise<Message[]> {
    if (!this.threadId) {
      return [];
    }

    try {
      const messages = await openai.beta.threads.messages.list(this.threadId);
      return messages.data.map(msg => ({
        id: msg.id,
        text: msg.content[0]?.text?.value || '',
        isUser: msg.role === 'user',
        timestamp: new Date(msg.created_at * 1000).getTime(),
      }));
    } catch (error) {
      throw new ThreadError('Failed to get messages', error);
    }
  }

  async cancelRun() {
    if (this.threadId && this.runId) {
      try {
        await openai.beta.threads.runs.cancel(this.threadId, this.runId);
      } catch (error) {
        console.error('Failed to cancel run:', error);
      }
    }
  }
}