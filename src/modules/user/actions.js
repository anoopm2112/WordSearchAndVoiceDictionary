import { actions, MODULE_ROUTE_KEYS } from '../../common';
import { ROUTE_KEYS as USER_ROUTE_KEYS } from './constants';

const { action, navigation: { navigate, navigateWithReset } } = actions;

export const types = {
    SET_PINCODE_LOCALLY: 'User/SET_PINCODE_LOCALLY',
    GET_STARTED: 'User/GET_STARTED',
    AUTH_SUCCESS: 'User/AUTH_SUCCESS',
    LOGOUT: 'User/LOGOUT'
};

export function navigateToLogin() {
    return navigateWithReset(MODULE_ROUTE_KEYS.USER, { screen: USER_ROUTE_KEYS.LOGIN_FORM });
}

export function navigateToOnBoard() {
    return navigateWithReset(MODULE_ROUTE_KEYS.USER, { screen: USER_ROUTE_KEYS.ONBOARD });
}

export function setPincodeLocally(data) {
    return action(types.SET_PINCODE_LOCALLY, { data });
}

export function getStarted(data) {
    return action(types.GET_STARTED, { data });
}

export function profileUpdate(data) {
    return action(types.AUTH_SUCCESS, { data });
}

export function logout(data) {
    return action(types.LOGOUT, { data });
}