import axios from 'axios';
import { getTime } from 'date-fns';
import {
  API, ROLES, STATUSSES, USER_PASSWORD_HASH,
} from '../helpers/constants';
import mocks from '../helpers/mocks';
import { twentyYearAgo } from '../helpers/timeConstants';

const createTeacher = async ({
  regNumber = `AD${getTime(new Date())}`,
  firstName = mocks.firstName,
  lastName = mocks.lastName,
  gender = mocks.maleGender,
  dob = twentyYearAgo,
  email = `testTeacher${getTime(new Date())}@screenline.com`,
  phoneNumber = getTime(new Date()),
  qualification = mocks.qualification,
  previousWorkPlace = mocks.previousWorkPlace,
  language = mocks.language,
  stateOfOrigin = mocks.stateOfOrigin,
  schoolId,
  role = ROLES.ADMIN,
  password = USER_PASSWORD_HASH,
  address = mocks.address,
  status = STATUSSES.ACTIVE,
  subjects = [],
  nationality = mocks.countryCode,
} = {}) => {
  const { data } = await axios.post(API.QA_BACKDOOR_URL, {
    regNumber,
    firstName,
    lastName,
    gender,
    dob,
    email,
    phoneNumber,
    qualification,
    previousWorkPlace,
    stateOfOrigin,
    schoolId,
    password,
    status,
    language,
    address,
    nationality,
    role,
    subjects,
    action: API.CREARE_TEACHER,
  });
  return data;
};

const createStudent = async ({
  regNumber = `ST${getTime(new Date())}`,
  firstName = mocks.firstName,
  lastName = mocks.lastName,
  gender = mocks.maleGender,
  dob = twentyYearAgo,
  email = `student${getTime(new Date())}@kuma.com`,
  phoneNumber = getTime(new Date()),
  previousSchool = mocks.previousSchool,
  language = mocks.language,
  stateOfOrigin = mocks.stateOfOrigin,
  parentsIds = [],
  schoolId,
  classId,
  semesterId,
  role = ROLES.STUDENT,
  password = USER_PASSWORD_HASH,
  subjects = {},
  address = mocks.address,
  status = STATUSSES.ACTIVE,
  nationality = mocks.countryCode,
} = {}) => {
  const { data } = await axios.post(API.QA_BACKDOOR_URL, {
    regNumber,
    firstName,
    lastName,
    gender,
    classId,
    semesterId,
    dob,
    email,
    phoneNumber,
    previousSchool,
    stateOfOrigin,
    schoolId,
    password,
    status,
    language,
    address,
    nationality,
    role,
    subjects,
    parentsIds,
    programme: 'programme test',
    level: '1',
    countryOfResidence: 'NG',
    stateOfResidence: 'BENUE',
    action: API.CREATE_STUDENT,
  });
  return data;
};

const createParent = async ({
  firstName = mocks.firstName,
  lastName = mocks.lastName,
  regNumber = `PA${getTime(new Date())}`,
  gender = mocks.femaleGender,
  email = `parent${getTime(new Date())}@screenline.com`,
  phoneNumber = getTime(new Date()),
  nationality = mocks.countryCode,
  language = mocks.language,
  role = ROLES.PARENT,
  stateOfOrigin = mocks.countryCode,
  schoolId,
  password = USER_PASSWORD_HASH,
  address = mocks.address,
  status = STATUSSES.ACTIVE,
  dob = twentyYearAgo,
  students = [],
} = {}) => {
  const { data } = await axios.post(API.QA_BACKDOOR_URL, {
    action: 'createParent',
    firstName,
    lastName,
    regNumber,
    gender,
    email,
    phoneNumber,
    nationality,
    language,
    role,
    stateOfOrigin,
    schoolId,
    password,
    address,
    status,
    dob,
    students,
  });
  return data;
};

export {
  createTeacher,
  createStudent,
  createParent,
};
