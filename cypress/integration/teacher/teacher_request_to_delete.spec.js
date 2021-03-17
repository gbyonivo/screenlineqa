import { createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { confirmRequest, goToDeleteTeacherPage } from '../../pages/teacher';
import { goToRequestsPage } from '../../pages/request';

context('Request to delete teacher', async () => {
  it('Successfully request to delete teacher', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const teacher = await createTeacher({ schoolId: school.id, status: 'NEW' });
    await login({ regNumber: overseer.regNumber, school });
    await goToDeleteTeacherPage(teacher.id);
    await confirmRequest();
    await goToRequestsPage();
    await cy.get(`#DELETE_teachers-${teacher.id}`).should('exist');
  });
});
