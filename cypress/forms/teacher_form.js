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
  qualificationInput: '#qualification',
  qualificationError: '#qualificationError',
  phoneNumberInput: '#phoneNumber',
  phoneNumberError: '#phoneNumberError',
  countrySelect: '#countryOfResidence',
  countryError: '#countryOfResidenceError',
  stateOfResidenceSelect: '#stateOfResidence',
  stateOfResidenceError: '#stateOfResidenceError',
  addressInput: '#address',
  addressError: '#addressError',
  previousWorkPlace: '#previousWorkPlace',
  previousWorkPlaceError: '#previousWorkPlaceError',
  genderSelect: '#gender',
  genderError: '#genderError',
  nationalitySelect: '#nationality',
  nationalityError: '#nationalityError',
  dobBaseId: 'dob',
  doneButton: 'button[name=teachersRequestBtn]',
};

const fillForm = async (teacher) => {
  if (teacher.firstName) {
    await cy.get(locators.firstNameInput).clear().type(teacher.firstName);
  }
  if (teacher.lastName) {
    await cy.get(locators.lastNameInput).clear().type(teacher.lastName);
  }
  if (teacher.regNumber) {
    await cy.get(locators.regNumberInput).clear().type(teacher.regNumber);
  }
  if (teacher.email) {
    await cy.get(locators.emailInput).clear().type(teacher.email);
  }
  if (teacher.qualification) {
    await cy.get(locators.qualificationInput).clear().type(teacher.qualification);
  }
  if (teacher.phoneNumber) {
    await cy.get(locators.phoneNumberInput).clear().type(teacher.phoneNumber);
  }
  if (teacher.address) {
    await cy.get(locators.addressInput).clear().type(teacher.address);
  }
  if (teacher.previousWorkPlace) {
    await cy.get(locators.previousWorkPlace).clear().type(teacher.previousWorkPlace);
  }
  if (teacher.gender) {
    await cy.get(locators.genderSelect).select(teacher.gender);
  }
  if (teacher.nationality) {
    await cy.get(locators.nationalitySelect).select(teacher.nationality);
  }
  if (teacher.subjectsIds) {
    await searchAndSelect('subjects', teacher.subjectsIds);
  }
  if (teacher.dob) {
    await pickDate(teacher.dob, locators.dobBaseId);
  }

  await cy.get(locators.doneButton).click();
  await cy.wait(50);
};

export {
  locators,
  fillForm,
};
