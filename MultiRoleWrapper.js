import React from 'react';
import RoleGuard from './RoleGuard'; // Make sure path is correct
import DriverHome from './DriverHome'; // Or your target screen

const MultiRoleWrapper = () => {
  return (
    <RoleGuard allowedRoles={['driver', 'admin']}>
      <DriverHome />
    </RoleGuard>
  );
};

export default MultiRoleWrapper;
