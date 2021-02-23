import { BASE_URL } from '../helpers/constants';

const PASSWORD_RESET_PAGE_URL = `${BASE_URL}/completeLogin`;

const locators = {
  newPasswordInput: '#newPassword',
  confirmPasswordInput: '#verifyPassword',
  emailInput: '#email',
  changePasswordBtn: 'button[name=changePassword]',
  logout: 'button[name=logout]',
};

const changePassword = async ({ newPassword, confirmPassword, email }) => {
  await cy.wait(1000);
  await cy.get(locators.newPasswordInput).clear().type(newPassword);
  await cy.get(locators.confirmPasswordInput).clear().type(confirmPassword);
  await cy.get(locators.emailInput).clear().type(email);
  await cy.get(locators.changePasswordBtn).click();
  await cy.wait(1000);
  await cy.get(locators.logout).click();
};

export {
  locators,
  changePassword,
  PASSWORD_RESET_PAGE_URL,
};
