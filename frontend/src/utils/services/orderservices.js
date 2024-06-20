import axiosInstance from '../services/axios';

export const fetchAllOrders = async () => {
  return axiosInstance.get('/order/fetch-order');
};
export const fetchOrders = async () => {
  return axiosInstance.get('/order/fetch-orderr');
};
