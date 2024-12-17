import { Logger } from '../core/utils/Logger';

interface ErrorDetails {
  message: string;
  code: string;
  suggestions?: string[];
}

export class ModuleErrorHandler {
  private logger: Logger;

  constructor() {
    this.logger = new Logger('ModuleErrorHandler');
  }

  handleModuleExportError(modulePath: string, exportName: string): ErrorDetails {
    const error: ErrorDetails = {
      message: `Missing export '${exportName}' in module '${modulePath}'`,
      code: 'MODULE_EXPORT_ERROR',
      suggestions: [
        `Check that ${exportName} is properly exported from ${modulePath}`,
        'Verify the export statement syntax:',
        `  export const ${exportName} = ...`,
        'or',
        `  export { ${exportName} }`,
        '',
        'Common issues:',
        '- Typos in export name',
        '- Missing export statement',
        '- Incorrect file path'
      ]
    };

    this.logger.error(error.message, { modulePath, exportName });
    return error;
  }
}