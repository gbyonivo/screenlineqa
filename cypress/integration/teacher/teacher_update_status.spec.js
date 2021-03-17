import { createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { changeStatus, goToTeacherUpdateStatusTab, locators } from '../../pages/teacher';

context('Change teacher status', async () => {
  it('Successfully change teacher status to suspended', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveTeacherSubject: 0 } });
    const teacher = await createTeacher({
      schoolId: school.id,
      status: 'NEW',
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToTeacherUpdateStatusTab(teacher.id);
    await cy.get(locators.userStatus).should('have.value', 'NEW');
    await changeStatus('SUSPENDED', overseer.regNumber);
    await cy.reload();
    await cy.wait(1000);
    await goToTeacherUpdateStatusTab(teacher.id);
    await cy.get(locators.userStatus).should('have.value', 'SUSPENDED');
  });

  it('Successfully change teacher status to password_reset', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveTeacherSubject: 0 } });
    const teacher = await createTeacher({
      schoolId: school.id,
      status: 'NEW',
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToTeacherUpdateStatusTab(teacher.id);
    await changeStatus('PASSWORD_RESET', overseer.regNumber);
    await cy.reload();
    await cy.wait(1000);
    await goToTeacherUpdateStatusTab(teacher.id);
    await cy.get(locators.userStatus).should('have.value', 'PASSWORD_RESET');
  });

  it('Successfully change teacher status to alumni', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveTeacherSubject: 0 } });
    const teacher = await createTeacher({
      schoolId: school.id,
      status: 'NEW',
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToTeacherUpdateStatusTab(teacher.id);
    await changeStatus('ALUMNI', overseer.regNumber);
    await cy.reload();
    await cy.wait(1000);
    await goToTeacherUpdateStatusTab(teacher.id);
    await cy.get(locators.userStatus).should('have.value', 'ALUMNI');
  });

  it('Successfully change teacher status to special ALLOW TEACHER REGISTRATIOJ', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveTeacherSubject: 0 } });
    const teacher = await createTeacher({
      schoolId: school.id,
      status: 'NEW',
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToTeacherUpdateStatusTab(teacher.id);
    await changeStatus('SPECIAL', overseer.regNumber);
    await cy.reload();
    await cy.wait(1000);
    await goToTeacherUpdateStatusTab(teacher.id);
    await cy.get(locators.userStatus).should('have.value', 'SPECIAL');
  });

  it('Successfully change teacher status to NEW', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveTeacherSubject: 0 } });
    const teacher = await createTeacher({
      schoolId: school.id,
      status: 'SUSPENDED',
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToTeacherUpdateStatusTab(teacher.id);
    await changeStatus('NEW', overseer.regNumber);
    await cy.reload();
    await cy.wait(1000);
    await goToTeacherUpdateStatusTab(teacher.id);
    await cy.get(locators.userStatus).should('have.value', 'NEW');
  });
});
