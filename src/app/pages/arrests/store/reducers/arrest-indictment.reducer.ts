import * as fromProductAction from '../actions';
import { ArrestIndictment } from "../../models";

export function indictmentReducer(
    state: ArrestIndictment[], 
    action: fromProductAction.ArrestIndictmentActions
) {
    switch (action.type) {
        case fromProductAction.CREATE_ARRESTINDICTMENT:
            return action.payload;

        case fromProductAction.ADD_ARRESTINDICTMENT:
            return [...state, action.payload];

        case fromProductAction.UPDATE_ARRESTINDICTMENT:
            return state.map(product => {
                return Object.assign({}, product, action.payload);
            });

        case fromProductAction.REMOVE_ARRESTINDICTMENT:
            state.splice(action.payload, 1)
            return state;
            
        default:
            return state;
    }
}
