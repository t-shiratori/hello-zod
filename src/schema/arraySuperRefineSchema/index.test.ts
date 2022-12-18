import { z, ZodError } from 'zod';
import { arraySuperRefineSchema } from './index';

describe('arraySuperRefineSchema', () => {
  describe('success case', () => {
    test('all string, 3 length', () => {
      const array = ['a', 'b', 'c'];
      const parsed = arraySuperRefineSchema.safeParse(array);
      expect(parsed.success).toBeTruthy();
    });
  });

  describe('error case', () => {
    test('all not string', () => {
      const array = [1, 2, 3];
      const parsed = arraySuperRefineSchema.safeParse(array);
      expect(parsed.success).toBeFalsy();
      expect((parsed as any).error).toBeInstanceOf(ZodError);
      const { error } = parsed as any;
      console.log((error as ZodError).issues);
      /**
        console.log
          [
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'number',
              path: [ 0 ],
              message: 'Expected string, received number'
            },
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'number',
              path: [ 1 ],
              message: 'Expected string, received number'
            },
            {
              code: 'invalid_type',
              expected: 'string',
              received: 'number',
              path: [ 2 ],
              message: 'Expected string, received number'
            }
          ]
       */
      expect((parsed as any).error.issues.length).toEqual(3);
    });

    test('one is not string', () => {
      const array = [1, '2', '3'];
      const parsed = arraySuperRefineSchema.safeParse(array);
      expect(parsed.success).toBeFalsy();
      expect((parsed as any).error).toBeInstanceOf(ZodError);
      const { error } = parsed as any;
      console.log((error as ZodError).issues);
      /**
       console.log
        [
          {
            code: 'invalid_type',
            expected: 'string',
            received: 'number',
            path: [ 0 ],
            message: 'Expected string, received number'
          }
        ]
       */
      expect((parsed as any).error.issues.length).toEqual(1);
    });

    test('invalid length', () => {
      const array = ['a', 'b', 'c', 'd'];
      const parsed = arraySuperRefineSchema.safeParse(array);
      expect(parsed.success).toBeFalsy();
      expect((parsed as any).error).toBeInstanceOf(ZodError);
      const { error } = parsed as any;
      console.log((error as ZodError).issues);
      /**
        console.log
          [
            {
              code: 'too_big',
              maximum: 3,
              type: 'array',
              inclusive: true,
              message: 'Too many items 😡',
              path: []
            }
          ]
       */
      expect((parsed as any).error.issues.length).toEqual(1);
    });

    test('has duplicates', () => {
      const array = ['a', 'a', 'c', 'd'];
      const parsed = arraySuperRefineSchema.safeParse(array);
      expect(parsed.success).toBeFalsy();
      expect((parsed as any).error).toBeInstanceOf(ZodError);
      const { error } = parsed as any;
      console.log((error as ZodError).issues);
      /**
       console.log
        [
          {
            code: 'too_big',
            maximum: 3,
            type: 'array',
            inclusive: true,
            message: 'Too many items 😡',
            path: []
          },
          { code: 'custom', message: 'No duplicates allowed.', path: [] }
        ]
       */
      expect((parsed as any).error.issues.length).toEqual(2);
    });
  });
});
