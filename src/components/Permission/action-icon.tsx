import { useAppSelector } from '@/infrastructure/store/store-hooks';

interface IconButtonProps {
  requiredClaims: string[];
  className: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ requiredClaims, className, onClick }) => {
  const { claims } = useAppSelector((state) => state.auth);

  if (requiredClaims.length > 0) {
    const hasPermission = requiredClaims.some((claim) => claims.includes(claim));

    if (!hasPermission) {
      return null;
    }
  }

  return <i className={className} onClick={onClick} />;
};

export default IconButton;
