import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import StudentCard from '../components/StudentCard';
import StudentControls from '../components/StudentControls';
import { useStudents } from '../context/StudentContext';
import { getComputedStudent } from '../utils/studentLogic';

export default function StudentScreen({ navigation }) {
  const { state, dispatch } = useStudents();

  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterRisk, setFilterRisk] = useState('All');
  const [filterHold, setFilterHold] = useState('All');

  const students = useMemo(() => {
    return state.students
      .map(getComputedStudent)
      .filter((student) => {
        const query = searchText.toLowerCase().trim();

        const matchesSearch =
          student.name.toLowerCase().includes(query) ||
          student.studentId.toLowerCase().includes(query) ||
          student.major.toLowerCase().includes(query);

        const matchesRisk =
          filterRisk === 'All' ? true : student.riskLevel === filterRisk;

        const matchesHold =
          filterHold === 'All'
            ? true
            : filterHold === 'Yes'
            ? student.registrationHold
            : !student.registrationHold;

        return matchesSearch && matchesRisk && matchesHold;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }

        if (sortBy === 'gpa') {
          return b.gpa - a.gpa;
        }

        if (sortBy === 'graduationYear') {
          return a.graduationYear - b.graduationYear;
        }

        return 0;
      });
  }, [state.students, searchText, sortBy, filterRisk, filterHold]);

  function handleDelete(id) {
    dispatch({ type: 'DELETE_STUDENT', payload: id });
  }

  function handleEdit(student) {
    navigation.navigate('StudentForm', { student });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students</Text>

      <PrimaryButton
        title="Add Student"
        onPress={() => navigation.navigate('StudentForm')}
      />

      <StudentControls
        searchText={searchText}
        onChangeSearch={setSearchText}
        sortBy={sortBy}
        onChangeSort={setSortBy}
        filterRisk={filterRisk}
        onChangeFilterRisk={setFilterRisk}
        filterHold={filterHold}
        onChangeFilterHold={setFilterHold}
      />

      {students.length === 0 ? (
        <Text style={styles.empty}>No matching students found.</Text>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <StudentCard
              student={item}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
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
    paddingTop: 8,
    paddingBottom: 20,
  },
});