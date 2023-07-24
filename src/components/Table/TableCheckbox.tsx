import React, { HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
}

const TableCheckbox: React.FC<Props> = ({ indeterminate, disabled, ...rest }) => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref?.current) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);
  return (
    <span className="d-flex justify-content-center">
      <input
        type="checkbox"
        ref={ref}
        className={`rounded custom-checkbox ${!disabled && 'cursor-pointer'}`}
        disabled={disabled}
        {...rest}
      />
    </span>
  );
};

export default TableCheckbox;
