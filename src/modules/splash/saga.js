import { all, takeLatest, call, put, delay } from 'redux-saga/effects';
import * as Actions from './actions';
import * as DashboardActions from '../dashboard/actions';
import * as UserActions from '../user/actions';
import AsyncStorage from '@react-native-community/async-storage';
import { ONBOARD_STORE_KEY, LOGIN_STORE_KEY, USER_INFO_STORE_KEY } from '../user/constants';

const { types: ActionTypes } = Actions;

function* initialize() {
    yield delay(4500);
    let onBoardData = yield call([AsyncStorage, 'getItem'], ONBOARD_STORE_KEY);
    onBoardData = onBoardData ? JSON.parse(onBoardData) : null;
    if (onBoardData != '' && onBoardData != null) {
        let loginData = yield call([AsyncStorage, 'getItem'], LOGIN_STORE_KEY);
        loginData = loginData ? JSON.parse(loginData) : null;
        if (loginData != '' && loginData != null) {
            let userData = yield call([AsyncStorage, 'getItem'], USER_INFO_STORE_KEY);
            userData = userData ? JSON.parse(userData) : null;
            yield put(UserActions.profileUpdate(userData));
            yield put(DashboardActions.navigateToDashboard());
        } else {
            yield put(UserActions.navigateToLogin());
        }
    } else {
        yield put(UserActions.navigateToOnBoard());
    }
}

export default function* splashSaga() {
    yield all([
        takeLatest(ActionTypes.INITIALIZE, initialize)
    ]);
}
