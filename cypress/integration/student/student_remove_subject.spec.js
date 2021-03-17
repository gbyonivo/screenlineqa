import { createStudent, createTeacher } from '../../api/users';
import { createSchool } from '../../api/school';
import { createClass } from '../../api/class';
import { ROLES } from '../../helpers/constants';
import { login } from '../../pages/login';
import { goToStudentSubjectsTab, removeSubjectsFromStudent } from '../../pages/student';
import { createSubject } from '../../api/subject';

context('Remove subject from student', async () => {
  it('Successfully remove subject from tertiary student', async () => {
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
    await goToStudentSubjectsTab(student.id, school.type);
    await removeSubjectsFromStudent([subject.id]);
    await cy.get('#nothing-to-remove').should('exist');
    await cy.get('#similar-request').should('not.exist');
  });

  it('Successfully remove subject from primary student', async () => {
    const overseer = await createTeacher({ role: ROLES.OVERSEER });
    const school = await createSchool({ overseer, settings: { requestToRemoveStudentSubject: 0 }, type: 'PRIMARY' });
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
    await removeSubjectsFromStudent([subject.id]);
    await cy.get('#nothing-to-remove').should('exist');
    await cy.get('#similar-request').should('not.exist');
  });
});
