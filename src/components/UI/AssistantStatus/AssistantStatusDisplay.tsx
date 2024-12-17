import React from 'react';

interface AssistantStatusDisplayProps {
  name: string;
  status: 'online' | 'offline';
  error?: string;
}

export function AssistantStatusDisplay({ name, status, error }: AssistantStatusDisplayProps) {
  return (
    <div 
      className={`p-4 rounded-lg border ${
        status === 'online' 
          ? 'border-green-500 bg-green-900/20' 
          : 'border-red-500 bg-red-900/20'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-white">{name}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'online' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span className={
            status === 'online' ? 'text-green-500' : 'text-red-500'
          }>
            {status === 'online' ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}