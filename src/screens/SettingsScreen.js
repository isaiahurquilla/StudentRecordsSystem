import { Alert, View, Text, StyleSheet, Platform } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useStudents } from '../context/StudentContext';
import { clearStudentsStorage } from '../utils/storage';

const sampleStudents = [
  {
    id: 's1',
    name: 'Jordan Lee',
    studentId: '1001',
    age: 20,
    gpa: 3.8,
    major: 'Computer Science',
    units: 15,
    graduationYear: 2027,
    unpaidDues: 0,
  },
  {
    id: 's2',
    name: 'Maria Chen',
    studentId: '1002',
    age: 22,
    gpa: 1.7,
    major: 'Economics',
    units: 6,
    graduationYear: 2026,
    unpaidDues: 250,
  },
  {
    id: 's3',
    name: 'David Patel',
    studentId: '1003',
    age: 19,
    gpa: 2.4,
    major: 'Biology',
    units: 12,
    graduationYear: 2028,
    unpaidDues: 0,
  },
  {
    id: 's4',
    name: 'Ariana Brooks',
    studentId: '1004',
    age: 21,
    gpa: 0.9,
    major: 'Mathematics',
    units: 3,
    graduationYear: 2025,
    unpaidDues: 900,
  },
];

export default function SettingsScreen() {
  const { dispatch } = useStudents();

  function handleLoadSampleData() {
    dispatch({ type: 'SET_STUDENTS', payload: sampleStudents });
    Alert.alert('Success', 'Sample data loaded.');
  }

  async function handleClearAllData() {
    dispatch({ type: 'CLEAR_STUDENTS' });
    await clearStudentsStorage();
    Alert.alert('Success', 'All student data cleared.');
  }

  function confirmClearAll() {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('This will remove all saved student records.');
      if (confirmed) {
        handleClearAllData();
      }
      return;
    }

    Alert.alert(
      'Clear All Data',
      'This will remove all saved student records.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: handleClearAllData },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings / Tools</Text>
      <Text style={styles.text}>
        Use these tools to load demo records or clear your saved data.
      </Text>

      <PrimaryButton title="Load Sample Data" onPress={handleLoadSampleData} />
      <PrimaryButton title="Clear All Data" onPress={confirmClearAll} />
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
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
});