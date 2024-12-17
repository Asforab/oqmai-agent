import { ModuleChecker } from '../utils/moduleChecker';
import { ModuleErrorHandler } from '../utils/errorHandler';
import { Logger } from '../core/utils/Logger';

export class ServiceValidator {
  private moduleChecker: ModuleChecker;
  private errorHandler: ModuleErrorHandler;
  private logger: Logger;

  constructor() {
    this.moduleChecker = new ModuleChecker();
    this.errorHandler = new ModuleErrorHandler();
    this.logger = new Logger('ServiceValidator');
  }

  async validateOpenAIService(): Promise<boolean> {
    try {
      const checkResult = await this.moduleChecker.checkOpenAIServiceExport();

      if (!checkResult.exists) {
        const error = this.errorHandler.handleModuleExportError(
          '/src/services/openai',
          'openAIService'
        );

        this.logger.error('Service validation failed', {
          error,
          suggestions: checkResult.suggestions
        });

        return false;
      }

      this.logger.info('Service validation successful');
      return true;

    } catch (error) {
      this.logger.error('Service validation error', { error });
      return false;
    }
  }
}