import http from '../../services/http';
const ip = 'http://192.168.43.88:8000/';

export const loginUser = (dataSubmit) => {
  return {
    type: 'LOGIN',
    payload: http().post(`${ip}auth/login`, dataSubmit),
  };
};
export const registerUser = (dataSubmit) => {
  return {
    type: 'REGISTER',
    payload: http().post(`${ip}auth/register`, dataSubmit),
  };
};
export const verifyUser = (otp) => {
  return {
    type: 'REGISTER',
    payload: http().patch(`${ip}auth/activation`, otp),
  };
};
export const logout = () => {
  return {
    type: 'LOGOUT',
    payload: '',
  };
};
export const forgot = (dataSubmit) => {
  return {
    type: 'REGISTER',
    payload: http().post(`${ip}auth/forgot-password`, dataSubmit),
  };
};
export const reset = (dataSubmit) => {
  return {
    type: 'REGISTER',
    payload: http().patch(`${ip}auth/reset-password`, dataSubmit),
  };
};
export const dataUser = (id, token) => {
  return {
    type: 'USERID',
    payload: http(token).get(`${ip}user/${id}`),
  };
};
