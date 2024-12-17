import React, { useEffect, useState } from 'react';
import { openai } from '../client/OpenAIClient';
import { ASSISTANT_CONFIG } from '../config/constants';

interface AssistantStatus {
  id: string;
  name: string;
  status: 'online' | 'offline';
  error?: string;
}

export function AssistantStatusChecker() {
  const [statuses, setStatuses] = useState<AssistantStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAssistants();
  }, []);

  const checkAssistants = async () => {
    try {
      const results: AssistantStatus[] = [];

      for (const [name, config] of Object.entries(ASSISTANT_CONFIG)) {
        try {
          const assistant = await openai.beta.assistants.retrieve(config.ID);
          results.push({
            id: assistant.id,
            name,
            status: 'online'
          });
        } catch (err) {
          results.push({
            id: config.ID,
            name,
            status: 'offline',
            error: err instanceof Error ? err.message : 'Unknown error'
          });
        }
      }

      setStatuses(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check assistants');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse flex space-x-2 items-center">
          <div className="h-4 w-4 bg-orange-500 rounded-full"></div>
          <div className="h-4 w-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold text-white mb-4">Assistant Status</h2>
      
      <div className="grid gap-4">
        {statuses.map((status) => (
          <div 
            key={status.id}
            className={`p-4 rounded-lg border ${
              status.status === 'online' 
                ? 'border-green-500 bg-green-900/20' 
                : 'border-red-500 bg-red-900/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">{status.name}</h3>
                <p className="text-sm text-gray-400">ID: {status.id}</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  status.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={
                  status.status === 'online' ? 'text-green-500' : 'text-red-500'
                }>
                  {status.status === 'online' ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            {status.error && (
              <p className="mt-2 text-sm text-red-400">{status.error}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}