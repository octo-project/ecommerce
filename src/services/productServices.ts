import axios from "axios";
import { ProductType } from "@/types/type";

export const productList = async (token: string) : Promise<ProductType[]> => {
    const response = await axios.get("http://localhost:5001/product-list", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.data
}