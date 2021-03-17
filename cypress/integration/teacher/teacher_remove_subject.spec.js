import { createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { goToTeacherSubjectsTab, removeSubjectsFromTeacher } from '../../pages/teacher';
import { createSubject } from '../../api/subject';

context('Remove subject from teacher', async () => {
  it('Successfully remove subject from tertiary teacher', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveTeacherSubject: 0 } });
    const subject = await createSubject({ schoolId: school.id, teacherId: overseer.id });
    const teacher = await createTeacher({
      schoolId: school.id,
      status: 'NEW',
      subjects: [subject.id],
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToTeacherSubjectsTab(teacher.id, school.type);
    await removeSubjectsFromTeacher([subject.id]);
    await cy.get('#nothing-to-remove').should('exist');
    await cy.get('#similar-request').should('not.exist');
  });
});
