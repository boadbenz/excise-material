import { ProductModel } from './models/product.model';

export interface AppState {
  readonly productModel: ProductModel[];
}