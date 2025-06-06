import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function OTPInput({ value, onChange }) {
  const inputs = [];

  const handleChange = (text, index) => {
    if (/^\d?$/.test(text)) { // Only allow single digit numbers or empty
      const newVal = value.split('');
      newVal[index] = text;
      onChange(newVal.join(''));
    }
  };

  for (let i = 0; i < 4; i++) {
    inputs.push(
      <TextInput
        key={i}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={1}
        value={value[i] || ''}
        onChangeText={(text) => handleChange(text, i)}
        autoFocus={i === 0}
      />
    );
  }

  return <View style={styles.container}>{inputs}</View>;
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', width: '60%', alignSelf: 'center' },
  input: {
    borderBottomWidth: 2,
    borderColor: '#f37254',
    width: 50,
    height: 60,
    fontSize: 30,
    textAlign: 'center',
  },
});
