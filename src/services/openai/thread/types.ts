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

export interface RunStep {
  id: string;
  type: string;
  status: string;
  step_details: {
    type: string;
    tool_calls?: ToolCall[];
  };
}

export interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;
  };
}