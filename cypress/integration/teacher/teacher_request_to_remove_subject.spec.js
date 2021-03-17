import { createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { goToTeacherSubjectsTab, requestToDeleteSubjects } from '../../pages/teacher';
import { goToRequestsPage } from '../../pages/request';
import { createSubject } from '../../api/subject';

context('Request to remove subject from teacher', async () => {
  it('Successfully request to remove subject from tertiary teacher', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const subject = await createSubject({ schoolId: school.id, teacherId: overseer.id });
    const teacher = await createTeacher({
      schoolId: school.id,
      status: 'NEW',
      subjects: [subject.id],
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToTeacherSubjectsTab(teacher.id, school.type);
    await requestToDeleteSubjects([subject.id]);
    await cy.get('#similar-request').should('exist');
    await goToRequestsPage();
    await cy.get(`#REMOVE_SUBJECT_FROM_TEACHER_teachers-${teacher.id}`).should('exist');
  });
});
