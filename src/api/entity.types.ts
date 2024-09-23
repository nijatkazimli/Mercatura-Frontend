export type ProductCategory = {
 id: string,
 name: string,
};

export type Product = {
  id: string,
  name: string,
  description?: string | null,
  rating: number,
  price: number,
  images?: Array<string> | null,
  category: string,
};

export type Review = {
  id: string,
  content?: string | null,
  rating: number,
  authorFullName: string,
  productId: string,
};

export type AuthResponse = {
  id: string,
  token: string,
};

export type CartResponse = {
  id: string,
  userId: string,
  productIds: string[],
  totalValue: number,
  paid: boolean,
};

export type IdResponse = {
  id: string,
};

export type MinMaxResponse = {
  min: number,
  max: number,
};

export type ProductsResponse = {
  numberOfPages: number,
  priceRange: MinMaxResponse,
  products: Array<Product>,
}

export type CartsResponse = Array<CartResponse>;
