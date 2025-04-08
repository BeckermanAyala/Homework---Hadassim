import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (phoneNumber: string, password: string) => {
  const res = await api.post('/suppliers/login', { phoneNumber, password });
  return res.data;
};

export const register = async (data: any) => {
  const res = await api.post('/suppliers/register', data);
  return res.data;
};

export const getOrdersBySupplier = async (supplierId: string) => {
  const res = await api.get(`/orders/supplier/${supplierId}`);
  return res.data;
};

export const createOrder = async (orderData: any) => {
  const res = await api.post('/orders', orderData);
  return res.data;
};

export const getAllOrders = async () => {
    const res = await api.get('/orders');
    return res.data;
  };

export const updateOrderStatus = async (orderId: string, status: string) => {
  const res = await api.put(`/orders/${orderId}/status`, { status });
  return res.data;
};
export const getSuppliers = async () => {
    const res = await api.get('/suppliers');
    return res.data;
  };
  
  