import axios from "axios";
import { DashBoardProductType, ProductType } from "@/types/type";

export const productList = async (token: string) : Promise<ProductType[]> => {
    const response = await axios.get("http://localhost:5001/product-list", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.data
}

export const getDashboardProductList = async (token: string) : Promise<DashBoardProductType[]> => {
    const response = await axios.get("http://localhost:5001/product-list", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.data.sort((a,b) => b.id - a.id)
}