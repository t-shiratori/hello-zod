import { z } from 'zod';

export const FormData = z.object({
  name: z.string(),
  contactInfo: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
  }),
});
