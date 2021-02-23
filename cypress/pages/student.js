import { BASE_URL } from '../helpers/constants';

const CREATE_STUDENT_URL = `${BASE_URL}/students/create`;

const locators = {
  name: '#studentName',
  regNumber: '#studentRegNumber',
  status: '#studentStatus',
  programme: '#studentProgramme',
  class: '#studentClass',
  year: '#studentYear',
  phoneNumber: '#studentPhoneNumber',
  email: '#studentEmail',
  address: '#studentAddress',
  dob: '#studentDob',
  gender: '#studentGender',
  parent: '#studentParent',
  previousSchool: '#studentPreviousSchool',
  performanceTab: 'Performance',
  coursesTab: 'Courses',
  updateStatusTab: 'Update-status',
  attendanceRecord: 'Attendance-record',
  managePastResults: 'Manage-past-results',
};

const goToCreateStudentPage = async () => {
  await cy.visit(CREATE_STUDENT_URL);
};

export {
  goToCreateStudentPage,
  CREATE_STUDENT_URL,
  locators,
};
