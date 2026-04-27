import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useStudents } from '../context/StudentContext';
import { getAnalytics } from '../utils/analytics';

export default function AnalyticScreen() {
  const { state } = useStudents();
  const analytics = getAnalytics(state.students);

  const standingEntries = Object.entries(analytics.standingDistribution);
  const majorEntries = Object.entries(analytics.studentsByMajor);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Analytics</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>System Summary</Text>
        <Text>Total Students: {analytics.totalStudents}</Text>
        <Text>Average GPA: {analytics.averageGpa.toFixed(2)}</Text>
        <Text>Students With Holds: {analytics.holdCount}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Highest Performing Student</Text>
        {analytics.highestPerformingStudent ? (
          <>
            <Text>Name: {analytics.highestPerformingStudent.name}</Text>
            <Text>
              GPA: {Number(analytics.highestPerformingStudent.gpa).toFixed(2)}
            </Text>
            <Text>Major: {analytics.highestPerformingStudent.major}</Text>
            <Text>
              Standing: {analytics.highestPerformingStudent.academicStanding}
            </Text>
          </>
        ) : (
          <Text>No student data available.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Distribution by Standing</Text>
        {standingEntries.length > 0 ? (
          standingEntries.map(([standing, count]) => (
            <Text key={standing}>
              {standing}: {count}
            </Text>
          ))
        ) : (
          <Text>No standing data available.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Grouped Metric by Major</Text>
        {majorEntries.length > 0 ? (
          majorEntries.map(([major, info]) => (
            <View key={major} style={styles.groupRow}>
              <Text style={styles.groupMajor}>{major}</Text>
              <Text>Students: {info.count}</Text>
              <Text>Average GPA: {info.averageGpa.toFixed(2)}</Text>
            </View>
          ))
        ) : (
          <Text>No major data available.</Text>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  groupRow: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  groupMajor: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});