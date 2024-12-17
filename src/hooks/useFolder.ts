import { useState, useCallback } from 'react';
import { Folder } from '../types/folder';

export function useFolder() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const createFolder = useCallback((name: string, parentId?: string) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      createdAt: Date.now(),
      parentId
    };

    setFolders(prev => [...prev, newFolder]);
    setExpandedFolders(prev => {
      const next = new Set(prev);
      next.add(newFolder.id);
      return next;
    });

    return newFolder;
  }, []);

  const deleteFolder = useCallback((id: string) => {
    setFolders(prev => prev.filter(folder => folder.id !== id));
    setExpandedFolders(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleFolder = useCallback((id: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return {
    folders,
    expandedFolders,
    createFolder,
    deleteFolder,
    toggleFolder
  };
}