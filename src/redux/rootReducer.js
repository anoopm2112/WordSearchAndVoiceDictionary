import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import _ from 'lodash';
import * as modules from '../modules';
import * as CommonActions from '../common/actions';
import { ROUTE_KEYS as USER_ROUTE_KEYS } from '../modules/user/constants';

const { navigation } = CommonActions;

let STATE_CLEAR_ACTIONS = [
  navigation.types.NAVIGATE_WITH_RESET
];

const reducers = {
  form
};

_.values(modules).forEach(module => {
  if (module.STATE_REDUCER_KEY && module.reducer) {
    reducers[module.STATE_REDUCER_KEY] = module.reducer;
  }
});

const appReducer = combineReducers({
    ...reducers,
});

const rootReducer = (state, action) => appReducer((STATE_CLEAR_ACTIONS.indexOf(action.type) > -1 && _.get(action, 'payload.params.screen', '') === USER_ROUTE_KEYS.LOGIN_FORM) ? {
    ...appReducer({}, {}),
} : state, action);

export default rootReducer;