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
      // 終了日が開始日より未来かどうか
      return endDateObject.isAfter(startDateObject);
    },
    {
      message: '終了日は開始日より未来の日付にしてください',
      path: ['endDate'],
    }
  );

export type TFormSchema = z.infer<typeof formSchema>;
