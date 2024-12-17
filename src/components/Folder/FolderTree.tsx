import React from 'react';
import { Folder, ChevronRight, ChevronDown } from 'lucide-react';
import { FolderItem } from './FolderItem';
import { Folder as FolderType } from '../../types/folder';

interface FolderTreeProps {
  folders: FolderType[];
  expandedFolders: Set<string>;
  onToggleFolder: (folderId: string) => void;
  onRenameFolder: (folderId: string, newName: string) => void;
  onDeleteFolder: (folderId: string) => void;
  onCreateSubfolder: (parentId: string) => void;
}

export function FolderTree({
  folders,
  expandedFolders,
  onToggleFolder,
  onRenameFolder,
  onDeleteFolder,
  onCreateSubfolder
}: FolderTreeProps) {
  const renderFolder = (folder: FolderType) => {
    const isExpanded = expandedFolders.has(folder.id);
    const hasChildren = folders.some(f => f.parentId === folder.id);

    return (
      <div key={folder.id} className="space-y-1">
        <FolderItem
          folder={folder}
          isExpanded={isExpanded}
          hasChildren={hasChildren}
          onToggle={() => onToggleFolder(folder.id)}
          onRename={(newName) => onRenameFolder(folder.id, newName)}
          onDelete={() => onDeleteFolder(folder.id)}
          onCreateSubfolder={() => onCreateSubfolder(folder.id)}
        />
        
        {isExpanded && hasChildren && (
          <div className="ml-6 space-y-1">
            {folders
              .filter(f => f.parentId === folder.id)
              .map(renderFolder)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {folders.filter(f => !f.parentId).map(renderFolder)}
    </div>
  );
}