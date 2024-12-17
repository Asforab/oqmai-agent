import { openai } from '../client/OpenAIClient';
import { ASSISTANT_CONFIG } from '../config/constants';
import { Logger } from '../core/utils/Logger';

interface ModuleExportCheckResult {
  exists: boolean;
  error?: string;
  suggestions?: string[];
}

export class ModuleChecker {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('ModuleChecker');
  }

  async checkOpenAIServiceExport(): Promise<ModuleExportCheckResult> {
    try {
      // Verify OpenAI client exists
      if (!openai) {
        return {
          exists: false,
          error: 'OpenAI client not initialized',
          suggestions: [
            'Ensure OpenAI client is properly initialized in client/OpenAIClient.ts',
            'Check that environment variables are properly configured'
          ]
        };
      }

      // Verify assistant IDs are configured
      const missingIds = Object.entries(ASSISTANT_CONFIG).filter(
        ([_, config]) => !config.ID
      ).map(([name]) => name);

      if (missingIds.length > 0) {
        return {
          exists: false,
          error: `Missing assistant IDs for: ${missingIds.join(', ')}`,
          suggestions: [
            'Check environment variables for assistant IDs',
            'Verify assistant IDs are properly configured in config/constants.ts'
          ]
        };
      }

      // All checks passed
      return { exists: true };

    } catch (error) {
      this.logger.error('Error checking OpenAI service exports', { error });
      return {
        exists: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        suggestions: [
          'Check file paths and imports',
          'Verify all required dependencies are installed',
          'Ensure proper TypeScript configuration'
        ]
      };
    }
  }
}