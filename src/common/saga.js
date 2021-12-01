import _ from 'lodash';
import { put, call, select, delay } from 'redux-saga/effects';
import { action, types as CommonActionTypes } from './actions';
import { AUTH_SERVER_ENDPOINT, CLIENT_ID, ERROR_CODES } from '../common/constants/apiConst';
import { restAPI } from './api';
// import { errorToast } from '../common/utils/toastUtils';

const nonRestrictedEndpoints = [AUTH_SERVER_ENDPOINT, 'otp', 'reset-password'];

let refreshTokenInProgress = false;

export function* handleAPIRequest(apiFn, ...requestData) {
    let { api, endpoint, payload } = apiFn(...requestData);
    return yield call(invokeApi, api, endpoint, payload);
}

function* invokeApi(api, endpoint, payload) {
    let types = [CommonActionTypes.API_REQUEST, CommonActionTypes.API_SUCCESS, CommonActionTypes.API_FAILED];
    let payloadTypes = payload.types ? payload.types : [];
    types.splice(0, payloadTypes.length, ...payloadTypes);
    let authHeaders = {};
    if (!isNonRestrictedEndpoint(endpoint)) {
        const state = yield select();
        let bearerToken = state && state.user && state.user.authData ? state.user.authData.access_token : null;
        authHeaders = { Authorization: `Bearer ${bearerToken}` };
    }
    payload.headers = Object.assign({}, payload.headers, authHeaders);
    yield put(action(types[0]));
    const { response, error } = yield call(api, endpoint, payload);
    if (response) {
        yield put(action(types[1], { data: response }));
    } else {
        let errorCode = error ? error.error_cd : null;
        if (errorCode === ERROR_CODES.JWT_EXPIRED) {
            yield delay(100);
            if (!refreshTokenInProgress) {
                refreshTokenInProgress = true;
                const { error } = yield call(refreshToken);
                refreshTokenInProgress = false;
                if (error) {
                    yield put(action(CommonActionTypes.LOG_OUT)); // If refresh token is also expired, logout the user
                    yield put(action(types[2], { error: error }));
                    // yield call(errorToast, 'session_expired');
                    yield delay(100);
                    return { error };
                }
            } else {
                while (refreshTokenInProgress) {
                    yield delay(1500);
                }
            }
            return yield call(invokeApi, api, endpoint, payload);
        } else {
            yield delay(500);
            // showErrorToast && (yield call(errorToast, error.message));
            yield put(action(types[2], { error }));
        }
    }
    return { response, error };
}

function* refreshToken() {
    try {
        const state = yield select();
        let refreshToken = state && state.user && state.user.authData ? state.user.authData.refresh_token : null;
        let payload = {
            body: { grant_type: 'refresh_token', refresh_token: refreshToken, client_id: CLIENT_ID },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            isAuthCall: true
        };
        const { response, error } = yield call(restAPI.post, AUTH_SERVER_ENDPOINT, payload);
        if (response) {
            yield put(action(CommonActionTypes.REFRESH_TOKEN_API_SUCCESS, { data: response }));
        } else {
            yield put(action(CommonActionTypes.REFRESH_TOKEN_API_FAILED, { error: error }));
        }
        return { response, error };
    } catch (error) {
        return { error: { message: 'Error occured while processing refresh token' } };
    }
}

function isNonRestrictedEndpoint(endpoint) {
    return nonRestrictedEndpoints.filter(nonRestrictedEndpoint => endpoint.indexOf(nonRestrictedEndpoint) !== -1).length;
}
