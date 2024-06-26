import axiosInstance from '../services/axios';

export const fetchOrder = async (userId) => {
  const response = await axiosInstance.get(`/order/fetch-order?userId=${userId}`);
  console.log("hhhhhhhhhh",response.data);
  return response.data; 
};

// export const fetchAllOrders = async () => {
//   const response = await axiosInstance.get('/order/fetch-order');
// };
// console.log("hhhhhhhhhh",response.data);