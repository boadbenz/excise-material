// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { MasProductModel } from '../../models/mas-product.model'

// Section 2
export const ADD_PRODUCT       = '[PRODUCT] Add'
export const REMOVE_PRODUCT    = '[PRODUCT] Remove'

// Section 3
export class AddProduct implements Action {
    readonly type = ADD_PRODUCT

    constructor(public payload: MasProductModel) {}
}

export class RemoveProduct implements Action {
    readonly type = REMOVE_PRODUCT

    constructor(public payload: number) {}
}

// Section 4
export type Actions = AddProduct | RemoveProduct