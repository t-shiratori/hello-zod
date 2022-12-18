import { z } from 'zod';

export const arrayRefineSchema = z
  .array(z.string())
  .refine((val) => val.length <= 3, {
    message: 'Too many items 😡',
  })
  .refine((val) => val.length == new Set(val).size, {
    message: `No duplicates allowed.`,
  });
