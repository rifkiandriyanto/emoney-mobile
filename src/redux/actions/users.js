import http from '../../services/http';
import httpForm from '../../services/httpForm';
import {ip} from '../../services/api';

export const getUserById = (id, token) => {
  return {
    type: 'GETUSERID',
    payload: http(token).get(`${ip}user/${id}`),
  };
};

export const patchUser = (dataUser, token) => {
  return {
    type: 'PATCHUSER',
    payload: httpForm(token).patch(`${ip}profile`, dataUser),
  };
};

export const deleteUser = (id) => {
  return {
    type: 'DELETEUSER',
    payload: http().delete(`${ip}user/${id}`),
  };
};

// export const getUser = (param) => {
//   return {
//     type: 'GETUSER',
//     payload: http().get(`${ip}user?${param}`),
//   };
// };
