import { Action } from '@ngrx/store'
import { MasProductModel } from '../models/mas-product.model'
import * as ProductActions from '../actions/arrest/get-mas-productget-all.action'

// Section 1
const initialState: MasProductModel = {
    ProductID: null,
    GroupCode: null,
    IsDomestic: null,
    ProductCode: null,
    BrandCode: null,
    BrandNameTH: null,
    BrandNameEN: null,
    SubBrandCode: null,
    SubBrandNameTH: null,
    SubBrandNameEN: null,
    ModelCode: null,
    ModelName: null,
    FixNo1: null,
    DegreeCode: null,
    Degree: null,
    SizeCode: null,
    Size: null,
    SizeUnitCode: null,
    SizeUnitName: null,
    FixNo2: null,
    SequenceNo: null,
    ProductDesc: null,
    EffectiveDate: null,
    ExpirationDate: null,
    IsActive: null,
    EventDatetime: null
}

// Section 2
export function productReducer(state: MasProductModel[] = [initialState], action: ProductActions.Actions) {

    // Section 3
    switch(action.type) {
        case ProductActions.ADD_PRODUCT:
            return [...state, action.payload];
        default:
            return state;
    }
}