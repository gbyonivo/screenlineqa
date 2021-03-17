import { createParent, createStudent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { createClass } from '../../api/class';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { goToParentKidsTab, removeKidsFromParent } from '../../pages/parent';
import { goToRequestsPage } from '../../pages/request';

context('Remove subject from parent', async () => {
  it('Successfully remove subject from tertiary parent', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const student = await createStudent({ schoolId: school.id, classId: clazz.id, status: 'NEW' });
    const parent = await createParent({
      schoolId: school.id,
      status: 'NEW',
      students: [student.id],
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToParentKidsTab(parent.id, school.type);
    await removeKidsFromParent([student.id]);
    await cy.get('#similar-request').should('exist');
    await goToRequestsPage();
    await cy.get(`#REMOVE_KIDS_FROM_PARENT_parents-${parent.id}`).should('exist');
  });
});
