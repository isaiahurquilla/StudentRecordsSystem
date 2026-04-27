import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';

export default function StudentCard({ student, onDelete, onEdit }) {
  function confirmDelete() {
    Alert.alert(
      'Delete Student',
      `Are you sure you want to delete ${student.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => onDelete(student.id) },
      ]
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{student.name}</Text>
      <Text>Student ID: {student.studentId}</Text>
      <Text>Major: {student.major}</Text>
      <Text>GPA: {student.gpa}</Text>
      <Text>Standing: {student.academicStanding}</Text>
      <Text>Load: {student.enrollmentLoad}</Text>
      <Text>Hold: {student.registrationHold ? 'Yes' : 'No'}</Text>
      <Text>Risk: {student.riskLevel}</Text>

      <View style={styles.actions}>
        <Pressable style={styles.editButton} onPress={() => onEdit(student)}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>

        <Pressable style={styles.deleteButton} onPress={confirmDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#f0ad4e',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});