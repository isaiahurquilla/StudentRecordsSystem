import { View, Text, StyleSheet, FlatList } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useStudents } from '../context/StudentContext';
import { getComputedStudent } from '../utils/studentLogic';

export default function StudentScreen({ navigation }) {
  const { state } = useStudents();

  const students = state.students.map(getComputedStudent);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>

      <PrimaryButton
        title="Add Student"
        onPress={() => navigation.navigate('StudentForm')}
      />

      {students.length === 0 ? (
        <Text style={styles.empty}>No students added yet.</Text>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Student ID: {item.studentId}</Text>
              <Text>Major: {item.major}</Text>
              <Text>GPA: {item.gpa}</Text>
              <Text>Standing: {item.academicStanding}</Text>
              <Text>Load: {item.enrollmentLoad}</Text>
              <Text>Hold: {item.registrationHold ? 'Yes' : 'No'}</Text>
              <Text>Risk: {item.riskLevel}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  empty: {
    marginTop: 20,
    fontSize: 16,
  },
  list: {
    paddingTop: 16,
    paddingBottom: 20,
  },
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
});