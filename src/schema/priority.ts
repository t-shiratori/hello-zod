import { z } from 'zod';

/**
 * グローバルマップのカスタマイズ
 */
const errorMap: z.ZodErrorMap = (error, ctx) => {
  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      if (error.expected === 'string') {
        return { message: `Global error map` };
      }
      break;
  }
  return { message: ctx.defaultError };
};
z.setErrorMap(errorMap);

export const FormData = z.object({
  name: z.string({
    /**
     * 定義時にエラーマップをカスタマイズ
     */
    errorMap: (error, ctx) => {
      switch (error.code) {
        case z.ZodIssueCode.invalid_type:
          if (error.expected === 'string') {
            return { message: `Schema-bound error map` };
          }
          break;
      }
      return { message: ctx.defaultError };
    },
  }),
  contactInfo: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
  }),
});
