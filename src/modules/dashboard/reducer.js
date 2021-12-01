import { types as ActionTypes } from './actions';
import { actions as CommonActions } from '../../common';
const { types: CommonActionsTypes } = CommonActions;

const initialState = {
    sideBar: {
        currentRoute: undefined
    },
    setSearchWordDetails: {
        data: [],
        refreshing: false
    },
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CommonActionsTypes.ROUTE_CHANGED:
            return Object.assign({}, state, {
                sideBar: {
                    currentRoute: action.payload.name
                }
            });
        case ActionTypes.GET_SEARCH_WORD_DETAILS:
            return Object.assign({}, state, {
                setSearchWordDetails: {
                    data: action.payload.data
                }
            });
        case ActionTypes.SET_SEARCH_WORD:
            return Object.assign({}, state, {
                setSearchWordDetails: {
                    refreshing: true
                }
            });
        case ActionTypes.VACCINE_COUNT_AUTO_CHECKER_API_REQUEST:
            return Object.assign({}, state, {
                setSearchWordDetails: {
                    refreshing: true
                }
            });
        case ActionTypes.VACCINE_COUNT_AUTO_CHECKER_API_SUCCESS:
        case ActionTypes.VACCINE_COUNT_AUTO_CHECKER_API_FAILED:
            return Object.assign({}, state, {
                setSearchWordDetails: {
                    refreshing: false
                }
            });
        default:
            return state;
    }
}