import { UseFormRegister } from 'react-hook-form';
import { TFormSchema } from '../../schema/form';

type Props = {
  register: UseFormRegister<TFormSchema>;
  label: string;
  fieldName: keyof TFormSchema;
  errorMessage?: string;
  type?: 'text' | 'number' | 'date';
};

export const InputText = ({
  register,
  label,
  fieldName,
  errorMessage,
  type = 'text',
}: Props) => {
  return (
    <div>
      <label htmlFor={fieldName}>{label}</label>
      <input
        {...register(fieldName, { valueAsNumber: type === 'number' })}
        type={type}
        id={fieldName}
        name={fieldName}
      ></input>
      <p className="error">{errorMessage}</p>
    </div>
  );
};
