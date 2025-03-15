/**
 * Token
 */
export type DecodedTokenType = {
    exp: number; 
    iat: number; 
    email: string;
    pseudo: string; 
    userId: number;
    cartId: number | null;
}

export type ProductType = {
    name: string;
    image: string; 
    price: string;
}

export type CartProductType = {
    id: number; 
    cartId: number; 
    quantity: number;
    productId: number; 
    Product: ProductType;
}

export type CartType = { 
    id: number; 
    userid: number;
    status: string;
    amount: number;
    createdAt: string; 
    updatedAt: string; 
    Products: CartProductType[];
}