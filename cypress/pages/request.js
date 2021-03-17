import { BASE_URL } from '../helpers/constants';

const REQUEST_URL = `${BASE_URL}/requests`;

const goToRequestsPage = async () => {
  await cy.visit(REQUEST_URL);
};

const acceptRequest = async () => {};

const declineRequest = async () => {};

export {
  goToRequestsPage,
  acceptRequest,
  declineRequest,
};
