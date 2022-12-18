import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputItem } from './components/InputItem';
import { formSchema, TFormSchema } from './schema/form';

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormSchema>({
    defaultValues: {
      amount: 0,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: TFormSchema) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputItem
        register={register}
        label={'商品名'}
        fieldName={'itemName'}
        errorMessage={errors.itemName?.message}
      />

      <InputItem
        register={register}
        label={'数量'}
        fieldName={'amount'}
        type={'number'}
        errorMessage={errors.amount?.message}
      />

      <InputItem
        register={register}
        label={'出品開始日'}
        fieldName={'startDate'}
        type={'date'}
        deps={['startDate', 'endDate']}
        errorMessage={errors.startDate?.message}
      />

      <InputItem
        register={register}
        label={'出品終了日'}
        fieldName={'endDate'}
        type={'date'}
        deps={['startDate', 'endDate']}
        errorMessage={errors.endDate?.message}
      />

      <div className="formFooter">
        <input type="submit" />
      </div>
    </form>
  );
}

export default App;
