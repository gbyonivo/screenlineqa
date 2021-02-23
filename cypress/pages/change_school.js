import { BASE_URL } from '../helpers/constants';

const CHANGE_SCHOOL_PAGE_URL = `${BASE_URL}/changeSchool`;

const locators = {
  schoolSelect: 'select[name=school]',
  changeSchoolButton: 'button[name=changeSchoolBtn]',
};

const changeSchool = async ({ school, afterLogin }) => {
  if (!afterLogin) {
    await cy.visit(CHANGE_SCHOOL_PAGE_URL);
  }
  await cy.get(locators.schoolSelect).select(`${school.id}`);
  await cy.get(locators.changeSchoolButton).click();
};

export {
  locators,
  changeSchool,
  CHANGE_SCHOOL_PAGE_URL,
};
