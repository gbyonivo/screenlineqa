import { BASE_URL, USER_PASSWORD } from '../helpers/constants';
import { changeSchool } from './change_school';

const LOGIN_PAGE_URL = BASE_URL;

const locators = {
  regNumberInput: '#regNumber',
  passwordInput: '#password',
  loginButton: 'button[name=signInBtn]',
  schoolSelect: 'select[name=school]',
  changeSchoolButton: 'button[name=changeSchoolBtn]',
};

const login = async ({ regNumber, password = USER_PASSWORD, school }) => {
  await cy.visit(LOGIN_PAGE_URL);
  await cy.wait(1000);
  await cy.get(locators.regNumberInput).clear().type(regNumber);
  await cy.get(locators.passwordInput).clear().type(password);
  await cy.get(locators.loginButton).click();
  if (school) {
    await changeSchool({ school, afterLogin: true });
  }
  await cy.wait(1000);
};

export {
  locators,
  login,
  LOGIN_PAGE_URL,
};
