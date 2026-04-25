import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  error,
}) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cfcfcf',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#d9534f',
  },
  error: {
    color: '#d9534f',
    marginTop: 4,
    fontSize: 12,
  },
});