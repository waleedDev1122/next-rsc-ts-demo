// types.ts

// ✅ Literal types
export type AvailabilityStatus = 'In Stock' | 'Low Stock' | 'Out Of Stock';

// ✅ Enum
export enum Category {
  Beauty = 'beauty',
  Fragrances = 'fragrances',
  // Extend as needed
}

// ✅ Tuples (for CSV export/import)
export type ProductCSVRow = [
  id: number,
  title: string,
  category: Category,
  price: number
];

// ✅ Dimensions structure
export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

// ✅ Meta object
export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

// ✅ Review object
export interface Review {
  rating: number | string; // Union type
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

// ✅ Main Product interface
export interface Product {
  id: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: AvailabilityStatus;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

// ✅ Generic API response using generics
export interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}

// ✅ Utility types for real-world scenarios

// For listing UI cards
export type ProductPreview = Pick<
  Product,
  'id' | 'title' | 'price' | 'thumbnail' | 'category' | 'rating'
>;

// For form creation (excluding server-managed fields)
export type ProductForm = Omit<Product, 'id' | 'meta'>;

// For PATCH payloads
export type ProductUpdatePayload = Partial<Omit<Product, 'id' | 'meta'>>;

// ✅ Record<K, T> usage example
export type ProductGroups = Record<Category, Product[]>;

// ✅ Required<T> & Readonly<T> usage demo types
type OptionalConfig = {
  baseUrl?: string;
  timeout?: number;
};

export type StrictConfig = Required<OptionalConfig>;
export const defaultConfig: Readonly<StrictConfig> = {
  baseUrl: 'https://dummyjson.com',
  timeout: 5000
};

// ✅ Type alias + intersection type
type SEO = {
  seoTitle: string;
  seoDescription: string;
};

export type ProductWithSEO = Product & SEO;

// ✅ Generic identity function
export function identity<T>(value: T): T {
  return value;
}

// ✅ Special types
export type UnknownObject = Record<string, unknown>;
export type NothingReturned = void;
export type Empty = never;

// ✅ `as const` usage demo
export const sizes = ['small', 'medium', 'large'] as const;
export type Size = typeof sizes[number]; // 'small' | 'medium' | 'large'
