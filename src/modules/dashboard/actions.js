import { actions, MODULE_ROUTE_KEYS } from '../../common';
import { ROUTE_KEYS as DASHBOARD_ROUTE_KEYS } from './constants';

const { action, navigation: { navigate, navigateWithReset } } = actions;

export const types = {
    VACCINE_COUNT_AUTO_CHECKER_API_REQUEST: 'Dashboard/VACCINE_COUNT_AUTO_CHECKER_API_REQUEST',
    VACCINE_COUNT_AUTO_CHECKER_API_SUCCESS: 'Dashboard/VACCINE_COUNT_AUTO_CHECKER_API_SUCCESS',
    VACCINE_COUNT_AUTO_CHECKER_API_FAILED: 'Dashboard/VACCINE_COUNT_AUTO_CHECKER_API_FAILED',
    SET_SEARCH_WORD: 'Dashboard/SET_SEARCH_WORD',
    GET_SEARCH_WORD_DETAILS: 'Dashboard/GET_SEARCH_WORD_DETAILS'
};

export function navigateToDashboard() {
    return navigateWithReset(MODULE_ROUTE_KEYS.DASHBOARD, { screen: DASHBOARD_ROUTE_KEYS.DASHBOARD_VIEW });
}

export function navigateToWordDetails(data) {
    return navigate(MODULE_ROUTE_KEYS.DASHBOARD, { screen: DASHBOARD_ROUTE_KEYS.WORD_DETAILS, params: { data } });
}

export function setSearchWord(data) {
    return action(types.SET_SEARCH_WORD, { data });
}

export function getSearchWordDetails(data) {
    return action(types.GET_SEARCH_WORD_DETAILS, { data });
}

export function navigateToVoiceWordSearch() {
    return navigate(MODULE_ROUTE_KEYS.DASHBOARD, { screen: DASHBOARD_ROUTE_KEYS.VOICEWORDSEARCH });
}