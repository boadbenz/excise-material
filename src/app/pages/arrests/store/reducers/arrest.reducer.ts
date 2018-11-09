import { Arrest } from "../../models";
import * as fromAction from '../actions';

export function arrestReducer(
    state: Arrest,
    action: fromAction.ArrestActions
) {
    switch (action.type) {
        case fromAction.CREATE_ARREST:
            return action.payload;

        // case fromAction.ADD_ARREST:
        //     return [...state, action.payload];

        case fromAction.UPDATE_ARREST:
            return Object.assign({}, state, action.payload);

        case fromAction.REMOVE_ARREST:
            state = new Arrest();
            return state;

        default:
            return state;
    }
}
