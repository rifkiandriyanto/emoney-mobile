import http from '../../services/http';
import {ip} from '../../services/api';

const getPromo = (token, search, sort, page) => {
  return {
    type: 'GETPROMO',
    payload: http(token).get(
      `${ip}promo?search=${search}&sort=${sort}&page=${page}`,
    ),
  };
};

export {getPromo};
