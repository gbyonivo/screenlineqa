import { createParent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { confirmRequest, goToDeleteParentPage, goToParentPage } from '../../pages/parent';
import { goToRequestsPage } from '../../pages/request';

context('Request to delete parent', async () => {
  it('Successfully request to delete a tertiary parent', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToDeleteParent: 0 } });
    const parent = await createParent({ schoolId: school.id, status: 'NEW' });
    await login({ regNumber: overseer.regNumber, school });
    await goToDeleteParentPage(parent.id);
    await confirmRequest();
    await goToRequestsPage();
    await cy.get(`#DELETE_parents-${parent.id}`).should('not.exist');
    await cy.get(`#answered-DELETE_parents-${parent.id}`).should('exist');

    await goToParentPage(parent.id);
    await cy.get('#pageNotFound').should('exist');
  });
});
