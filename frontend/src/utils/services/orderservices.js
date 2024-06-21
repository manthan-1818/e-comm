import axiosInstance from '../services/axios';

export const fetchOrders = async () => {
  const response = await axiosInstance.get('/order/fetch-order');
  console.log("hhhhhhhhhh",response.data);
  return response.data; // Ensure this matches the structure { message: '', orders: [] }
};

// export const fetchAllOrders = async () => {
//   const response = await axiosInstance.get('/order/fetch-order');
// };
// console.log("hhhhhhhhhh",response.data);