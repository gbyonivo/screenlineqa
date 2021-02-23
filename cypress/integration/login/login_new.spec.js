import { createParent, createStudent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { createClass } from '../../api/class';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';

context('NEW user login', async () => {
  it('admin login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const admin = await createTeacher({ role: ROLES.ADMIN, schoolId: school.id, status: 'NEW' });
    await login({ regNumber: admin.regNumber });
    await cy.url().should('include', 'completeLogin');
  });

  it('teacher login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const teacher = await createTeacher({ role: ROLES.TEACHER, schoolId: school.id, status: 'NEW' });
    await login({ regNumber: teacher.regNumber });
    await cy.url().should('include', 'completeLogin');
  });

  it('subject admin login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const subjectAdmin = await createTeacher({ role: ROLES.SUBJECT_ADMIN, schoolId: school.id, status: 'NEW' });
    await login({ regNumber: subjectAdmin.regNumber });
    await cy.url().should('include', 'completeLogin');
  });

  it('parent login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const parent = await createParent({ schoolId: school.id, status: 'NEW' });
    await login({ regNumber: parent.regNumber });
    await cy.url().should('include', 'completeLogin');
  });

  it('student login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const student = await createStudent({ schoolId: school.id, classId: clazz.id, status: 'NEW' });
    await login({ regNumber: student.regNumber });
    await cy.url().should('include', 'completeLogin');
  });
});
