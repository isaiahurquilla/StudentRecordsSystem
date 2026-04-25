import { View, Text, StyleSheet } from 'react-native';

export default function StudentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>
      <Text>This is where student records will go.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});