import { Action } from '@ngrx/store'
import { Arrest } from '../../models';

export const CREATE_ARREST = '[ARREST] Create'
export const ADD_ARREST = '[ARREST] Add'
export const REMOVE_ARREST = '[ARREST] Remove'
export const UPDATE_ARREST = '[ARREST] Update'

export class CreateArrest implements Action {
    readonly type = CREATE_ARREST
    constructor(public payload: Arrest) { }
}

export class AddArrest implements Action {
    readonly type = ADD_ARREST
    constructor(public payload: Arrest) { }
}

export class UpdateArrest implements Action {
    readonly type = UPDATE_ARREST
    constructor(public payload: Arrest) { }
}

export class RemoveArrest implements Action {
    readonly type = REMOVE_ARREST
    constructor(public payload: number) { }
}

export type ArrestActions = CreateArrest | AddArrest | RemoveArrest | UpdateArrest