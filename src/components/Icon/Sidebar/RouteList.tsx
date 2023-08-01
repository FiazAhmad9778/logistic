import { ICONS_IMAGES } from '@/assets/images/icons';
import { classNames } from '@/helpers/classNames';

export const RouteList: React.FC<{ className: string }> = ({ className }) => {
  return (
    <img
      className={classNames('side-menu__icon rounded-circle bg-primary', className)}
      src={ICONS_IMAGES.ROUTELIST}
      alt="Driver"
    />
  );
};
