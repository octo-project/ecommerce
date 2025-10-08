import axios from 'axios';

const host = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;

export const authentificate = async (
  pseudo: string,
  password: string,
  callBack: (token: string | null, redictUrl: string) => void
) => {
  try {
    const response = await axios.post(`${host}/login`, {
      pseudo,
      password,
    });

    if (response.status == 201) {
      callBack(response.data.data.token, response.data.data.redirectUrl);
      return;
    }
  } catch (error) {
    callBack(null, '');
  }
};

export const signUp = async (
  email: string,
  pseudo: string,
  password: string
) => {
  try {
    return await axios.post(`${host}/signup`, {
      email,
      pseudo,
      password,
    });
  } catch (error) {
    throw new Error('Error while sign up.');
  }
};
