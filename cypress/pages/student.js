import { searchAndSelect } from '../forms/search_and_select';
import { BASE_URL, SCHOOL_TYPES } from '../helpers/constants';

const CREATE_STUDENT_URL = `${BASE_URL}/students/create`;
const STUDENT_URL = `${BASE_URL}/students`;

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
  updateStatusTab: '#Update-status',
  attendanceRecord: '#Attendance-record',
  managePastResults: '#Manage-past-results',
  deleteBtn: 'button[name=yes]',
  tertiarySubjectsTab: '#Courses',
  subjectsTab: '#Subjects',
  requestToRemoveSubjectsButton: '#subjectsToRemove_submitBtn',
  userStatus: '#status',
  userRegNumber: '#regNumber',
  userStatusBtn: 'button[name=updateStatus]',
  semester: '#semesterId',
  applyButton: '#apply_resultManagement',
  subjectsSelectBaseId: 'subjects',
  addSubjectsBtn: 'button[name=addSubjectsBtn]',
  submitResultsButton: '#submitBtn',
  resultSubjectInput: '#resultSubjectInput-',
  editButton: 'button[name=edit]',
  deleteButton: 'button[name=delete]',
};

const goToStudentPage = async (studentId) => {
  await cy.visit(`${STUDENT_URL}/${studentId}`);
};

const goToCreateStudentPage = async () => {
  await cy.visit(CREATE_STUDENT_URL);
};

const goToUpdateStudentPage = async (studentId) => {
  await cy.visit(`${STUDENT_URL}/${studentId}/update`);
};

const goToDeleteStudentPage = async (studentId) => {
  await cy.visit(`${STUDENT_URL}/${studentId}/delete`);
};

const goToStudentSubjectsTab = async (studentId, schoolType) => {
  await cy.visit(`${STUDENT_URL}/${studentId}`);
  if (schoolType === SCHOOL_TYPES.TERTIARY) await cy.get(locators.tertiarySubjectsTab).click();
  else await cy.get(locators.subjectsTab).click();
};

const goToStudentUpdateStatusTab = async (studentId) => {
  await cy.visit(`${STUDENT_URL}/${studentId}`);
  await cy.get(locators.updateStatusTab).click();
};

const goToStudentManagePastResultTab = async (studentId) => {
  await cy.visit(`${STUDENT_URL}/${studentId}`);
  await cy.get(locators.managePastResults).click();
};

const requestToDeleteSubjects = async (subjectsIds = []) => {
  await searchAndSelect('subjectsToRemove', subjectsIds);
  await cy.get(locators.requestToRemoveSubjectsButton).click();
};

const removeSubjectsFromStudent = async (subjectsIds = []) => {
  await searchAndSelect('subjectsToRemove', subjectsIds);
  await cy.get(locators.requestToRemoveSubjectsButton).click();
};

const confirmRequest = async () => {
  await cy.get(locators.deleteBtn).click();
};

const changeStatus = async (status, regNumber) => {
  await cy.get(locators.userStatus).select(status);
  await cy.get(locators.userRegNumber).clear().type(regNumber);
  await cy.get(locators.userStatusBtn).click();
};

const selectSemester = async (semesterId) => {
  await cy.get(locators.semester).select(`${semesterId}`);
};

const changeResult = async (semesterId, subjectsIds = [], scores = []) => {
  // await cy.get(locators.semester).select(`${semesterId}`);
  await cy.get(locators.applyButton).click();
  await searchAndSelect(locators.subjectsSelectBaseId, subjectsIds);
  await cy.get(locators.addSubjectsBtn).click();
  for (let i = 0; i < subjectsIds.length; i += 1) {
    await cy.get(`${locators.resultSubjectInput}${subjectsIds[i]}`).clear().type(`${scores[i] || '90'}`); // eslint-disable-line
  }
  await cy.get(locators.submitResultsButton).click();
};

export {
  goToCreateStudentPage,
  removeSubjectsFromStudent,
  goToUpdateStudentPage,
  goToStudentSubjectsTab,
  goToStudentPage,
  selectSemester,
  goToStudentUpdateStatusTab,
  goToStudentManagePastResultTab,
  requestToDeleteSubjects,
  confirmRequest,
  changeStatus,
  changeResult,
  CREATE_STUDENT_URL,
  locators,
  goToDeleteStudentPage,
};
