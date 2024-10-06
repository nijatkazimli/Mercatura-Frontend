export type User = {
  id: string,
  firstName: string,
  lastName: string,
  userName: string,
  roles: Array<string>,
  profileImage?: string | null,
}

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

export type AddProduct = Omit<Product, 'id' | 'rating' | 'category'> & { categoryId: string };

export type Review = {
  id: string,
  content?: string | null,
  rating: number,
  authorFullName: string,
  authorProfileImage?: string | null,
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

export type CategoriesResponse = Array<ProductCategory>;

export type UserStatistics = {
  totalCount: number,
  adminCount: number,
  merchandiserCount: number,
  regularUserCount: number,
};

export type ProductStatistics = {
  totalCount: number,
  totalPrice: number,
};

export type CartStatistics = {
  totalCount: number,
  totalPrice: number,
  paidCount: number,
  paidPrice: number,
  unPaidCount: number,
  unPaidPrice: number,
};

export type Statistics = UserStatistics | ProductStatistics | CartStatistics;
