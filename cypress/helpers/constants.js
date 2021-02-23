const SCHOOL_TYPES = {
  TERTIARY: 'TERTIARY',
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
};

const API = {
  QA_BACKDOOR_URL: 'http://localhost:8080/qa_back_door',
  CREATE_SCHOOL: 'createSchool',
  CREATE_SEMESTER: 'createSemester',
  CREATE_STUDENT: 'createStudent',
  CREARE_TEACHER: 'createTeacher',
  CREATE_CLASS: 'createClass',
  CREATE_SUBJECT: 'createSubject',
  CREATE_NOTE: 'createNote',
  CREATE_PARENT: 'createParent',
  CREATE_ASSESSMENT: 'createAssessment',
  CREATE_NEWS: 'createNews',
  CREATE_GRADE: 'createGrade',
  CREATE_PERIOD: 'createPeriod',
  CREATE_QUIZ: 'createQuiz',
  CREATE_TAG: 'createTag',
};

const ROLES = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  OVERSEER: 'OVERSEER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT',
  SUBJECT_ADMIN: 'SUBJECT_ADMIN',
};

const STATUSSES = {
  ACTIVE: 'ACTIVE',
};

const ASSESSMENT_TYPES = {
  ASSIGNMENT: 'ASSIGNMENT',
  QUIZ: 'QUIZ',
  EXAM: 'EXAM',
};

const PERIOD_TYPES = {
  TIMETABLE: 'TIMETABLE',
  EVENT: 'EVENT',
};

const USER_PASSWORD_HASH = '$2a$12$jJsLPQnp8VGtxHRtgpc7FOECBf.II4e3YjC3H/Vpo1/4.Q6afrWDS';
const USER_PASSWORD = 'P@ssw0rd1234';

const BASE_URL = 'http://localhost:3000';

export {
  SCHOOL_TYPES,
  API,
  ROLES,
  STATUSSES,
  USER_PASSWORD,
  ASSESSMENT_TYPES,
  PERIOD_TYPES,
  BASE_URL,
  USER_PASSWORD_HASH,
};
