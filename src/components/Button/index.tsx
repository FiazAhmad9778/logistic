import { FCC } from '@/helpers/FCC';
import { classNames } from '@/helpers/classNames';
import { BeatLoader } from 'react-spinners';

type buttonDefaultProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type buttonTypes =
  | 'btn-primary'
  | 'btn-secondary'
  | 'btn-success'
  | 'btn-warning'
  | 'btn-danger'
  | 'btn-outline-primary'
  | 'btn-outline-secondary'
  | 'btn-outline-success'
  | 'btn-outline-warning'
  | 'btn-outline-danger';
type buttonSize = 'btn-sm' | 'btn-lg';
interface IProps extends buttonDefaultProps {
  icon?: React.ReactNode;
  suffix?: string | React.ReactNode;
  btnType?: buttonTypes;
  btnSize?: buttonSize;
  isLoading?: boolean;
  className?: string;
  loading?: boolean;
  loaderSize?: number;
}

const Button: FCC<IProps> = ({
  icon,
  btnType = 'btn-primary',
  btnSize,
  className,
  loading,
  loaderSize = 12,
  children,
  ...rest
}) => {
  return (
    <button className={classNames('btn px-4', btnType, btnSize, className)} {...rest}>
      <span className={classNames('d-flex justify-content-center align-items-center gap-2', icon && '')}>
        {icon && <span>{icon}</span>}
        {children}
        {loading && (
          <BeatLoader
            color="#fff"
            loading={loading}
            size={loaderSize}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </span>
    </button>
  );
};

export default Button;
