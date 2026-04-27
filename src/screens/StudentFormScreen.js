import { Alert } from 'react-native';
import StudentForm from '../components/StudentForm';
import { useStudents } from '../context/StudentContext';
import { emptyStudent } from '../types/student';

export default function StudentFormScreen({ navigation, route }) {
  const { state, dispatch } = useStudents();
  const editingStudent = route?.params?.student || null;

  function handleSave(formData) {
    const normalizedStudent = {
      ...formData,
      id: editingStudent ? editingStudent.id : Date.now().toString(),
      age: Number(formData.age),
      gpa: Number(formData.gpa),
      units: Number(formData.units),
      graduationYear: Number(formData.graduationYear),
      unpaidDues: Number(formData.unpaidDues),
    };

    if (editingStudent) {
      dispatch({ type: 'UPDATE_STUDENT', payload: normalizedStudent });
      Alert.alert('Success', 'Student record updated successfully.');
    } else {
      dispatch({ type: 'ADD_STUDENT', payload: normalizedStudent });
      Alert.alert('Success', 'Student record added successfully.');
    }

    navigation.goBack();
  }

  return (
    <StudentForm
      initialValues={editingStudent || emptyStudent}
      students={state.students}
      editingId={editingStudent?.id || null}
      onSubmit={handleSave}
    />
  );
}