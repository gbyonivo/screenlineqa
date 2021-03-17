import { searchAndSelect } from './search_and_select';
import { pickDate } from './date_picker';

const locators = {
  firstNameInput: '#firstName',
  firstNameError: '#firstNameError',
  lastNameInput: '#lastName',
  lastNameError: '#lastNameError',
  regNumberInput: '#regNumber',
  regNumberError: '#regNumberError',
  emailInput: '#email',
  emailError: '#emailError',
  programmeInput: '#programme',
  programmeError: '#programmeError',
  yearSelect: '#level',
  yearError: '#yearError',
  phoneNumberInput: '#phoneNumber',
  phoneNumberError: '#phoneNumberError',
  countrySelect: '#countryOfResidence',
  countryError: '#countryOfResidenceError',
  stateOfResidenceSelect: '#stateOfResidence',
  stateOfResidenceError: '#stateOfResidenceError',
  addressInput: '#address',
  addressError: '#addressError',
  previousSchoolInput: '#previousSchool',
  previousSchoolError: '#previousSchoolError',
  genderSelect: '#gender',
  genderError: '#genderError',
  departmentSelect: '#class',
  departmentError: '#classError',
  nationalitySelect: '#nationality',
  nationalityError: '#nationalityError',
  dobBaseId: 'dob',
  doneButton: 'button[name=studentsRequestBtn]',
};

const fillForm = async (student) => {
  if (student.firstName) {
    await cy.get(locators.firstNameInput).clear().type(student.firstName);
  }
  if (student.lastName) {
    await cy.get(locators.lastNameInput).clear().type(student.lastName);
  }
  if (student.regNumber) {
    await cy.get(locators.regNumberInput).clear().type(student.regNumber);
  }
  if (student.email) {
    await cy.get(locators.emailInput).clear().type(student.email);
  }
  if (student.programme) {
    await cy.get(locators.programmeInput).clear().type(student.programme);
  }
  if (student.year) {
    await cy.get(locators.yearSelect).select(student.year);
  }
  if (student.phoneNumber) {
    await cy.get(locators.phoneNumberInput).clear().type(student.phoneNumber);
  }
  if (student.countryOfResidence) {
    await cy.get(locators.countrySelect).select(student.countryOfResidence);
  }
  if (student.stateOfResidence) {
    await cy.get(locators.stateOfResidenceSelect).select(student.stateOfResidence);
  }
  if (student.address) {
    await cy.get(locators.addressInput).clear().type(student.address);
  }
  if (student.previousSchool) {
    await cy.get(locators.previousSchoolInput).clear().type(student.previousSchool);
  }
  if (student.gender) {
    await cy.get(locators.genderSelect).select(student.gender);
  }
  if (student.classId) {
    await cy.get(locators.departmentSelect).select(`${student.classId}`);
  }
  if (student.nationality) {
    await cy.get(locators.nationalitySelect).select(student.nationality);
  }
  if (student.parentsIds) {
    await searchAndSelect('parents', student.parentsIds);
  }
  if (student.subjectsIds) {
    await searchAndSelect('subjects', student.subjectsIds);
  }
  if (student.dob) {
    await pickDate(student.dob, locators.dobBaseId);
  }

  await cy.get(locators.doneButton).click();
};

export {
  locators,
  fillForm,
};
