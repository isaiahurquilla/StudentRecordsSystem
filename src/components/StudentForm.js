import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import FormInput from './FormInput';
import PrimaryButton from './PrimaryButton';
import { emptyStudent } from '../types/student';
import { validateStudent } from '../utils/validation';

export default function StudentForm({
  initialValues = emptyStudent,
  students = [],
  editingId = null,
  onSubmit,
}) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const liveErrors = useMemo(() => {
    return validateStudent(form, students, editingId);
  }, [form, students, editingId]);

  function updateField(field, value) {
    const updated = { ...form, [field]: value };
    setForm(updated);
    setErrors(validateStudent(updated, students, editingId));
  }

  function handleSubmit() {
    const validationErrors = validateStudent(form, students, editingId);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSubmit(form);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FormInput
        label="Name"
        value={form.name}
        onChangeText={(value) => updateField('name', value)}
        placeholder="Enter full name"
        error={errors.name || liveErrors.name}
      />

      <FormInput
        label="Student ID"
        value={form.studentId}
        onChangeText={(value) => updateField('studentId', value)}
        placeholder="Enter unique student ID"
        error={errors.studentId || liveErrors.studentId}
      />

      <FormInput
        label="Age"
        value={String(form.age)}
        onChangeText={(value) => updateField('age', value)}
        placeholder="Enter age"
        keyboardType="numeric"
        error={errors.age || liveErrors.age}
      />

      <FormInput
        label="GPA"
        value={String(form.gpa)}
        onChangeText={(value) => updateField('gpa', value)}
        placeholder="Enter GPA"
        keyboardType="decimal-pad"
        error={errors.gpa || liveErrors.gpa}
      />

      <FormInput
        label="Major"
        value={form.major}
        onChangeText={(value) => updateField('major', value)}
        placeholder="Enter major"
        error={errors.major || liveErrors.major}
      />

      <FormInput
        label="Units"
        value={String(form.units)}
        onChangeText={(value) => updateField('units', value)}
        placeholder="Enter units"
        keyboardType="numeric"
        error={errors.units || liveErrors.units}
      />

      <FormInput
        label="Graduation Year"
        value={String(form.graduationYear)}
        onChangeText={(value) => updateField('graduationYear', value)}
        placeholder="Enter graduation year"
        keyboardType="numeric"
        error={errors.graduationYear || liveErrors.graduationYear}
      />

      <FormInput
        label="Unpaid Dues"
        value={String(form.unpaidDues)}
        onChangeText={(value) => updateField('unpaidDues', value)}
        placeholder="Enter unpaid dues"
        keyboardType="decimal-pad"
        error={errors.unpaidDues || liveErrors.unpaidDues}
      />

      <PrimaryButton title="Save Student" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#f5f7fb',
  },
});