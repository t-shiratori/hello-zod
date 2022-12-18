import { ChangeEvent, ChangeEventHandler } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { TFormSchema } from '../../schema/form';

type Props = {
  register: UseFormRegister<TFormSchema>;
  label: string;
  fieldName: keyof TFormSchema;
  errorMessage?: string;
  type?: 'text' | 'number' | 'date';
  handleChange?: (e: ChangeEvent) => void;
  deps?: string[];
};

export const InputItem = ({
  register,
  label,
  fieldName,
  errorMessage,
  type = 'text',
  handleChange,
  deps,
}: Props) => {
  return (
    <div className="inputItem">
      <label htmlFor={fieldName}>{label}</label>
      <div className="inputWrapper">
        <input
          {...register(fieldName, {
            valueAsNumber: type === 'number',
            onChange: (e) => {
              handleChange?.(e);
            },
            deps,
          })}
          type={type}
          id={fieldName}
          name={fieldName}
        ></input>
        <p className="error">{errorMessage}</p>
      </div>
    </div>
  );
};
