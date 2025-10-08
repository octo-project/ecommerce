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
};

export type UserType = {
  id: number;
  email: string;
  pseudo: string;
  createdAt: string;
  firstName: string;
  updatedAt: string;
};

export type CartProductItemType = {
  name: string;
  image: string;
  price: string;
};

export type CartProductType = {
  id: number;
  cartId: number;
  quantity: number;
  productId: number;
  Product: CartProductItemType;
};

export type CartType = {
  id: number;
  userid: number;
  status: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  Products: CartProductType[];
};

export type ProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  description: string;
};

export type DashBoardProductType = Omit<ProductType, 'createdAt' | 'updatedAt'>;
