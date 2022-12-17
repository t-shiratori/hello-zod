import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from './components/InputText';
import { formSchema, TFormSchema } from './schema/form';

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: TFormSchema) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        register={register}
        label={'name'}
        fieldName={'name'}
        errorMessage={errors.name?.message}
      />

      <InputText
        register={register}
        label={'age'}
        fieldName={'age'}
        type={'number'}
        errorMessage={errors.age?.message}
      />

      <input type="submit" />
    </form>
  );
}

export default App;
