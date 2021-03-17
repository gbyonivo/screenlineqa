import { searchAndSelect } from '../forms/search_and_select';
import { BASE_URL, SCHOOL_TYPES } from '../helpers/constants';

const CREATE_TEACHER_URL = `${BASE_URL}/teachers/create`;
const TEACHER_URL = `${BASE_URL}/teachers`;

const locators = {
  name: '#teacherName',
  regNumber: '#teacherRegNumber',
  qualification: '#teacherQualification',
  class: '#teacherClass',
  year: '#teacherYear',
  phoneNumber: '#teacherPhoneNumber',
  email: '#teacherEmail',
  address: '#teacherAddress',
  dob: '#teacherDob',
  gender: '#teacherGender',
  parent: '#teacherParent',
  previousWorkPlace: '#teacherPreviousWorkPlace',
  performanceTab: 'Performance',
  coursesTab: 'Courses',
  updateStatusTab: '#Update-status',
  deleteBtn: 'button[name=yes]',
  tertiarySubjectsTab: '#Remove-courses',
  subjectsTab: '#Remove-subjects',
  requestToRemoveSubjectsButton: '#subjectsToRemove_submitBtn',
  userStatus: '#status',
  userRegNumber: '#regNumber',
  userStatusBtn: 'button[name=updateStatus]',
  editButton: 'button[name=edit]',
  deleteButton: 'button[name=delete]',
};

const goToTeacherPage = async (teacherId) => {
  await cy.visit(`${TEACHER_URL}/${teacherId}`);
};

const goToCreateTeacherPage = async () => {
  await cy.visit(CREATE_TEACHER_URL);
};

const goToUpdateTeacherPage = async (teacherId) => {
  await cy.visit(`${TEACHER_URL}/${teacherId}/update`);
};

const goToDeleteTeacherPage = async (teacherId) => {
  await cy.visit(`${TEACHER_URL}/${teacherId}/delete`);
};

const goToTeacherSubjectsTab = async (teacherId, schoolType) => {
  await cy.visit(`${TEACHER_URL}/${teacherId}`);
  if (schoolType === SCHOOL_TYPES.TERTIARY) await cy.get(locators.tertiarySubjectsTab).click();
  else await cy.get(locators.subjectsTab).click();
};

const goToTeacherUpdateStatusTab = async (teacherId) => {
  await cy.visit(`${TEACHER_URL}/${teacherId}`);
  await cy.get(locators.updateStatusTab).click();
};

const goToTeacherManagePastResultTab = async (teacherId) => {
  await cy.visit(`${TEACHER_URL}/${teacherId}`);
  await cy.get(locators.managePastResults).click();
};

const requestToDeleteSubjects = async (subjectsIds = []) => {
  await searchAndSelect('subjectsToRemove', subjectsIds);
  await cy.get(locators.requestToRemoveSubjectsButton).click();
};

const removeSubjectsFromTeacher = async (subjectsIds = []) => {
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

export {
  goToCreateTeacherPage,
  removeSubjectsFromTeacher,
  goToUpdateTeacherPage,
  goToTeacherSubjectsTab,
  goToTeacherPage,
  selectSemester,
  goToTeacherUpdateStatusTab,
  goToTeacherManagePastResultTab,
  requestToDeleteSubjects,
  confirmRequest,
  changeStatus,
  CREATE_TEACHER_URL,
  locators,
  goToDeleteTeacherPage,
};
