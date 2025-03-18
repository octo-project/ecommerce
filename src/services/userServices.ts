import axios from "axios";
import { UserType } from "@/types/type";

export const getUserDetail = async (userId: number, token: string, callBack: (data: UserType)=>void) => {
    try {
        const response = await axios.get(`http://localhost:5001/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(response.status == 200){
            callBack(response.data.data)
        }else
            console.error("Failed to get user detail");
    } catch (error) {
        console.error("Failed to get user detail");
    }
}