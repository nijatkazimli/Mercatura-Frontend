export type ProductCategory = {
 id: string,
 name: string,
};

export type Product = {
  id: string,
  name: string,
  description?: string | null,
  averageRating: number,
  price: number,
  image?: string | null,
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
