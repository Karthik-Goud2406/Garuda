// src/utils/auth.js

export const isUserAuthenticated = (user) => {
  return user && typeof user.uid === 'string';
};
