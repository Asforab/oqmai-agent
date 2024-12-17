export interface Folder {
  id: string;
  name: string;
  createdAt: number;
  parentId?: string;
}

export interface FolderState {
  folders: Folder[];
  expandedFolders: Set<string>;
}