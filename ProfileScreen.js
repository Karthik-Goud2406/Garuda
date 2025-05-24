import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {/* Add edit profile form, document uploads here */}
      <Button title="Edit Profile (coming soon)" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center' },
  title: { fontSize: 24, marginBottom: 20 }
});
