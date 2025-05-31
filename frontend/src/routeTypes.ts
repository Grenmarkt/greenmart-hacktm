import { Product } from './types';

// Define route params for various routes
export interface ProductDetailRouteParams {
  productid: string; // Note lowercase 'id' to match route file
}

// If you want to add more type safety to your loaders/actions
export interface RouteLoaderData {
  '/product/$productid': Product;
  // Add other routes and their loader data types as needed
}