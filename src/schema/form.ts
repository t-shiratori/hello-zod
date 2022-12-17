import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Required' })
      .refine((val) => {
        console.log('name val: ', val);
        return val.length > 0;
      }),
    age: z
      .number()
      .min(10)
      .refine((val) => {
        console.log('age val: ', val);
        return val > 0;
      }),
  })
  .refine((args) => {
    console.log('args:', args);
  });

export type TFormSchema = z.infer<typeof formSchema>;
