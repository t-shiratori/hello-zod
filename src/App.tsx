import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from './components/InputText';
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
      <InputText
        register={register}
        label={'商品名'}
        fieldName={'itemName'}
        errorMessage={errors.itemName?.message}
      />

      <InputText
        register={register}
        label={'数量'}
        fieldName={'amount'}
        type={'number'}
        errorMessage={errors.amount?.message}
      />

      <InputText
        register={register}
        label={'出品開始日'}
        fieldName={'startDate'}
        type={'date'}
        deps={['startDate', 'endDate']}
        errorMessage={errors.startDate?.message}
      />

      <InputText
        register={register}
        label={'出品終了日'}
        fieldName={'endDate'}
        type={'date'}
        deps={['startDate', 'endDate']}
        errorMessage={errors.endDate?.message}
      />

      <input type="submit" />
    </form>
  );
}

export default App;
