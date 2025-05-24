import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from 'firebase/app';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const PhoneAuthScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal | null>(null);

  // Send OTP to the phone number
  const sendVerification = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a valid phone number!');
      return;
    }

    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const id = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current as any
      );
      setVerificationId(id);
      Alert.alert('OTP sent!');
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  // Confirm the code entered by the user
  const confirmCode = async () => {
    if (!code || !verificationId) {
      Alert.alert('Error', 'Please enter the OTP code!');
      return;
    }

    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, credential);
      Alert.alert('Phone authentication successful! ✅');
    } catch (err: any) {
      Alert.alert('Error', 'Failed to authenticate. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />
      <Text style={styles.title}>Phone Authentication</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Send OTP" onPress={sendVerification} />
      
      {verificationId && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
          />
          <Button title="Verify OTP" onPress={confirmCode} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default PhoneAuthScreen;
