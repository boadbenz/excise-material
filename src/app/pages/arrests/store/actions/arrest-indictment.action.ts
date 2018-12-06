import { Action } from '@ngrx/store'
import { ArrestIndictment } from '../../models';

export const CREATE_ARRESTINDICTMENT = '[ARRESTINDICTMENT] Create'
export const ADD_ARRESTINDICTMENT = '[ARRESTINDICTMENT] Add'
export const REMOVE_ARRESTINDICTMENT = '[ARRESTINDICTMENT] Remove'
export const UPDATE_ARRESTINDICTMENT = '[ARRESTINDICTMENT] Update'

export class CreateArrestIndictment implements Action {
    readonly type = CREATE_ARRESTINDICTMENT
    constructor(public payload: ArrestIndictment[]) { }
}

export class AddArrestIndictment implements Action {
    readonly type = ADD_ARRESTINDICTMENT
    constructor(public payload: ArrestIndictment) { }
}

export class UpdateArrestIndictment implements Action {
    readonly type = UPDATE_ARRESTINDICTMENT
    constructor(public payload: ArrestIndictment) { }
}

export class RemoveArrestIndictment implements Action {
    readonly type = REMOVE_ARRESTINDICTMENT
    constructor(public payload: number) { }
}

export type ArrestIndictmentActions = CreateArrestIndictment | AddArrestIndictment | RemoveArrestIndictment | UpdateArrestIndictment