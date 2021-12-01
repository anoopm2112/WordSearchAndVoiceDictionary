import { all, takeLatest, call, select, put, delay, fork, take } from 'redux-saga/effects';
import * as Actions from './actions';
import { navigateToWordDetails } from '../dashboard/actions';
import { saga, utils } from '../../common';
import * as DashboardAPI from './api';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

const { types: ActionTypes } = Actions;
const { toastUtil: { errorToast } } = utils;

function* setSearchWord(action) {
    yield fork(saga.handleAPIRequest, DashboardAPI.vaccineCountAutoChecker, action.payload.data);
    const wordDetailsAction = yield take([ActionTypes.VACCINE_COUNT_AUTO_CHECKER_API_SUCCESS, ActionTypes.VACCINE_COUNT_AUTO_CHECKER_API_FAILED]);
    if (wordDetailsAction.type === ActionTypes.VACCINE_COUNT_AUTO_CHECKER_API_SUCCESS) {
        yield put(navigateToWordDetails(wordDetailsAction.payload.data));
    } else if (wordDetailsAction.type === ActionTypes.VACCINE_COUNT_AUTO_CHECKER_API_FAILED) {
        yield call(errorToast, 'No matiching details found');
    }
}

export default function* splashSaga() {
    yield all([
        takeLatest(ActionTypes.SET_SEARCH_WORD, setSearchWord),
    ]);
}
