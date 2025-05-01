/**
 * Decoded Token
 * - dont use pseudo from DecodedTokenType 
 * instead use the userId to get the pseudo
 * - i put the token here to avoid getting 
 * token from localStorage
 */
export type DecodedTokenType = {
    exp: number; 
    iat: number; 
    token: string;
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