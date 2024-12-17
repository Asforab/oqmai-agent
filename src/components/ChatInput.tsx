import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({ message, setMessage, onSubmit }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Envie uma mensagem..."
        className="w-full bg-[#1f1f1f] text-white rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-500 p-2 hover:text-orange-600"
      >
        <Send className="w-5 h-5" />
      </button>
    </form>
  );
}