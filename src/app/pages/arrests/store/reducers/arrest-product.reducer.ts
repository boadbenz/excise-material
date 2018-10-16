import { ArrestProduct } from "../../models/arrest-product";
import * as fromProductAction from '../actions';

export function productReducer(
    state: ArrestProduct[], 
    action: fromProductAction.Actions
) {
    switch (action.type) {
        case fromProductAction.CREATE_ARRESTPRODUCT:
            return action.payload;

        case fromProductAction.ADD_ARRESTPRODUCT:
            return [...state, action.payload];

        case fromProductAction.UPDATE_ARRESTPRODUCT:
            return state.map(product => {
                return Object.assign({}, product, action.payload);
            });

        case fromProductAction.REMOVE_ARRESTPRODUCT:
            state.splice(action.payload, 1)
            return state;
        // case fromProductAction.UPDATE_ARRESTPRODUCT:
        // case fromProductAction.CREATE_ARRESTPRODUCT: {
        //     const product = action.payload;
        //     const entities = {
        //         ...state.entities,
        //         [product.ProductID]: product,
        //     };

        //     return { ...state, entities, };
        // }
        default:
            return state;
    }
}
