import axios from 'axios';
import { DashBoardProductType, ProductType } from '@/types/type';

const host = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;

export const productList = async (token: string): Promise<ProductType[]> => {
  const response = await axios.get(`${host}/product-list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const getDashboardProductList = async (
  token: string
): Promise<DashBoardProductType[]> => {
  const response = await axios.get(`${host}/product-list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data.sort((a, b) => b.id - a.id);
};
