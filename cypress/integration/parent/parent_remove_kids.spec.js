import { createParent, createStudent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { createClass } from '../../api/class';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { goToParentKidsTab, removeKidsFromParent } from '../../pages/parent';

context('Remove subject from parent', async () => {
  it('Successfully remove subject from tertiary parent', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveParentKids: 0 } });
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
    await cy.get('#nothing-to-remove').should('exist');
    await cy.get('#similar-request').should('not.exist');
  });
});
