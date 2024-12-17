import React from 'react';

export function MessageStatus() {
  return (
    <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
        Enviado
      </span>
      <span>•</span>
      <span>Lido</span>
    </div>
  );
}