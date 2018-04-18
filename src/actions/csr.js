import { GET_USERS_CSR } from '../types';
import api from '../api';

export const getCsr = payload => ({
  type: GET_USERS_CSR,
  payload,
});

export const getCsrInformation = id => dispatch =>
  api.csr.getCsrById(id).then(csr => {
    dispatch(getCsr(csr));
  });
