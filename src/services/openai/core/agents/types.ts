export interface AgentMetrics {
  totalCalls: number;
  successfulCalls: number;
  averageDuration: number;
  lastStatus: string | null;
}

export interface AgentResponse {
  text: string;
  status: string;
  metrics: AgentMetrics;
}

export interface AgentStatus {
  name: string;
  active: boolean;
  metrics: AgentMetrics;
  lastError?: string;
}