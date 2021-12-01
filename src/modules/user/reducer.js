import { types as ActionTypes } from './actions';

const initialState = {
    authData: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.AUTH_SUCCESS:
            return Object.assign({}, state, {
                authData: action.payload.data
            });
        default:
            return state;
    }
}