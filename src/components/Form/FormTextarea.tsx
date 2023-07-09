import { classNames } from '@/helpers/classNames';
import React, { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

interface ITextareaProps
  extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  leading?: string | undefined | JSX.Element;
  trailing?: string | undefined | JSX.Element;
  name: string;
  label?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  caption?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}
const FormTextarea: React.FC<ITextareaProps> = ({
  label,
  name,
  rows,
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
        <textarea
          ref={ref}
          rows={rows}
          defaultValue={defaultValue ? defaultValue : getValues(name)}
          className={classNames(
            'textarea-control tx-12 ',
            leading ? 'pd-l-30' : '',
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

export default FormTextarea;
