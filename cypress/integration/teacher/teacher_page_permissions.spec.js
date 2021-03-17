import { createParent, createStudent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { createClass } from '../../api/class';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { goToTeacherPage, locators } from '../../pages/teacher';

context('Permissions on teachers page', async () => {
  it('What overseer can see on teachers page', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const teacher = await createTeacher({ schoolId: school.id, classId: clazz.id, status: 'NEW' });
    await login({ regNumber: overseer.regNumber, school });
    await goToTeacherPage(teacher.id);

    await cy.get(locators.name).should('exist');
    await cy.get(locators.editButton).should('exist');
    await cy.get(locators.deleteButton).should('exist');
    await cy.get(locators.updateStatusTab).should('exist');
    await cy.get(locators.managePastResults).should('exist');
  });

  it('What admin can see on teachers page', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const admin = await createTeacher({ role: ROLES.ADMIN, schoolId: school.id });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const teacher = await createTeacher({ schoolId: school.id, classId: clazz.id, status: 'NEW' });
    await login({ regNumber: admin.regNumber });
    await goToTeacherPage(teacher.id);

    await cy.get(locators.name).should('exist');
    await cy.get(locators.editButton).should('exist');
    await cy.get(locators.deleteButton).should('exist');
    await cy.get(locators.updateStatusTab).should('exist');
    await cy.get(locators.managePastResults).should('exist');
  });

  it('What subject admin can see on teachers page', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const subjectAdmin = await createTeacher({ role: ROLES.SUBJECT_ADMIN, schoolId: school.id });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const teacher = await createTeacher({ schoolId: school.id, classId: clazz.id, status: 'NEW' });
    await login({ regNumber: subjectAdmin.regNumber });
    await goToTeacherPage(teacher.id);

    await cy.get('#unauthorized').should('exist');
  });

  it('What teacher can see on teachers page', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const teacher = await createTeacher({ role: ROLES.TEACHER, schoolId: school.id });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const teacher2 = await createTeacher({ schoolId: school.id, classId: clazz.id, status: 'NEW' });
    await login({ regNumber: teacher.regNumber });
    await goToTeacherPage(teacher2.id);

    await cy.get('#unauthorized').should('exist');
  });

  it('What parent can see on teachers page', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const parent = await createParent({ schoolId: school.id });
    const teacher = await createTeacher({
      schoolId: school.id,
      classId: clazz.id,
      status: 'NEW',
    });
    await login({ regNumber: parent.regNumber });
    await goToTeacherPage(teacher.id);

    await cy.get('#unauthorized').should('exist');
  });
  it('What student can see on teachers page', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const student = await createStudent({
      schoolId: school.id,
      classId: clazz.id,
      status: 'NEW',
    });
    const teacher = await createTeacher({
      schoolId: school.id,
      classId: clazz.id,
      status: 'NEW',
    });
    await login({ regNumber: student.regNumber });
    await goToTeacherPage(teacher.id);

    await cy.get('#unauthorized').should('exist');
  });
});
