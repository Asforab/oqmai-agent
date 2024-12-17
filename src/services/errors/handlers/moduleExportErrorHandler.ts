import { ModuleExportError } from '../types';
import { formatModulePath } from '../utils/formatting';
import { validateExportExists } from '../utils/validation';

export class ModuleExportErrorHandler {
  private generateSuggestions(modulePath: string, exportName: string): string[] {
    const suggestions: string[] = [
      `Ensure the export statement exists in ${modulePath}:`,
      `  export const ${exportName} = ...;`,
      'or',
      `  export { ${exportName} };`,
      '',
      'For default exports:',
      `  export default ${exportName};`,
      '',
      'Common issues:',
      '- Check for typos in the export name',
      '- Verify the export is not inside a namespace',
      '- Confirm the file extension (.ts/.tsx)'
    ];

    return suggestions;
  }

  handleError(error: unknown, modulePath: string, exportName: string): ModuleExportError {
    // Format the module path for consistency
    const formattedPath = formatModulePath(modulePath);

    // Create detailed error message
    const message = `Missing export '${exportName}' in module '${formattedPath}'`;

    // Generate helpful suggestions
    const suggestions = this.generateSuggestions(formattedPath, exportName);

    return {
      code: 'MODULE_EXPORT_ERROR',
      message,
      modulePath: formattedPath,
      exportName,
      suggestions
    };
  }

  async verifyExport(modulePath: string, exportName: string): Promise<boolean> {
    try {
      return await validateExportExists(modulePath, exportName);
    } catch {
      return false;
    }
  }
}