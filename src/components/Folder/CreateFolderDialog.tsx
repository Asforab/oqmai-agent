import React, { useState } from 'react';
import { Folder } from '../../types/folder';

interface CreateFolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFolderCreated: (folder: Folder) => void;
}

export function CreateFolderDialog({ isOpen, onClose, onFolderCreated }: CreateFolderDialogProps) {
  const [folderName, setFolderName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    const newFolder: Folder = {
      id: Date.now().toString(),
      name: folderName.trim(),
      createdAt: Date.now()
    };

    onFolderCreated(newFolder);
    setFolderName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#1f1f1f] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-4">Nova Pasta</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Nome da pasta"
            className="w-full bg-[#2a2a2a] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
            autoFocus
          />
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!folderName.trim()}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}