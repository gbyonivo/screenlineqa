import { getTime } from 'date-fns';

const validParent = {
  firstName: `Johnny${getTime(new Date())}`,
  lastName: `Clover${getTime(new Date())}`,
  regNumber: `PAR${getTime(new Date())}`,
  email: `email${getTime(new Date())}@radio.com`,
  qualification: 'M.Sc. Computer science',
  gender: 'Male',
  nationality: 'GH',
  previousWorkPlace: 'Height School',
  phoneNumber: `${getTime(new Date())}`,
  countryOfResidence: 'GH',
  stateOfResidence: 'Outside Nigeria',
  address: 'This is an address',
  dob: '1992-05-11',
};

export { validParent }; // eslint-disable-line