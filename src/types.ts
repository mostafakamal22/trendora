export type LoginResponse = {
  message?: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
  token?: string;
};

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Categories {
  results: number;
  metadata: Metadata;
  data: Category[];
}

export interface Products {
  results: number;
  metadata: Metadata;
  data: Product[];
}

export interface Product {
  sold: number;
  images: string[];
  subcategory: Category[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: string[];
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  category?: string;
}

export interface Brands {
  results: number;
  metadata: Metadata;
  data: Brand[];
}

export interface WishList {
  status: string;
  count: number;
  data: Product[];
}
