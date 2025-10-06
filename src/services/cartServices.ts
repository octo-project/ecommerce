import axios from "axios";

const host = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`

export const getCartById = async (cartId: number, token: string) => {
    const response = await axios.get(`${host}/cart/${cartId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.data
}

