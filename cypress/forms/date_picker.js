const pickDate = (year, month, day, baseId) => {
  cy.get(`datePicker-${baseId} input[name=year]`).clear().type(year);
  cy.get(`datePicker-${baseId} input[name=month]`).clear().type(month);
  cy.get(`datePicker-${baseId} input[name=year]`).clear().type(day);
};

const pickTime = () => {};

const pickDateTime = () => {};

export {
  pickDate,
  pickTime,
  pickDateTime,
};
