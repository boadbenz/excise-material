import { Action } from '@ngrx/store'
import { ArrestProduct } from '../../models/arrest-product';

export const CREATE_ARRESTPRODUCT = '[ARRESTPRODUCT] Create'
export const ADD_ARRESTPRODUCT = '[ARRESTPRODUCT] Add'
export const REMOVE_ARRESTPRODUCT = '[ARRESTPRODUCT] Remove'
export const UPDATE_ARRESTPRODUCT = '[ARRESTPRODUCT] Update'

export class CreateArrestProduct implements Action {
    readonly type = CREATE_ARRESTPRODUCT
    constructor(public payload: ArrestProduct[]) { }
}

export class AddArrestProduct implements Action {
    readonly type = ADD_ARRESTPRODUCT
    constructor(public payload: ArrestProduct) { }
}

export class UpdateArrestProduct implements Action {
    readonly type = UPDATE_ARRESTPRODUCT
    constructor(public payload: ArrestProduct) { }
}

export class RemoveArrestProduct implements Action {
    readonly type = REMOVE_ARRESTPRODUCT
    constructor(public payload: number) { }
}

export type ArrestProductActions = CreateArrestProduct | AddArrestProduct | RemoveArrestProduct | UpdateArrestProduct