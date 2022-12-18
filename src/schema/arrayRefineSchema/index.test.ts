import { ZodError } from 'zod';
import { arrayRefineSchema } from './index';

describe('arrayRefineSchema', () => {
  describe('success case', () => {
    test('all string, 3 length', () => {
      const array = ['a', 'b', 'c'];
      const parsed = arrayRefineSchema.safeParse(array);
      expect(parsed.success).toBeTruthy();
    });
  });

  describe('error case', () => {
    test('all not string', () => {
      const array = [1, 2, 3];
      const parsed = arrayRefineSchema.safeParse(array);
      expect(parsed.success).toBeFalsy();
      const { error } = parsed as any;
      expect(error).toBeInstanceOf(ZodError);
      expect(error.issues.length).toEqual(3);
      console.log(error.issues);
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
    });

    test('one is not string', () => {
      const array = [1, '2', '3'];
      const parsed = arrayRefineSchema.safeParse(array);
      expect(parsed.success).toBeFalsy();
      const { error } = parsed as any;
      expect(error).toBeInstanceOf(ZodError);
      expect(error.issues.length).toEqual(1);
      console.log(error.issues);
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
    });

    test('invalid length', () => {
      const array = ['a', 'b', 'c', 'd'];
      const parsed = arrayRefineSchema.safeParse(array);
      expect(parsed.success).toBeFalsy();
      const { error } = parsed as any;
      expect(error).toBeInstanceOf(ZodError);
      expect(error.issues.length).toEqual(1);
      console.log(error.issues);
      /**
        console.log
          [
            {
              code: 'custom',
              message: 'Too many items 😡',
              params: { additionalParam: 'tooBig' },
              path: []
            }
          ]
       */
    });

    test('has duplicates', () => {
      const array = ['a', 'a', 'c', 'd'];
      const parsed = arrayRefineSchema.safeParse(array);
      expect(parsed.success).toBeFalsy();
      const { error } = parsed as any;
      expect(error).toBeInstanceOf(ZodError);
      expect(error.issues.length).toEqual(2);
      console.log(error.issues);
      /**
       console.log
        [
          {
            code: 'custom',
            message: 'Too many items 😡',
            params: { additionalParam: 'tooBig' },
            path: []
          },
          {
            code: 'custom',
            message: 'No duplicates allowed.',
            params: { additionalParam: 'duplicates' },
            path: []
          }
        ]
       */
    });
  });
});
