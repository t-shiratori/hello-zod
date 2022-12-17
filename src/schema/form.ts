import { z } from 'zod';
import * as dayjs from 'dayjs';

export const formSchema = z
  .object({
    itemName: z.string().min(1, { message: '商品名は必須です' }),
    amount: z
      .number({
        invalid_type_error: '数値を入力してください',
        required_error: '数量を記入してください',
      })
      .min(0, { message: '数量を記入してください' })
      .max(100, { message: '100個までにしてください' }),
    startDate: z.string().refine(
      (val) => {
        return val.length > 0;
      },
      { message: '日付を入力してください' }
    ),
    endDate: z.string().refine(
      (val) => {
        return val.length > 0;
      },
      { message: '日付を入力してください' }
    ),
  })
  .refine(
    (args) => {
      const { startDate, endDate } = args;
      const startDateObject = dayjs(startDate);
      const endDateObject = dayjs(endDate);
      // 開始日が終了日より前かどうか
      return startDateObject.isBefore(endDateObject);
    },
    {
      message: '開始日は終了日の前にしてください',
      path: ['startDate'],
    }
  );

export type TFormSchema = z.infer<typeof formSchema>;
