import { SidebarItem, SidebarState } from '../types/sidebar';

export const createNewItem = (
  type: 'conversation' | 'folder',
  parentId?: string
): SidebarItem => ({
  id: Date.now().toString(),
  type,
  name: type === 'conversation' ? 'Nova Conversa' : 'Nova Pasta',
  parentId,
  createdAt: Date.now(),
});

export const addItemToState = (
  state: SidebarState,
  newItem: SidebarItem
): SidebarState => {
  const { items } = state;
  
  // If it's a root item, add it to the end of root items
  if (!newItem.parentId) {
    const rootItems = items.filter(item => !item.parentId);
    const insertIndex = rootItems.length;
    const newItems = [...items];
    newItems.splice(insertIndex, 0, newItem);
    return { ...state, items: newItems };
  }

  // Check if the conversation is already in the folder
  const isDuplicate = items.some(item => 
    item.parentId === newItem.parentId && 
    item.type === newItem.type &&
    item.name === newItem.name
  );

  if (isDuplicate) {
    return state;
  }

  // Add to specific folder
  const folderItems = items.filter(item => item.parentId === newItem.parentId);
  const lastFolderItemIndex = items.findIndex(item => 
    item.id === folderItems[folderItems.length - 1]?.id
  );
  
  const insertIndex = lastFolderItemIndex === -1 
    ? items.findIndex(item => item.id === newItem.parentId) + 1
    : lastFolderItemIndex + 1;

  const newItems = [...items];
  newItems.splice(insertIndex, 0, newItem);
  return { ...state, items: newItems };
};