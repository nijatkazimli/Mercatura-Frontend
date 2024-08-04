export type ProductCategory = {
 id: string,
 name: string,
};

export type Product = {
  id: string,
  name: string,
  description?: string | null,
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
}
