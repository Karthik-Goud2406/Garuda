import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';

export default function SupportScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Support & FAQs</Text>
      
      <Text style={styles.faqQuestion}>Q: How do I book a ride?</Text>
      <Text style={styles.faqAnswer}>A: Go to Destination screen, pick your location and confirm.</Text>

      <Text style={styles.faqQuestion}>Q: Payment methods?</Text>
      <Text style={styles.faqAnswer}>A: We support online payment via Razorpay and Cash.</Text>

      <TouchableOpacity onPress={() => Linking.openURL('mailto:support@garudataxi.com')}>
        <Text style={styles.contact}>Contact Support: support@garudataxi.com</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, marginBottom: 20, textAlign: 'center' },
  faqQuestion: { fontWeight: 'bold', fontSize: 18, marginTop: 15 },
  faqAnswer: { fontSize: 16, marginTop: 5 },
  contact: { marginTop: 30, color: 'blue', textAlign: 'center', textDecorationLine: 'underline' }
});
