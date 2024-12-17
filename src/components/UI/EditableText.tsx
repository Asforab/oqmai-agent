import React, { useState, useRef, useEffect } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  onClick?: () => void;
  className?: string;
}

export function EditableText({
  value,
  onChange,
  onClick,
  className = '',
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useClickOutside(containerRef, () => {
    if (isEditing) {
      handleSubmit();
    }
  });

  const handleSubmit = () => {
    setIsEditing(false);
    if (editValue.trim() !== value) {
      onChange(editValue);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditing && onClick) {
      onClick();
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (isEditing) {
    return (
      <div ref={containerRef} className={className}>
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            } else if (e.key === 'Escape') {
              setIsEditing(false);
              setEditValue(value);
            }
          }}
          className="w-full bg-[#1f1f1f] text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {value}
    </div>
  );
}