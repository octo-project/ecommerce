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

export type UserType = {
    id: number; 
    email: string;
    pseudo: string;
    createdAt: string;
    firstName: string;
    updatedAt: string;
}

export type CartProductItemType = {
    name: string;
    image: string; 
    price: string;
}

export type CartProductType = {
    id: number; 
    cartId: number; 
    quantity: number;
    productId: number; 
    Product: CartProductItemType;
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

export type ProductType = {
    id: number; 
    name: string; 
    price: number; 
    image: string; 
    createdAt: string; 
    updatedAt: string;
    description: string;
}