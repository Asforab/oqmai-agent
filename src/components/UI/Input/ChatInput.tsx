import React from 'react';
import { Send, Paperclip } from 'lucide-react';
import { ChatInputProps } from '../../../types/chat';
import { IconButton } from '../Button/IconButton';

export function ChatInput({ message, setMessage, onSubmit }: ChatInputProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#141414] p-4">
      <form onSubmit={onSubmit} className="relative max-w-[800px] mx-auto">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Envie uma mensagem..."
              className="w-full h-[48px] bg-[#1A1A1A] text-white rounded-lg pl-[48px] pr-4 focus:outline-none focus:ring-2 focus:ring-[#D35400]"
              style={{ fontSize: '14px' }}
            />
            <IconButton
              icon={Paperclip}
              onClick={() => {}}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808080] hover:text-[#D35400]"
              aria-label="Anexar arquivo"
            />
          </div>

          <button
            type="submit"
            className="h-[48px] w-[48px] bg-[#D35400] hover:brightness-110 transition-all duration-200 rounded-md flex items-center justify-center"
            aria-label="Enviar mensagem"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </form>

      <p className="text-gray-500 text-sm text-center mt-2 max-w-[800px] mx-auto">
        O OQM.ia pode cometer erros. Considere verificar informações importantes.
      </p>
    </div>
  );
}