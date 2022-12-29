import { z, ZodError, ZodIssue } from 'zod';
import { FormData } from '../priority';

describe('priority', () => {
  test('Schema-bound error map', () => {
    const sampleData = {
      name: null,
      contactInfo: {
        email: 'not an email',
        phone: '867-5309',
      },
    };

    const parsed = FormData.safeParse(sampleData);
    const { error } = parsed as any;

    console.log('issues:', (error as any).issues);

    expect(parsed.success).toBeFalsy();
    expect((parsed as any).error).toBeInstanceOf(ZodError);
  });

  test('Contextual error map', () => {
    const sampleData = {
      name: null,
      contactInfo: {
        email: 'not an email',
        phone: '867-5309',
      },
    };

    const parsed = FormData.safeParse(sampleData, {
      /**
       * 実行時にエラーマップをカスタマイズ
       */
      errorMap: (error, ctx) => {
        console.log({ error, ctx });
        switch (error.code) {
          case z.ZodIssueCode.invalid_type:
            if (error.expected === 'string') {
              return { message: `Contextual error map` };
            }
            break;
        }
        return { message: ctx.defaultError };
      },
    });
    const { error } = parsed as any;

    console.log('issues:', (error as any).issues);

    expect(parsed.success).toBeFalsy();
    expect((parsed as any).error).toBeInstanceOf(ZodError);
  });
});
