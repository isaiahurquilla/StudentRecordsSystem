export function validateStudent(student, existingStudents = [], editingId = null) {
  const errors = {};
  const currentYear = new Date().getFullYear();

  if (!student.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!student.studentId.trim()) {
    errors.studentId = 'Student ID is required.';
  } else {
    const duplicate = existingStudents.find(
      (item) => item.studentId === student.studentId && item.id !== editingId
    );

    if (duplicate) {
      errors.studentId = 'Student ID must be unique.';
    }
  }

  const age = Number(student.age);
  if (!student.age || Number.isNaN(age) || age < 16 || age > 100) {
    errors.age = 'Age must be between 16 and 100.';
  }

  const gpa = Number(student.gpa);
  if (student.gpa === '' || Number.isNaN(gpa) || gpa < 0 || gpa > 4) {
    errors.gpa = 'GPA must be between 0.0 and 4.0.';
  }

  if (!student.major.trim()) {
    errors.major = 'Major is required.';
  }

  const units = Number(student.units);
  if (student.units === '' || Number.isNaN(units) || units < 0 || units > 24) {
    errors.units = 'Units must be between 0 and 24.';
  }

  const graduationYear = Number(student.graduationYear);
  if (
    student.graduationYear === '' ||
    Number.isNaN(graduationYear) ||
    graduationYear < currentYear - 1 ||
    graduationYear > currentYear + 10
  ) {
    errors.graduationYear = 'Graduation year is invalid.';
  }

  const unpaidDues = Number(student.unpaidDues);
  if (student.unpaidDues === '' || Number.isNaN(unpaidDues) || unpaidDues < 0) {
    errors.unpaidDues = 'Unpaid dues cannot be negative.';
  }

  return errors;
}