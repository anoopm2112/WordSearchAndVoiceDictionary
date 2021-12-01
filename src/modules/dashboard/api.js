import { api } from '../../common';
import { types as ActionTypes } from './actions';

const { restAPI } = api;

export function vaccineCountAutoChecker(params) {
    let payload = {
        types: [ActionTypes.VACCINE_COUNT_AUTO_CHECKER_API_REQUEST, ActionTypes.VACCINE_COUNT_AUTO_CHECKER_API_SUCCESS, ActionTypes.VACCINE_COUNT_AUTO_CHECKER_API_FAILED],
    };
    return {
        endpoint: `entries/en/${params}`,
        api: restAPI.get,
        payload
    };
}
