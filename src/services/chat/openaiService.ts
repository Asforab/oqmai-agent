import { openai } from '../../config/openai';
import { Message } from '../../types/chat';
import { OPENAI_CONFIG, CHAT_CONFIG } from '../../config/constants';
import { formatMessagesForAPI } from './utils';

export class OpenAIChatService {
  async generateResponse(messages: Message[]): Promise<string> {
    try {
      const formattedMessages = formatMessagesForAPI(messages);
      
      const completion = await openai.chat.completions.create({
        model: OPENAI_CONFIG.MODEL,
        messages: [
          {
            role: "system",
            content: CHAT_CONFIG.SYSTEM_PROMPT
          },
          ...formattedMessages
        ],
        temperature: CHAT_CONFIG.TEMPERATURE,
        max_tokens: CHAT_CONFIG.MAX_TOKENS,
      });

      const responseText = completion.choices[0]?.message?.content;
      
      if (!responseText) {
        throw new Error('Resposta vazia do serviço');
      }

      return responseText;
    } catch (error) {
      console.error('Error generating response:', error);
      throw new Error('Falha ao gerar resposta. Por favor, tente novamente.');
    }
  }
}