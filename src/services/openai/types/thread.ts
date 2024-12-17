export interface ThreadMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string[];
  createdAt: number;
}

export interface Thread {
  id: string;
  messages: ThreadMessage[];
}

export interface ThreadRun {
  id: string;
  status: 'queued' | 'in_progress' | 'completed' | 'failed' | 'requires_action';
  last_error?: {
    message: string;
  };
}