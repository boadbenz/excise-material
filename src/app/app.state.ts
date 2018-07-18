import { MasProductModel } from './models/mas-product.model';

export interface AppState {
  readonly productModel: MasProductModel[];
}