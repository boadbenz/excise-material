import { ArrestProduct } from '../models/arrest-product';

export * from './actions'
export * from './reducers'

export interface AppState {
    readonly arrestProduct: ArrestProduct[];
}
