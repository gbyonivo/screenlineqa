const pickDate = async (date, baseId) => {
  if (!date || !baseId) return;
  const [year, month, day] = date.split('-');
  await cy.get(`#datePicker-${baseId} input[name=year]`).clear().type(year);
  await cy.get(`#datePicker-${baseId} input[name=month]`).clear().type(month);
  await cy.get(`#datePicker-${baseId} input[name=day]`).clear().type(day);
};

const pickTime = () => {};

const pickDateTime = () => {};

export {
  pickDate,
  pickTime,
  pickDateTime,
};
