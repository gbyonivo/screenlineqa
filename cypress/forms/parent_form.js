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
  phoneNumberInput: '#phoneNumber',
  phoneNumberError: '#phoneNumberError',
  countrySelect: '#countryOfResidence',
  countryError: '#countryOfResidenceError',
  addressInput: '#address',
  addressError: '#addressError',
  genderSelect: '#gender',
  genderError: '#genderError',
  nationalitySelect: '#nationality',
  nationalityError: '#nationalityError',
  dobBaseId: 'dob',
  doneButton: 'button[name=parentsRequestBtn]',
};

const fillForm = async (parent) => {
  if (parent.firstName) {
    await cy.get(locators.firstNameInput).clear().type(parent.firstName);
  }
  if (parent.lastName) {
    await cy.get(locators.lastNameInput).clear().type(parent.lastName);
  }
  if (parent.regNumber) {
    await cy.get(locators.regNumberInput).clear().type(parent.regNumber);
  }
  if (parent.email) {
    await cy.get(locators.emailInput).clear().type(parent.email);
  }
  if (parent.phoneNumber) {
    await cy.get(locators.phoneNumberInput).clear().type(parent.phoneNumber);
  }
  if (parent.address) {
    await cy.get(locators.addressInput).clear().type(parent.address);
  }
  if (parent.gender) {
    await cy.get(locators.genderSelect).select(parent.gender);
  }
  if (parent.nationality) {
    await cy.get(locators.nationalitySelect).select(parent.nationality);
  }
  if (parent.studentsIds) {
    await searchAndSelect('subjects', parent.studentsIds);
  }
  if (parent.dob) {
    await pickDate(parent.dob, locators.dobBaseId);
  }

  await cy.get(locators.doneButton).click();
};

export {
  locators,
  fillForm,
};
