import { createParent, createStudent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { createClass } from '../../api/class';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { changePassword } from '../../pages/password_reset';

const newPassword = 'P@ssw0rd1456';
const wrongConfirmPassword = 'P@ssw0rd1457';

context('NEW user login', async () => {
  it('admin login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const admin = await createTeacher({ role: ROLES.ADMIN, schoolId: school.id, status: 'NEW' });
    await login({ regNumber: admin.regNumber });
    await changePassword({ newPassword, email: admin.email, confirmPassword: newPassword });
    await login({ regNumber: admin.regNumber, password: newPassword });
    await cy.url().should('include', 'dashboard');
  });

  it('teacher login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const teacher = await createTeacher({ role: ROLES.TEACHER, schoolId: school.id, status: 'NEW' });
    await login({ regNumber: teacher.regNumber });
    await changePassword({ newPassword, email: teacher.email, confirmPassword: newPassword });
    await login({ regNumber: teacher.regNumber, password: newPassword });
    await cy.url().should('include', 'dashboard');
  });

  it('subject admin login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const subjectAdmin = await createTeacher({ role: ROLES.SUBJECT_ADMIN, schoolId: school.id, status: 'NEW' });
    await login({ regNumber: subjectAdmin.regNumber });
    await changePassword({ newPassword, email: subjectAdmin.email, confirmPassword: newPassword });
    await login({ regNumber: subjectAdmin.regNumber, password: newPassword });
    await cy.url().should('include', 'dashboard');
  });

  it('parent login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const parent = await createParent({ schoolId: school.id, status: 'NEW' });
    await login({ regNumber: parent.regNumber });
    await changePassword({ newPassword, email: parent.email, confirmPassword: newPassword });
    await login({ regNumber: parent.regNumber, password: newPassword });
    await cy.url().should('include', 'dashboard');
  });

  it('student login', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const student = await createStudent({ schoolId: school.id, classId: clazz.id, status: 'NEW' });
    await login({ regNumber: student.regNumber });
    await changePassword({ newPassword, email: student.email, confirmPassword: newPassword });
    await login({ regNumber: student.regNumber, password: newPassword });
    await cy.url().should('include', 'dashboard');
  });
});
