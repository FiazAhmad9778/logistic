import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type CheckboxItemProps = Omit<InputProps, 'id' | 'type'>;

export interface CheckboxProps extends CheckboxItemProps {
  id?: string;
  label?: string | JSX.Element;
  name: string;
  error?: string;
  title?: string;
  checked?: boolean | undefined;
  description?: string;
}

const FormCheckbox: React.FC<CheckboxProps> = ({ id, label, name, ...rest }) => {
  const { register } = useFormContext();

  if (!name) {
    return null;
  }

  const { ref, ...reg } = register(name);

  return (
    <fieldset className="my-2">
      <FormGroup className="form-group mb-0 justify-content-end">
        <div className="d-flex align-items-center">
          <div className="checkbox">
            <div className="custom-checkbox custom-control">
              <input
                ref={ref}
                id={id || name}
                aria-describedby={`${label}-description`}
                type="checkbox"
                className="custom-control-input"
                {...rest}
                {...reg}
              />
              <Form.Label htmlFor={id || name} className="custom-control-label tx-12 mt-1">
                {label}
              </Form.Label>
            </div>
          </div>
        </div>
      </FormGroup>
    </fieldset>
  );
};

export default FormCheckbox;
