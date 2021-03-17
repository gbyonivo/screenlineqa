import { getTime } from 'date-fns';

const validTertiaryStudent = {
  firstName: `Johnny${getTime(new Date())}`,
  lastName: `Clover${getTime(new Date())}`,
  regNumber: `TET${getTime(new Date())}`,
  email: `email${getTime(new Date())}@radio.com`,
  programme: 'Computer science',
  gender: 'Male',
  nationality: 'GH',
  previousSchool: 'Height School',
  phoneNumber: `${getTime(new Date())}`,
  year: '1',
  countryOfResidence: 'GH',
  stateOfResidence: 'Outside Nigeria',
  address: 'This is an address',
  dob: '1992-05-11',
};

const validPrimaryStudent = {
  firstName: `Ray${getTime(new Date())}`,
  lastName: `Tony${getTime(new Date())}`,
  regNumber: `PRIM${getTime(new Date())}`,
  gender: 'Male',
  previousSchool: 'Height School',
  countryOfResidence: 'GH',
  stateOfResidence: 'Outside Nigeria',
  dob: '2010-11-07',
};

export {
  validTertiaryStudent,
  validPrimaryStudent,
};
