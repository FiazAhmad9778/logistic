import { classNames } from '@/helpers/classNames';
import { ICONS_IMAGES } from '../../../assets/images/icons';

export const OrderIcon: React.FC<{ className: string }> = ({ className }) => {
  return (
    <img
      className={classNames('side-menu__icon rounded-circle bg-primary', className)}
      src={ICONS_IMAGES.ORDER}
      alt="order"
    />
  );
};
