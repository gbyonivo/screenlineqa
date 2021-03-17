import { createStudent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { createClass } from '../../api/class';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { goToStudentSubjectsTab, requestToDeleteSubjects } from '../../pages/student';
import { goToRequestsPage } from '../../pages/request';
import { createSubject } from '../../api/subject';

context('Request to remove subject from student', async () => {
  it('Successfully request to remove subject from tertiary student', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const subject = await createSubject({ schoolId: school.id, teacherId: overseer.id });
    const student = await createStudent({
      schoolId: school.id,
      classId: clazz.id,
      status: 'NEW',
      subjects: { subjectsIds: [subject.id], semesterId: school.semesterId },
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToStudentSubjectsTab(student.id, school.type);
    await requestToDeleteSubjects([subject.id]);
    await cy.get('#similar-request').should('exist');
    await goToRequestsPage();
    await cy.get(`#REMOVE_SUBJECT_FROM_STUDENT_students-${student.id}`).should('exist');
  });

  it('Successfully request to remove subject from primary student', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, type: 'PRIMARY' });
    const clazz = await createClass({ teacherId: overseer.id, schoolId: school.id });
    const subject = await createSubject({ schoolId: school.id, teacherId: overseer.id });
    const student = await createStudent({
      schoolId: school.id,
      classId: clazz.id,
      status: 'NEW',
      subjects: { subjectsIds: [subject.id], semesterId: school.semesterId },
    });
    await login({ regNumber: overseer.regNumber, school });
    await goToStudentSubjectsTab(student.id, school.type);
    await requestToDeleteSubjects([subject.id]);
    await cy.get('#similar-request').should('exist');
    await goToRequestsPage();
    await cy.get(`#REMOVE_SUBJECT_FROM_STUDENT_students-${student.id}`).should('exist');
  });
});
