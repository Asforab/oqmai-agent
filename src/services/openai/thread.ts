import { openai } from './client';
import { OPENAI_CONFIG } from './config';
import { Thread, ThreadMessage } from './types';

export class ThreadManager {
  private threadId: string | null = null;
  private runId: string | null = null;

  async createThread(): Promise<Thread> {
    try {
      const thread = await openai.beta.threads.create();
      this.threadId = thread.id;
      return thread;
    } catch (error) {
      console.error('Failed to create thread:', error);
      throw new Error('Failed to create thread');
    }
  }

  async addMessage(content: string): Promise<ThreadMessage> {
    if (!this.threadId) {
      throw new Error('Thread not initialized');
    }

    try {
      return await openai.beta.threads.messages.create(this.threadId, {
        role: 'user',
        content,
      });
    } catch (error) {
      console.error('Failed to add message:', error);
      throw new Error('Failed to add message');
    }
  }

  async runAssistant(): Promise<string> {
    if (!this.threadId) {
      throw new Error('Thread not initialized');
    }

    try {
      const run = await openai.beta.threads.runs.create(this.threadId, {
        assistant_id: OPENAI_CONFIG.ASSISTANT_ID,
      });
      this.runId = run.id;
      return this.waitForCompletion();
    } catch (error) {
      console.error('Failed to run assistant:', error);
      throw new Error('Failed to run assistant');
    }
  }

  private async waitForCompletion(): Promise<string> {
    if (!this.threadId || !this.runId) {
      throw new Error('Thread or run not initialized');
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
      console.error('Failed while waiting for completion:', error);
      throw new Error('Failed while waiting for completion');
    }
  }

  async cancelRun(): Promise<void> {
    if (this.threadId && this.runId) {
      try {
        await openai.beta.threads.runs.cancel(this.threadId, this.runId);
      } catch (error) {
        console.error('Failed to cancel run:', error);
      }
    }
  }
}