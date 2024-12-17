import { z } from 'zod';

export interface ModuleExportError {
  code: 'MODULE_EXPORT_ERROR';
  message: string;
  modulePath: string;
  exportName: string;
  suggestions: string[];
}

export const moduleExportErrorSchema = z.object({
  code: z.literal('MODULE_EXPORT_ERROR'),
  message: z.string(),
  modulePath: z.string(),
  exportName: z.string(),
  suggestions: z.array(z.string())
});