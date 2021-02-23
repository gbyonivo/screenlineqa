import { createParent, createStudent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { createClass } from '../../api/class';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';

context('Login', async () => {
  it('overseer login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    await login({ regNumber: overseer.regNumber });
    await cy.url().should('include', 'changeSchool');
  });

  it('overseer login and select school', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school1 = await createSchool({ overseer });
    await createSchool({ overseer });
    await login({ regNumber: overseer.regNumber, school: school1 });
    await cy.url().should('include', 'dashboard');
  });

  it('admin login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const admin = await createTeacher({ role: ROLES.ADMIN, schoolId: school.id });
    await login({ regNumber: admin.regNumber });
    await cy.url().should('include', 'dashboard');
  });

  it('teacher login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const teacher = await createTeacher({ role: ROLES.TEACHER, schoolId: school.id });
    await login({ regNumber: teacher.regNumber });
    await cy.url().should('include', 'dashboard');
  });

  it('subject admin login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const subjectAdmin = await createTeacher({ role: ROLES.SUBJECT_ADMIN, schoolId: school.id });
    await login({ regNumber: subjectAdmin.regNumber });
    await cy.url().should('include', 'dashboard');
  });

  it('parent login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const parent = await createParent({ schoolId: school.id });
    await login({ regNumber: parent.regNumber });
    await cy.url().should('include', 'dashboard');
  });

  it('student login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const student = await createStudent({ schoolId: school.id, classId: clazz.id });
    await login({ regNumber: student.regNumber });
    await cy.url().should('include', 'dashboard');
  });
});
