import { createStudent, createTeacher } from '../../api/users';
import { createSchool, createSemester } from '../../api/school';
import { createClass } from '../../api/class';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { changeResult, goToStudentManagePastResultTab, locators } from '../../pages/student';
import { createSubject } from '../../api/subject';

context('Manage student past result', async () => {
  it('Change student past result', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveStudentSubject: 0 } });
    const pastSemester = await createSemester({ schoolId: school.id });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const subject = await createSubject({ schoolId: school.id, teacherId: overseer.id });
    const subject2 = await createSubject({ schoolId: school.id, teacherId: overseer.id, name: 'Second subject' });
    const student = await createStudent({
      schoolId: school.id,
      classId: clazz.id,
      status: 'ACTIVE',
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToStudentManagePastResultTab(student.id);
    await changeResult(pastSemester.id, [subject.id, subject2.id], [60, 70]);
    await cy.reload();
    await goToStudentManagePastResultTab(student.id);
    await cy.get(`${locators.resultSubjectInput}${subject.id}`).should('have.value', 60);
    await cy.get(`${locators.resultSubjectInput}${subject2.id}`).should('have.value', 70);
  });
});
