import axios from "axios";

export const getCartById = async (cartId: number, token: string) => {
    const response = await axios.get(`http://localhost:5001/cart/${cartId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.data
}

