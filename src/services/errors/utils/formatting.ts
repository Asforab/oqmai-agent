export function formatModulePath(path: string): string {
  // Remove leading slash if present
  path = path.replace(/^\//, '');
  
  // Ensure .ts extension if not present
  if (!path.endsWith('.ts') && !path.endsWith('.tsx')) {
    path = `${path}.ts`;
  }

  // Ensure src prefix if not present
  if (!path.startsWith('src/')) {
    path = `src/${path}`;
  }

  return path;
}