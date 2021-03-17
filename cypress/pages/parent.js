import { searchAndSelect } from '../forms/search_and_select';
import { BASE_URL } from '../helpers/constants';

const CREATE_PARENT_URL = `${BASE_URL}/parents/create`;
const PARENT_URL = `${BASE_URL}/parents`;

const locators = {
  name: '#parentName',
  regNumber: '#parentRegNumber',
  phoneNumber: '#parentPhoneNumber',
  email: '#parentEmail',
  address: '#parentAddress',
  dob: '#parentDob',
  gender: '#parentGender',
  updateStatusTab: '#Update-status',
  removeKidsTab: '#Remove-students',
  deleteBtn: 'button[name=yes]',
  kidsTab: '#Kids',
  requestToRemoveKidsButton: '#kidsToRemove_submitBtn',
  userStatus: '#status',
  userRegNumber: '#regNumber',
  userStatusBtn: 'button[name=updateStatus]',
  editButton: 'button[name=edit]',
  deleteButton: 'button[name=delete]',
};

const goToParentPage = async (parentId) => {
  await cy.visit(`${PARENT_URL}/${parentId}`);
};

const goToCreateParentPage = async () => {
  await cy.visit(CREATE_PARENT_URL);
};

const goToUpdateParentPage = async (parentId) => {
  await cy.visit(`${PARENT_URL}/${parentId}/update`);
};

const goToDeleteParentPage = async (parentId) => {
  await cy.visit(`${PARENT_URL}/${parentId}/delete`);
};

const goToParentUpdateStatusTab = async (parentId) => {
  await cy.visit(`${PARENT_URL}/${parentId}`);
  await cy.get(locators.updateStatusTab).click();
};

const goToParentKidsTab = async (parentId) => {
  await cy.visit(`${PARENT_URL}/${parentId}`);
  await cy.get(locators.removeKidsTab).click();
};

const removeKidsFromParent = async (subjectsIds = []) => {
  await searchAndSelect('kidsToRemove', subjectsIds);
  await cy.get(locators.requestToRemoveKidsButton).click();
};

const confirmRequest = async () => {
  await cy.get(locators.deleteBtn).click();
};

const changeStatus = async (status, regNumber) => {
  await cy.get(locators.userStatus).select(status);
  await cy.get(locators.userRegNumber).clear().type(regNumber);
  await cy.get(locators.userStatusBtn).click();
};

export {
  goToCreateParentPage,
  removeKidsFromParent,
  goToUpdateParentPage,
  goToParentPage,
  goToParentUpdateStatusTab,
  goToParentKidsTab,
  confirmRequest,
  changeStatus,
  CREATE_PARENT_URL,
  locators,
  goToDeleteParentPage,
};
