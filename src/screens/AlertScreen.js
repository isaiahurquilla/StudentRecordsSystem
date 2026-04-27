import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useStudents } from '../context/StudentContext';
import { getComputedStudent } from '../utils/studentLogic';

export default function AlertScreen() {
  const { state } = useStudents();

  const students = state.students.map(getComputedStudent);

  const holdStudents = students.filter((student) => student.registrationHold);
  const academicRiskStudents = students.filter(
    (student) =>
      student.academicStanding === 'Probation' ||
      student.academicStanding === 'Dismissal Risk'
  );
  const financialWarningStudents = students.filter(
    (student) => Number(student.unpaidDues) > 0
  );
  const highRiskStudents = students.filter(
    (student) => student.riskLevel === 'High'
  );

  function renderStudentRow(student) {
    return (
      <View key={student.id} style={styles.studentCard}>
        <Text style={styles.name}>{student.name}</Text>
        <Text>Student ID: {student.studentId}</Text>
        <Text>Major: {student.major}</Text>
        <Text>Standing: {student.academicStanding}</Text>
        <Text>Risk: {student.riskLevel}</Text>
        <Text>Hold: {student.registrationHold ? 'Yes' : 'No'}</Text>
        <Text>Unpaid Dues: ${Number(student.unpaidDues).toFixed(2)}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Alerts</Text>
      <Text style={styles.summary}>Total Students: {students.length}</Text>
      <Text style={styles.summary}>Holds: {holdStudents.length}</Text>
      <Text style={styles.summary}>Academic Risk: {academicRiskStudents.length}</Text>
      <Text style={styles.summary}>Financial Warnings: {financialWarningStudents.length}</Text>
      <Text style={styles.summary}>High Risk: {highRiskStudents.length}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Registration Holds</Text>
        {holdStudents.length > 0 ? (
          holdStudents.map(renderStudentRow)
        ) : (
          <Text style={styles.empty}>No students currently on hold.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Academic Risk</Text>
        {academicRiskStudents.length > 0 ? (
          academicRiskStudents.map(renderStudentRow)
        ) : (
          <Text style={styles.empty}>No students currently in academic risk categories.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Financial Warnings</Text>
        {financialWarningStudents.length > 0 ? (
          financialWarningStudents.map(renderStudentRow)
        ) : (
          <Text style={styles.empty}>No students with unpaid dues.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>High Risk Students</Text>
        {highRiskStudents.length > 0 ? (
          highRiskStudents.map(renderStudentRow)
        ) : (
          <Text style={styles.empty}>No students currently marked high risk.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 30,
    backgroundColor: '#f5f7fb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summary: {
    marginBottom: 4,
    fontSize: 14,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  studentCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  empty: {
    color: '#666',
  },
});