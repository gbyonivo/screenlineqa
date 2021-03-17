import { createStudent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { createClass } from '../../api/class';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { changeStatus, goToStudentUpdateStatusTab, locators } from '../../pages/student';
import { createSubject } from '../../api/subject';

context('Change student status', async () => {
  it('Successfully change student status to suspended', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveStudentSubject: 0 } });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const subject = await createSubject({ schoolId: school.id, teacherId: overseer.id });
    const student = await createStudent({
      schoolId: school.id,
      classId: clazz.id,
      status: 'NEW',
      subjects: { subjectsIds: [subject.id], semesterId: school.semesterId },
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToStudentUpdateStatusTab(student.id);
    await cy.get(locators.userStatus).should('have.value', 'NEW');
    await changeStatus('SUSPENDED', overseer.regNumber);
    await cy.reload();
    await cy.wait(1000);
    await goToStudentUpdateStatusTab(student.id);
    await cy.get(locators.userStatus).should('have.value', 'SUSPENDED');
  });

  it('Successfully change student status to password_reset', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveStudentSubject: 0 } });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const subject = await createSubject({ schoolId: school.id, teacherId: overseer.id });
    const student = await createStudent({
      schoolId: school.id,
      classId: clazz.id,
      status: 'NEW',
      subjects: { subjectsIds: [subject.id], semesterId: school.semesterId },
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToStudentUpdateStatusTab(student.id);
    await changeStatus('PASSWORD_RESET', overseer.regNumber);
    await cy.reload();
    await cy.wait(1000);
    await goToStudentUpdateStatusTab(student.id);
    await cy.get(locators.userStatus).should('have.value', 'PASSWORD_RESET');
  });

  it('Successfully change student status to alumni', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveStudentSubject: 0 } });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const subject = await createSubject({ schoolId: school.id, teacherId: overseer.id });
    const student = await createStudent({
      schoolId: school.id,
      classId: clazz.id,
      status: 'NEW',
      subjects: { subjectsIds: [subject.id], semesterId: school.semesterId },
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToStudentUpdateStatusTab(student.id);
    await changeStatus('ALUMNI', overseer.regNumber);
    await cy.reload();
    await cy.wait(1000);
    await goToStudentUpdateStatusTab(student.id);
    await cy.get(locators.userStatus).should('have.value', 'ALUMNI');
  });

  it('Successfully change student status to special ALLOW STUDENT REGISTRATIOJ', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveStudentSubject: 0 } });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const subject = await createSubject({ schoolId: school.id, teacherId: overseer.id });
    const student = await createStudent({
      schoolId: school.id,
      classId: clazz.id,
      status: 'NEW',
      subjects: { subjectsIds: [subject.id], semesterId: school.semesterId },
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToStudentUpdateStatusTab(student.id);
    await changeStatus('SPECIAL', overseer.regNumber);
    await cy.reload();
    await cy.wait(1000);
    await goToStudentUpdateStatusTab(student.id);
    await cy.get(locators.userStatus).should('have.value', 'SPECIAL');
  });

  it('Successfully change student status to NEW', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveStudentSubject: 0 } });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const subject = await createSubject({ schoolId: school.id, teacherId: overseer.id });
    const student = await createStudent({
      schoolId: school.id,
      classId: clazz.id,
      status: 'SUSPENDED',
      subjects: { subjectsIds: [subject.id], semesterId: school.semesterId },
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToStudentUpdateStatusTab(student.id);
    await changeStatus('NEW', overseer.regNumber);
    await cy.reload();
    await cy.wait(1000);
    await goToStudentUpdateStatusTab(student.id);
    await cy.get(locators.userStatus).should('have.value', 'NEW');
  });
});
