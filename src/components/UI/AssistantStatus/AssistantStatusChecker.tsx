import React, { useEffect, useState } from 'react';
import { openAIService } from '../../../services/openai';
import { AssistantStatusDisplay } from './AssistantStatusDisplay';

interface AssistantStatus {
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
      const results = await openAIService.checkAssistantsStatus();
      
      setStatuses(Object.entries(results).map(([name, isOnline]) => ({
        name,
        status: isOnline ? 'online' : 'offline'
      })));
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
          <AssistantStatusDisplay
            key={status.name}
            name={status.name}
            status={status.status}
            error={status.error}
          />
        ))}
      </div>
    </div>
  );
}