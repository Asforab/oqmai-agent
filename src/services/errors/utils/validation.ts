import { readFile } from 'fs/promises';
import { parse } from '@typescript-eslint/typescript-estree';

export async function validateExportExists(
  modulePath: string, 
  exportName: string
): Promise<boolean> {
  try {
    const content = await readFile(modulePath, 'utf-8');
    const ast = parse(content, {
      jsx: true,
      range: true,
      loc: true
    });

    // Check for named exports
    const hasNamedExport = ast.body.some(node => 
      node.type === 'ExportNamedDeclaration' &&
      ((node.declaration?.type === 'VariableDeclaration' &&
        node.declaration.declarations.some(d => 
          d.id.type === 'Identifier' && d.id.name === exportName
        )) ||
      (node.specifiers.some(s => 
        s.exported.type === 'Identifier' && s.exported.name === exportName
      )))
    );

    // Check for default exports
    const hasDefaultExport = exportName === 'default' && ast.body.some(node =>
      node.type === 'ExportDefaultDeclaration'
    );

    return hasNamedExport || hasDefaultExport;
  } catch {
    return false;
  }
}