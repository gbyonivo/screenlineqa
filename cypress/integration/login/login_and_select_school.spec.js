import { createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { changeSchool } from '../../pages/change_school';
import { locators as nav } from '../../pages/nav';

context('Login', async () => {
  it('overseer login and select school', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school1 = await createSchool({ overseer });
    await createSchool({ overseer });
    await login({ regNumber: overseer.regNumber, school: school1 });
    await cy.url().should('include', 'dashboard');
    await cy.get(nav.school).contains(school1.name);
  });

  it('overseer login and select school', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school1 = await createSchool({ overseer });
    const school2 = await createSchool({ overseer, name: 'School legends' });
    await login({ regNumber: overseer.regNumber, school: school1 });
    await changeSchool({ school: school2 });
    await cy.url().should('include', 'dashboard');
    await cy.get(nav.school).contains(school2.name);
  });
});
