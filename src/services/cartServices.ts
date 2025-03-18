import axios from "axios";
import { CartType } from "@/types/type";

export const getCartById = async (cartId: number, token: string, callBack: (data: CartType) => void) => {
    try {
        const response = await axios.get(`http://localhost:5001/cart/${cartId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(response.status == 200){
            callBack(response.data.data)
        }else{
            console.error("Failed to get cart by id.");
        }
    } catch (error) {
        console.log("Failed to getCartById");
    }
}