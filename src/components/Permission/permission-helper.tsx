import { useAppSelector } from '@/infrastructure/store/store-hooks';
import React from 'react';

interface PermissionWrapperProps {
  requiredClaims: string[];
  children: React.ReactNode;
}

const PermissionWrapper: React.FC<PermissionWrapperProps> = ({ requiredClaims, children }) => {
  const { claims } = useAppSelector((state) => state.auth);

  if (requiredClaims.length > 0) {
    const hasPermission = requiredClaims.some((claim) => claims.includes(claim));

    if (!hasPermission) {
      return null;
    }
  }

  return <>{children}</>;
};

export default PermissionWrapper;
