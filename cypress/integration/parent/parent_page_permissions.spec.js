import { createParent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { createClass } from '../../api/class';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { goToParentPage, locators } from '../../pages/parent';

context('Permissions on parents page', async () => {
  it('What overseer can see on parents page', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const parent = await createParent({ schoolId: school.id, classId: clazz.id, status: 'NEW' });
    await login({ regNumber: overseer.regNumber, school });
    await goToParentPage(parent.id);

    await cy.get(locators.name).should('exist');
    await cy.get(locators.editButton).should('exist');
    await cy.get(locators.deleteButton).should('exist');
    await cy.get(locators.updateStatusTab).should('exist');
    await cy.get(locators.managePastResults).should('exist');
  });

  it('What admin can see on parents page', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const admin = await createTeacher({ role: ROLES.ADMIN, schoolId: school.id });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const parent = await createParent({ schoolId: school.id, classId: clazz.id, status: 'NEW' });
    await login({ regNumber: admin.regNumber });
    await goToParentPage(parent.id);

    await cy.get(locators.name).should('exist');
    await cy.get(locators.editButton).should('exist');
    await cy.get(locators.deleteButton).should('exist');
    await cy.get(locators.updateStatusTab).should('exist');
    await cy.get(locators.managePastResults).should('exist');
  });

  it('What subject admin can see on parents page', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const subjectAdmin = await createTeacher({ role: ROLES.SUBJECT_ADMIN, schoolId: school.id });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const parent = await createParent({ schoolId: school.id, classId: clazz.id, status: 'NEW' });
    await login({ regNumber: subjectAdmin.regNumber });
    await goToParentPage(parent.id);

    await cy.get(locators.name).should('not.exist');
    await cy.get('#unauthorized').should('exist');
  });

  it('What teacher can see on parents page', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const teacher = await createTeacher({ role: ROLES.TEACHER, schoolId: school.id });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const parent = await createParent({ schoolId: school.id, classId: clazz.id, status: 'NEW' });
    await login({ regNumber: teacher.regNumber });
    await goToParentPage(parent.id);

    await cy.get(locators.name).should('not.exist');
    await cy.get('#unauthorized').should('exist');
  });

  it('What parent can see on parents page', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const parent = await createParent({ schoolId: school.id });
    await login({ regNumber: parent.regNumber });
    await goToParentPage(parent.id);

    await cy.get(locators.name).should('not.exist');
    await cy.get('#unauthorized').should('exist');
  });

  it('What student can see on parents page', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const parent = await createParent({ schoolId: school.id });
    const student = await createParent({
      schoolId: school.id,
      classId: clazz.id,
      status: 'ACTIVE',
      parentsIds: [`${parent.id}`],
    });
    await login({ regNumber: student.regNumber });
    await goToParentPage(parent.id);
    await cy.get(locators.name).should('not.exist');
    await cy.get('#unauthorized').should('exist');
  });
});
