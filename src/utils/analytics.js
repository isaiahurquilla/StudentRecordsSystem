import { getComputedStudent } from './studentLogic';

export function getAnalytics(students) {
  const computedStudents = students.map(getComputedStudent);

  const totalStudents = computedStudents.length;

  const averageGpa =
    totalStudents === 0
      ? 0
      : computedStudents.reduce((sum, student) => sum + Number(student.gpa), 0) /
        totalStudents;

  const highestPerformingStudent =
    totalStudents === 0
      ? null
      : computedStudents.reduce((best, current) =>
          Number(current.gpa) > Number(best.gpa) ? current : best
        );

  const standingDistribution = computedStudents.reduce((acc, student) => {
    acc[student.academicStanding] = (acc[student.academicStanding] || 0) + 1;
    return acc;
  }, {});

  const holdCount = computedStudents.filter(
    (student) => student.registrationHold
  ).length;

  const studentsByMajor = computedStudents.reduce((acc, student) => {
    if (!acc[student.major]) {
      acc[student.major] = {
        count: 0,
        totalGpa: 0,
        averageGpa: 0,
      };
    }

    acc[student.major].count += 1;
    acc[student.major].totalGpa += Number(student.gpa);
    acc[student.major].averageGpa =
      acc[student.major].totalGpa / acc[student.major].count;

    return acc;
  }, {});

  return {
    totalStudents,
    averageGpa,
    highestPerformingStudent,
    standingDistribution,
    holdCount,
    studentsByMajor,
  };
}