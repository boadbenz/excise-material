export function ArrestStaffReducer (state: any = [], {type, payload}) {
    switch (type) {
        case 'ADD_ARRESTSTAFF':
            return payload;
        case 'CREATE_ARRESTSTAFF':
            return [...state, payload];
        case 'UPDATE_ARRESTSTAFF':
            return state.map(campaign => {
                return campaign.token === payload.token ? Object.assign({}, campaign, payload): campaign;
            });
        case 'DELETE_ARRESTSTAFF':
            return state.filter(campaign => {
                return campaign.token !== payload.token;
            });
        default:
            return state;
    }
}
