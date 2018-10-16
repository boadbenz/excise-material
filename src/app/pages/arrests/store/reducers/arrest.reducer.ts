export function ArrestReducer (state: any = [], {type, payload}) {
    switch (type) {
        case 'ADD_ARREST':
            return payload;
        case 'CREATE_ARREST':
            return [...state, payload];
        case 'UPDATE_ARREST':
            return state.map(campaign => {
                return campaign.token === payload.token ? Object.assign({}, campaign, payload): campaign;
            });
        case 'DELETE_ARREST':
            return state.filter(campaign => {
                return campaign.token !== payload.token;
            });
        default:
            return state;
    }
}
