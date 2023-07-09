import { FCC } from '@/helpers/FCC';
import { FormProvider, FieldValues, UseFormReturn } from 'react-hook-form';
import FormInput from './FormInput';
import { FormSelect } from './FormSelect';
import FormCheckbox from './FormCheckbox';
import FormTextarea from './FormTextarea';

interface IFormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  name?: string;
  onSubmit: (e: FieldValues) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFormReturn: UseFormReturn<any, object>;
}

const Form: FCC<IFormProps> = ({ name, onSubmit, useFormReturn, children }) => {
  const { handleSubmit } = useFormReturn;
  return (
    <FormProvider {...useFormReturn}>
      <form name={name} onSubmit={handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Object.assign(Form, {
  Input: FormInput,
  Select: FormSelect,
  Checkbox: FormCheckbox,
  Textarea: FormTextarea,
});
