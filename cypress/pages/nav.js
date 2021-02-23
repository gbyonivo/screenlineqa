const locators = {
  school: '#schoolName',
  addNewButton: 'button[name=newButton]',
};

const clickAddNew = async () => {
  await cy.get(locators.addNewButton).click();
};

export {
  locators,
  clickAddNew,
};
