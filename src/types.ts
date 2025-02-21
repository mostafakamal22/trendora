export type LoginResponse = {
  message?: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
  token?: string;
};

export interface VerfiyToken {
  message: string;
  decoded: Decoded;
}

export interface Decoded {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

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

export interface ProductElement {
  count: number;
  _id: string;
  product: ProductMinimalDetails;
  price: number;
}

export interface ProductMinimalDetails {
  subcategory: Category[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface Cart {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: ProductElement[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  totalCartPrice: number;
}

export interface Checkout {
  status: string;
  session: CheckoutSession;
}

export interface CheckoutSession {
  url: string;
  success_url: string;
  cancel_url: string;
}

export type Orders = Order[];

export interface Order {
  shippingAddress?: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: PaymentMethodType;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  createdAt: Date;
  updatedAt: Date;
  id: number;
  __v: number;
  paidAt?: Date;
}

export interface CartItem {
  count: number;
  product: Product;
  price: number;
  _id: string;
}

export enum PaymentMethodType {
  Card = "card",
  Cash = "cash",
}

export interface ShippingAddress {
  details: string;
  phone?: string;
  city: string;
  postalCode?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface User {
  role: string;
  active: boolean;
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  addresses: Address[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}
