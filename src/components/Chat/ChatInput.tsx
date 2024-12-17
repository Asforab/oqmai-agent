import React from 'react';
import { Send, Paperclip } from 'lucide-react';
import { ChatInputProps } from '../../types/chat';

export function ChatInput({ message, setMessage, onSubmit }: ChatInputProps) {
  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <form onSubmit={onSubmit} className="relative">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Envie uma mensagem..."
                className="w-full h-[48px] bg-[#1A1A1A] text-white rounded-lg pl-[48px] pr-4 focus:outline-none focus:ring-2 focus:ring-[#D35400]"
              />
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080] hover:text-[#D35400] transition-colors"
              >
                <Paperclip className="w-5 h-5" />
              </button>
            </div>

            <button
              type="submit"
              className="h-[48px] w-[48px] bg-[#D35400] hover:brightness-110 transition-all duration-200 rounded-md flex items-center justify-center"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </form>

        <p className="text-gray-500 text-sm text-center mt-2">
          O OQM.ia pode cometer erros. Considere verificar informações importantes.
        </p>
      </div>
    </div>
  );
}