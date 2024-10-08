import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface FormInputProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

const FormInput = ({ name, label, type, placeholder }: FormInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={type === 'password'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#32343E',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});

export default FormInput;