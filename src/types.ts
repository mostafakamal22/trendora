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
