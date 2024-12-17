import React from 'react';
import { formatTimestamp } from '../../../utils/chat';

interface MessageMetaProps {
  name: string;
  timestamp: number;
}

export function MessageMeta({ name, timestamp }: MessageMetaProps) {
  return (
    <span className="text-sm text-gray-400 mb-1">
      {name} • {formatTimestamp(timestamp)}
    </span>
  );
}