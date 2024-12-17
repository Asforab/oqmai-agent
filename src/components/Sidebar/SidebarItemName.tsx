import React, { useState } from 'react';

interface SidebarItemNameProps {
  initialName: string;
  onRename: (newName: string) => void;
}

export function SidebarItemName({ initialName, onRename }: SidebarItemNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    onRename(name);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="flex-1">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleSubmit}
          autoFocus
          className="w-full bg-[#1f1f1f] text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </form>
    );
  }

  return (
    <span 
      className="truncate text-sm" 
      onDoubleClick={() => setIsEditing(true)}
    >
      {name}
    </span>
  );
}