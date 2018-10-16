export function ArresNoticeReducer (state: any = [], {type, payload}) {
    switch (type) {
        case 'ADD_ARRESTNOTICE':
            return payload;
        case 'CREATE_ARRESTNOTICE':
            return [...state, payload];
        case 'UPDATE_ARRESTNOTICE':
            return state.map(campaign => {
                return campaign.token === payload.token ? Object.assign({}, campaign, payload): campaign;
            });
        case 'DELETE_ARRESTNOTICE':
            return state.filter(campaign => {
                return campaign.token !== payload.token;
            });
        default:
            return state;
    }
}
