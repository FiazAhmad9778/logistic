import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { FCC } from '@/helpers/FCC';
import { useFormContext } from 'react-hook-form';
import { classNames } from '@/helpers/classNames';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  type?: HTMLInputTypeAttribute | undefined;
  leading?: string | undefined | JSX.Element;
  trailing?: string | undefined | JSX.Element;
  name: string;
  label?: string;
  min?: string;
  className?: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  caption?: string;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: FCC<InputProps> = ({
  label,
  name,
  min,
  leading,
  defaultValue,
  className,
  placeholder,
  disabled,
  ...rest
}) => {
  const {
    getValues,
    formState: { errors },
    register,
  } = useFormContext();
  const { ref, ...reg } = register(name);

  return (
    <div className="form-group mb-2">
      {label && (
        <div>
          <label className="form-label tx-12 tx-gray-600" htmlFor={name}>
            {label}
          </label>
        </div>
      )}
      <div className="position-relative w-100">
        {leading && <span className="input-leading">{leading}</span>}
        <input
          ref={ref}
          id={name}
          min={min}
          defaultValue={defaultValue ? defaultValue : getValues(name)}
          className={classNames(
            'input-control tx-12',
            leading && 'pd-l-30',
            errors[name]?.message && 'border-danger',
            className,
          )}
          disabled={disabled}
          placeholder={placeholder}
          {...rest}
          {...reg}
        />
      </div>
      {errors && <span className="text-danger tx-12">{errors[name]?.message?.toString()}</span>}
    </div>
  );
};

export default FormInput;
