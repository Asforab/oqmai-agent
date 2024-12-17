import { openai } from '../../config/openai';
import { ASSISTANT_ID } from '../../config/constants';
import { Message } from '../../types/chat';

export class ThreadService {
  private threadId: string | null = null;

  async createThread() {
    const thread = await openai.beta.threads.create();
    this.threadId = thread.id;
    return thread;
  }

  async addMessage(content: string) {
    if (!this.threadId) {
      throw new Error('Thread not initialized');
    }

    return await openai.beta.threads.messages.create(this.threadId, {
      role: 'user',
      content,
    });
  }

  async runAssistant() {
    if (!this.threadId) {
      throw new Error('Thread not initialized');
    }

    const run = await openai.beta.threads.runs.create(this.threadId, {
      assistant_id: ASSISTANT_ID,
    });

    return this.waitForCompletion(run.id);
  }

  private async waitForCompletion(runId: string) {
    if (!this.threadId) {
      throw new Error('Thread not initialized');
    }

    let run;
    do {
      run = await openai.beta.threads.runs.retrieve(this.threadId, runId);
      if (run.status === 'failed') {
        throw new Error('Assistant run failed');
      }
      if (run.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } while (run.status !== 'completed');

    const messages = await openai.beta.threads.messages.list(this.threadId);
    return messages.data[0]?.content[0]?.text?.value || '';
  }

  async getMessages(): Promise<Message[]> {
    if (!this.threadId) {
      return [];
    }

    const messages = await openai.beta.threads.messages.list(this.threadId);
    return messages.data.map(msg => ({
      id: msg.id,
      text: msg.content[0]?.text?.value || '',
      isUser: msg.role === 'user',
      timestamp: new Date(msg.created_at * 1000).getTime(),
    }));
  }
}