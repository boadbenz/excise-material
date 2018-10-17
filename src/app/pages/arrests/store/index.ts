import * as fromModels from '../models';

export * from './actions'
export * from './reducers'

export interface AppState {
    readonly arrest: fromModels.Arrest;
    readonly arrestProduct: fromModels.ArrestProduct[];
    readonly arrestIndictment: fromModels.ArrestIndictment[];
}
