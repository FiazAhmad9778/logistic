import React, { HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
}

const TableCheckbox: React.FC<Props> = ({ indeterminate, ...rest }) => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref?.current) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);
  return (
    <span className="d-flex justify-content-center">
      <div className="form-group my-4">
        <div className="form-check">
          <input ref={ref} className="form-check-input" type="checkbox" {...rest} />
        </div>
      </div>
      {/* <input type="checkbox" ref={ref} className={'rounded custom-checkbox cursor-pointer'} {...rest} /> */}
    </span>
  );
};

export default TableCheckbox;
