import React from 'react';
import RoleGuard from './RoleGuard'; // Make sure the path is correct
import RiderHome from './RiderHome'; // Your actual Rider screen

import RiderScreenWrapper from './RiderScreenWrapper';

// inside your navigator
<Stack.Screen
  name="RiderHome"
  component={RiderScreenWrapper}
/>

const RiderScreenWrapper = () => {
  return (
    <RoleGuard allowedRoles={['rider']}>
      <RiderHome />
    </RoleGuard>
  );
};

export default RiderScreenWrapper;
