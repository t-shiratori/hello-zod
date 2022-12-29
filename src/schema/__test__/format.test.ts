import { z, ZodError, ZodIssue } from 'zod';
import { FormData } from '../format';

describe('format', () => {
  test('項目が不正', () => {
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
    console.log('format: ', error.format());
    console.log('flatten: ', error.flatten());

    console.log(
      'flatten2: ',
      error.flatten((issue: ZodIssue) => ({
        message: issue.message,
        errorCode: issue.code,
      }))
    );

    expect(parsed.success).toBeFalsy();
    expect((parsed as any).error).toBeInstanceOf(ZodError);
  });

  test('ルートレベルで不正', () => {
    const sampleData = null;
    const parsed = FormData.safeParse(sampleData);
    const { error } = parsed as any;

    console.log('issues:', (error as any).issues);
    console.log('format: ', error.format());
    console.log('flatten: ', error.flatten());

    expect(parsed.success).toBeFalsy();
    expect((parsed as any).error).toBeInstanceOf(ZodError);
  });
});
