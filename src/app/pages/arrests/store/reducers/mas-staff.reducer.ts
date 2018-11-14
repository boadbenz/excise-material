export function MasStaffReducer (state: any = [], {type, payload}) {
    switch (type) {
        case 'ADD_MASSTAFF':
            return payload;
        case 'CREATE_MASSTAFF':
            return [...state, payload];
        case 'UPDATE_MASSTAFF':
            return state.map(campaign => {
                return campaign.token === payload.token ? Object.assign({}, campaign, payload): campaign;
            });
        case 'DELETE_MASSTAFF':
            return state.filter(campaign => {
                return campaign.token !== payload.token;
            });
        default:
            return state;
    }
}
