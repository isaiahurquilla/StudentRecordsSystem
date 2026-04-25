import { Alert } from 'react-native';
import StudentForm from '../components/StudentForm';
import { useStudents } from '../context/StudentContext';

export default function StudentFormScreen({ navigation }) {
  const { state, dispatch } = useStudents();

  function handleSave(formData) {
    const newStudent = {
      ...formData,
      id: Date.now().toString(),
      age: Number(formData.age),
      gpa: Number(formData.gpa),
      units: Number(formData.units),
      graduationYear: Number(formData.graduationYear),
      unpaidDues: Number(formData.unpaidDues),
    };

    dispatch({ type: 'ADD_STUDENT', payload: newStudent });
    Alert.alert('Success', 'Student record added successfully.');
    navigation.goBack();
  }

  return (
    <StudentForm
      students={state.students}
      onSubmit={handleSave}
    />
  );
}