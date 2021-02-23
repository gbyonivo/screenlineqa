import { createParent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { createClass } from '../../api/class';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { goToCreateStudentPage, locators as studentLocators } from '../../pages/student';
import { fillForm } from '../../forms/student_form';
import { validPrimaryStudent, validTertiaryStudent } from '../../mocks/student';
import { createSubject } from '../../api/subject';

const assertStudent = async (student) => {
  if (student.firstName && student.lastName) {
    await cy.get(studentLocators.name).should('contain', `${student.firstName} ${student.lastName}`);
  }
  if (student.regNumber) {
    await cy.get(studentLocators.regNumber).should('contain', student.regNumber);
  }
  if (student.year) {
    await cy.get(studentLocators.year).should('contain', student.year);
  }
  if (student.regNumber) {
    await cy.get(studentLocators.regNumber).should('contain', student.regNumber);
  }
  if (student.phoneNumber) {
    await cy.get(studentLocators.email).should('contain', student.email);
  }
  if (student.email) {
    await cy.get(studentLocators.regNumber).should('contain', student.regNumber);
  }
  if (student.address) {
    await cy.get(studentLocators.address).should('contain', student.address);
  }
  if (student.parent) {
    await cy.get(studentLocators.parent).should('contain', student.parent);
  }
  if (student.gender) {
    await cy.get(studentLocators.gender).should('contain', student.gender);
  }
  if (student.previousSchool) {
    await cy.get(studentLocators.previousSchool).should('contain', student.previousSchool);
  }
  if (student.dob) {
    await cy.get(studentLocators.dob).should('contain', student.dob);
  }
  if (student.class) {
    await cy.get(studentLocators.class).should('contain', student.class);
  }
  if (student.programme) {
    await cy.get(studentLocators.programme).should('contain', student.programme);
  }
  if (student.status) {
    await cy.get(studentLocators.status).should('contain', student.status);
  }
};

context('Create student', async () => {
  it('Successfully create a tertiary student', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const parent = await createParent({ schoolId: school.id });
    await login({ regNumber: overseer.regNumber, school });
    await goToCreateStudentPage();
    await fillForm({
      ...validTertiaryStudent,
      classId: clazz.id,
      parentsIds: [`${parent.id}`],
    });
    cy.wait(1000);
    await assertStudent({
      ...validTertiaryStudent,
      class: clazz.name,
      parent: `${parent.firstName} ${parent.lastName}`,
      status: 'NEW',
    });
  });

  it('Successfully creates a primary school student', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, type: 'PRIMARY' });
    const subject = await createSubject({ schoolId: school.id, teacherId: overseer.id });
    const clazz = await createClass({
      teacherId: overseer.id, schoolId: school.id, subjectsIds: [subject.id],
    });
    const parent = await createParent({ schoolId: school.id });
    await login({ regNumber: overseer.regNumber, school });
    await goToCreateStudentPage();
    await fillForm({
      ...validPrimaryStudent,
      classId: clazz.id,
      parentsIds: [`${parent.id}`],
    });
    cy.wait(1000);
    await assertStudent({
      ...validPrimaryStudent,
      class: clazz.name,
      parent: `${parent.firstName} ${parent.lastName}`,
      status: 'NEW',
    });
  });
});
