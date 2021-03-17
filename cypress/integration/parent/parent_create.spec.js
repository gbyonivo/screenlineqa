import { createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { goToCreateParentPage, locators as parentLocators } from '../../pages/parent';
import { fillForm } from '../../forms/parent_form';
import { validParent } from '../../mocks/parent';

const assertParent = async (parent) => {
  if (parent.firstName && parent.lastName) {
    await cy.get(parentLocators.name).should('contain', `${parent.firstName} ${parent.lastName}`);
  }
  if (parent.regNumber) {
    await cy.get(parentLocators.regNumber).should('contain', parent.regNumber);
  }
  if (parent.phoneNumber) {
    await cy.get(parentLocators.email).should('contain', parent.email);
  }
  if (parent.email) {
    await cy.get(parentLocators.regNumber).should('contain', parent.regNumber);
  }
  if (parent.address) {
    await cy.get(parentLocators.address).should('contain', parent.address);
  }
  if (parent.students) {
    await cy.get(parentLocators.students).should('contain', parent.students);
  }
  if (parent.gender) {
    await cy.get(parentLocators.gender).should('contain', parent.gender);
  }
  if (parent.dob) {
    await cy.get(parentLocators.dob).should('contain', parent.dob);
  }
};

context('Create parent', async () => {
  it('Successfully create a tertiary parent', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    await login({ regNumber: overseer.regNumber, school });
    await goToCreateParentPage();
    await fillForm({
      ...validParent,
    });
    cy.wait(1000);
    await assertParent({
      ...validParent,
      status: 'NEW',
    });
  });
});
