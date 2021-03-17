import { createStudent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { createClass } from '../../api/class';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { confirmRequest, goToDeleteStudentPage } from '../../pages/student';
import { goToRequestsPage } from '../../pages/request';

context('Request to delete student', async () => {
  it('Successfully request to delete a tertiary student', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const student = await createStudent({ schoolId: school.id, classId: clazz.id, status: 'NEW' });
    await login({ regNumber: overseer.regNumber, school });
    await goToDeleteStudentPage(student.id);
    await confirmRequest();
    await goToRequestsPage();
    await cy.get(`#DELETE_students-${student.id}`).should('exist');
  });

  it('Successfully request to delete a primary student', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, type: 'PRIMARY' });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const student = await createStudent({ schoolId: school.id, classId: clazz.id, status: 'NEW' });
    await login({ regNumber: overseer.regNumber, school });
    await goToDeleteStudentPage(student.id);
    await confirmRequest();
    await goToRequestsPage();
    await cy.get(`#DELETE_students-${student.id}`).should('exist');
  });
});
