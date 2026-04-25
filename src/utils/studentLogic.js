export function getAcademicStanding(gpa) {
  const value = Number(gpa);

  if (value >= 3.5) return 'Honors';
  if (value >= 2.0) return 'Good';
  if (value >= 1.0) return 'Probation';
  return 'Dismissal Risk';
}

export function getEnrollmentLoad(units) {
  const value = Number(units);

  if (value >= 12) return 'Full-Time';
  if (value >= 6) return 'Part-Time';
  return 'Under-Enrolled';
}

export function hasRegistrationHold(student) {
  const standing = getAcademicStanding(student.gpa);
  return Number(student.unpaidDues) > 500 || standing === 'Dismissal Risk';
}

export function getRiskLevel(student) {
  let score = 0;

  if (Number(student.gpa) < 2.0) score += 2;
  if (Number(student.unpaidDues) > 0) score += 1;
  if (Number(student.unpaidDues) > 500) score += 1;
  if (Number(student.units) < 6) score += 1;
  if (Number(student.graduationYear) < new Date().getFullYear()) score += 1;

  if (score >= 4) return 'High';
  if (score >= 2) return 'Medium';
  return 'Low';
}

export function getComputedStudent(student) {
  return {
    ...student,
    academicStanding: getAcademicStanding(student.gpa),
    enrollmentLoad: getEnrollmentLoad(student.units),
    registrationHold: hasRegistrationHold(student),
    riskLevel: getRiskLevel(student),
  };
}