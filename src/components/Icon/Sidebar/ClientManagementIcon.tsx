import { ICONS_IMAGES } from '@/assets/images/icons';
import { classNames } from '@/helpers/classNames';

export const ClientManagementIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <img
      className={classNames('side-menu__icon rounded-circle bg-primary', className)}
      src={ICONS_IMAGES.CLIENTMANAGEMENT}
      alt="Driver"
    />
  );
};
