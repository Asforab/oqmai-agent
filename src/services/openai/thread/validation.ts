import { z } from 'zod';
import { ThreadMessage } from '../types/thread';

const threadMessageSchema = z.object({
  id: z.string().min(1),
  role: z.enum(['user', 'assistant']),
  content: z.array(z.string()),
  createdAt: z.number()
});

export function validateThreadMessage(message: ThreadMessage) {
  try {
    threadMessageSchema.parse(message);
  } catch (error) {
    console.error('Invalid thread message:', error);
    throw new Error('Invalid thread message');
  }
}