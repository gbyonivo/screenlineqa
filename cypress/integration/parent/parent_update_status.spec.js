import { createParent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { changeStatus, goToParentUpdateStatusTab, locators } from '../../pages/parent';

context('Change parent status', async () => {
  it('Successfully change parent status to suspended', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveParentSubject: 0 } });
    const parent = await createParent({
      schoolId: school.id,
      status: 'NEW',
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToParentUpdateStatusTab(parent.id);
    await cy.get(locators.userStatus).should('have.value', 'NEW');
    await changeStatus('SUSPENDED', overseer.regNumber);
    await cy.reload();
    await cy.wait(1000);
    await goToParentUpdateStatusTab(parent.id);
    await cy.get(locators.userStatus).should('have.value', 'SUSPENDED');
  });

  it('Successfully change parent status to password_reset', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveParentSubject: 0 } });
    const parent = await createParent({
      schoolId: school.id,
      status: 'NEW',
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToParentUpdateStatusTab(parent.id);
    await changeStatus('PASSWORD_RESET', overseer.regNumber);
    await cy.reload();
    await cy.wait(1000);
    await goToParentUpdateStatusTab(parent.id);
    await cy.get(locators.userStatus).should('have.value', 'PASSWORD_RESET');
  });

  it('Successfully change parent status to NEW', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveParentSubject: 0 } });
    const parent = await createParent({
      schoolId: school.id,
      status: 'SUSPENDED',
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToParentUpdateStatusTab(parent.id);
    await changeStatus('NEW', overseer.regNumber);
    await cy.reload();
    await cy.wait(1000);
    await goToParentUpdateStatusTab(parent.id);
    await cy.get(locators.userStatus).should('have.value', 'NEW');
  });
});
