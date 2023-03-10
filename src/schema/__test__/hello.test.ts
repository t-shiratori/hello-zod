import { ZodError } from 'zod';
import { helloSchema } from '../hello/index';

describe('helloSchema', () => {
  test('parse success', () => {
    const parsed = helloSchema.safeParse('hello');
    expect(parsed.success).toBeTruthy();
    expect((parsed as any).data).toBe('hello');
  });
  test('parse fail ', () => {
    const parsed = helloSchema.safeParse(1);
    expect(parsed.success).toBeFalsy();
    expect((parsed as any).error).toBeInstanceOf(ZodError);
  });
});
