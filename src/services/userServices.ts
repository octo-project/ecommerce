import axios from 'axios';
import { UserType } from '@/types/type';

const host = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;

export const getUserDetail = async (
  userId: number,
  token: string,
  callBack: (data: UserType) => void
) => {
  try {
    const response = await axios.get(`${host}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      callBack(response.data.data);
    } else console.error('Failed to get user detail');
  } catch (error) {
    console.error('Failed to get user detail');
  }
};

export const getDashboardUserList = async (
  token: string,
  callBack: (data: any) => void
) => {
  try {
    const response = await axios.get(`${host}/dashboard/user-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      callBack(response.data);
    } else {
      console.error('Failed to get dashboard user list');
    }
  } catch (error) {
    console.error('Failed to get dashboard user list');
  }
};
