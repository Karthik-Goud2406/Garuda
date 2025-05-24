// src/components/ProtectedRoute.tsx
import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../auth/AuthProvider';
import RouteLoadingIndicator from './Loading/RouteLoadingIndicator'; // Assuming you created this earlier

type Props = {
  allowedRoles: string[];
  children: ReactNode;
};

const ProtectedRoute = ({ allowedRoles, children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <RouteLoadingIndicator />;
  }

  if (!user || !allowedRoles.includes(user.role || '')) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Access Denied. You do not have permission to view this page.</Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

