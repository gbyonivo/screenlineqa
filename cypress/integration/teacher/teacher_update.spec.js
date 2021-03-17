import { createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { goToUpdateTeacherPage, locators as teacherLocators } from '../../pages/teacher';
import { fillForm } from '../../forms/teacher_form';
import { validTeacher } from '../../mocks/teacher';

const assertTeacher = async (teacher) => {
  if (teacher.firstName && teacher.lastName) {
    await cy.get(teacherLocators.name).should('contain', `${teacher.firstName} ${teacher.lastName}`);
  }
  if (teacher.regNumber) {
    await cy.get(teacherLocators.regNumber).should('contain', teacher.regNumber);
  }
  if (teacher.regNumber) {
    await cy.get(teacherLocators.regNumber).should('contain', teacher.regNumber);
  }
  if (teacher.phoneNumber) {
    await cy.get(teacherLocators.email).should('contain', teacher.email);
  }
  if (teacher.email) {
    await cy.get(teacherLocators.regNumber).should('contain', teacher.regNumber);
  }
  if (teacher.address) {
    await cy.get(teacherLocators.address).should('contain', teacher.address);
  }
  if (teacher.parent) {
    await cy.get(teacherLocators.parent).should('contain', teacher.parent);
  }
  if (teacher.gender) {
    await cy.get(teacherLocators.gender).should('contain', teacher.gender);
  }
  if (teacher.previousWorkPlace) {
    await cy.get(teacherLocators.previousWorkPlace).should('contain', teacher.previousWorkPlace);
  }
  if (teacher.dob) {
    await cy.get(teacherLocators.dob).should('contain', teacher.dob);
  }
  if (teacher.qualification) {
    await cy.get(teacherLocators.qualification).should('contain', teacher.qualification);
  }
};

context('Update teacher', async () => {
  it('Successfully update a teacher', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const teacher = await createTeacher({ schoolId: school.id, status: 'NEW' });
    await login({ regNumber: overseer.regNumber, school });
    await goToUpdateTeacherPage(teacher.id);
    await fillForm({
      ...validTeacher,
    });
    cy.wait(1000);
    await assertTeacher({
      ...validTeacher,
      status: 'NEW',
    });
  });
});
