const searchAndSelect = async (baseId, itemsIds = [], searchText) => {
  await cy.get(`#${baseId}_toggle`).click();
  if (searchText) await cy.get(`#${baseId}-search-value`).clear().type(searchText);
  await cy.wait(1000);
  for (let i = 0; i < itemsIds.length; i += 1) {
    await cy.get(`#${baseId}_option_${itemsIds[i]}`).click(); // eslint-disable-line
  }
  await cy.get(`#${baseId}_toggle`).click();
};

export {
  searchAndSelect, // eslint-disable-line
};
