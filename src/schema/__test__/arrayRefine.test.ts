import { ZodError } from 'zod';
import { arrayRefineSchema } from '../arrayRefineSchema';
import { arraySuperRefineSchema } from '../arraySuperRefineSchema';

describe.each`
  schema                    | schemaName
  ${arrayRefineSchema}      | ${'arrayRefineSchema'}
  ${arraySuperRefineSchema} | ${'arraySuperRefineSchema'}
`('$schemaName', ({ schema }) => {
  const currentSchema = schema;

  describe('success case', () => {
    test('all string, 3 length', () => {
      const array = ['a', 'b', 'c'];
      const parsed = currentSchema.safeParse(array);
      expect(parsed.success).toBeTruthy();
    });
  });

  describe('error case', () => {
    test('all not string', () => {
      const array = [1, 2, 3];
      const parsed = currentSchema.safeParse(array);
      expect(parsed.success).toBeFalsy();
      const { error } = parsed as any;
      expect(error).toBeInstanceOf(ZodError);
      expect(error.issues.length).toEqual(3);
    });

    test('one is not string', () => {
      const array = [1, '2', '3'];
      const parsed = currentSchema.safeParse(array);
      expect(parsed.success).toBeFalsy();
      const { error } = parsed as any;
      expect(error).toBeInstanceOf(ZodError);
      expect(error.issues.length).toEqual(1);
    });

    test('invalid length', () => {
      const array = ['a', 'b', 'c', 'd'];
      const parsed = currentSchema.safeParse(array);
      expect(parsed.success).toBeFalsy();
      const { error } = parsed as any;
      expect(error).toBeInstanceOf(ZodError);
      expect(error.issues.length).toEqual(1);
    });

    test('has duplicates', () => {
      const array = ['a', 'a', 'c', 'd'];
      const parsed = currentSchema.safeParse(array);
      expect(parsed.success).toBeFalsy();
      const { error } = parsed as any;
      expect(error).toBeInstanceOf(ZodError);
      expect(error.issues.length).toEqual(2);
    });
  });
});
