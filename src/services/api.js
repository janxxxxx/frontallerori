import axios from 'axios';

// Cambia esta URL si el backend está en un host o puerto diferente
const BASE_URL = 'http://localhost:8084/proveedor';

export const getAllProveedores = async () => {
  // Endpoint: /proveedor/listar
  return await axios.get(`${BASE_URL}/listar`);
};

export const createProveedor = async (data) => {
  // Endpoint: /proveedor/create
  return await axios.post(`${BASE_URL}/create`, data);
};

export const getProveedorById = async (id) => {
  // Endpoint: /proveedor/get/{id}
  return await axios.get(`${BASE_URL}/get/${id}`);
};

export const updateProveedor = async (id, data) => {
  // Endpoint: /proveedor/update
  return await axios.put(`${BASE_URL}/update`, data);
};

export const deleteProveedor = async (id) => {
  // Endpoint: /proveedor/delete/{id}
  return await axios.delete(`${BASE_URL}/delete/${id}`);
};
