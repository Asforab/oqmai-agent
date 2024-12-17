import { FolderCreationError } from '../types/folder';

export function validateFolderName(name: string): FolderCreationError | null {
  if (!name.trim()) {
    return {
      type: 'invalid_chars',
      message: 'O nome da pasta não pode estar vazio'
    };
  }

  if (name.length > 255) {
    return {
      type: 'invalid_chars',
      message: 'O nome da pasta é muito longo'
    };
  }

  const invalidChars = /[<>:"/\\|?*\x00-\x1F]/g;
  if (invalidChars.test(name)) {
    return {
      type: 'invalid_chars',
      message: 'O nome da pasta contém caracteres inválidos'
    };
  }

  return null;
}

export function getFolderDepth(folder: string, parentId?: string): number {
  if (!parentId) return 0;
  return 1 + getFolderDepth(parentId);
}