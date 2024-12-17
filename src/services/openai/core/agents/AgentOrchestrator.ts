import { Logger } from '../utils/Logger';
import { OpenAIError } from '../errors/OpenAIError';
import { ThreadManager } from '../thread/ThreadManager';
import { ASSISTANT_CONFIG } from '../../config';
import type { AgentResponse, AgentMetrics } from './types';

export class AgentOrchestrator {
  private logger: Logger;
  private threadManager: ThreadManager;
  private metrics: Map<string, AgentMetrics>;

  constructor() {
    this.logger = new Logger('AgentOrchestrator');
    this.threadManager = new ThreadManager();
    this.metrics = new Map();
  }

  private async processAgentStep(
    message: string,
    agentName: keyof typeof ASSISTANT_CONFIG
  ): Promise<AgentResponse> {
    const startTime = Date.now();
    const agent = ASSISTANT_CONFIG[agentName];

    try {
      const threadId = await this.threadManager.createThread();
      await this.threadManager.addMessage(threadId, "user", message);
      const runId = await this.threadManager.createRun(threadId, agent.ID);
      const status = await this.threadManager.checkRunStatus(threadId, runId);

      const response = status === "completed" 
        ? await this.threadManager.getMessages(threadId)
        : [];

      this.updateMetrics(agentName, {
        duration: Date.now() - startTime,
        status,
        success: status === "completed" && response.length > 0
      });

      if (status !== "completed" || !response.length) {
        throw new OpenAIError(`${agentName} failed to process message`);
      }

      return {
        text: response[response.length - 1],
        status,
        metrics: this.getAgentMetrics(agentName)
      };
    } catch (error) {
      this.logger.error(`Error in ${agentName} step`, { error });
      throw error;
    }
  }

  private updateMetrics(agentName: string, metrics: Partial<AgentMetrics>) {
    const current = this.metrics.get(agentName) || {
      totalCalls: 0,
      successfulCalls: 0,
      averageDuration: 0,
      lastStatus: null
    };

    const updated = {
      totalCalls: current.totalCalls + 1,
      successfulCalls: metrics.success 
        ? current.successfulCalls + 1 
        : current.successfulCalls,
      averageDuration: metrics.duration 
        ? (current.averageDuration * current.totalCalls + metrics.duration) / (current.totalCalls + 1)
        : current.averageDuration,
      lastStatus: metrics.status || current.lastStatus
    };

    this.metrics.set(agentName, updated);
  }

  private getAgentMetrics(agentName: string): AgentMetrics {
    return this.metrics.get(agentName) || {
      totalCalls: 0,
      successfulCalls: 0,
      averageDuration: 0,
      lastStatus: null
    };
  }

  async orchestrateConversation(userMessage: string): Promise<string> {
    try {
      // 1. Initial Ortobot processing
      const ortobotResponse = await this.processAgentStep(userMessage, 'ORTOBOT');

      // 2. Query refinement
      const refinedQuery = await this.processAgentStep(
        ortobotResponse.text,
        'REFINE_QUERY'
      );

      // 3. Final Ortobot processing with refined query
      const finalResponse = await this.processAgentStep(
        refinedQuery.text,
        'ORTOBOT'
      );

      // 4. Validation
      const validatedResponse = await this.processAgentStep(
        finalResponse.text,
        'VALIDATION'
      );

      return validatedResponse.text;
    } catch (error) {
      this.logger.error('Orchestration error:', { error });
      throw new OpenAIError(
        'Failed to orchestrate conversation',
        'ORCHESTRATION_ERROR',
        undefined,
        error
      );
    }
  }

  async getAgentStatuses(): Promise<Record<string, boolean>> {
    const statuses: Record<string, boolean> = {};
    
    for (const [name, agent] of Object.entries(ASSISTANT_CONFIG)) {
      try {
        const metrics = this.getAgentMetrics(name);
        statuses[name] = metrics.lastStatus === 'completed';
      } catch (error) {
        this.logger.error(`Failed to get status for ${name}`, { error });
        statuses[name] = false;
      }
    }

    return statuses;
  }
}