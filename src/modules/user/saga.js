import { all, takeLatest, call, select, put, delay, fork, take } from 'redux-saga/effects';
import * as Actions from '../dashboard/actions';
import * as LoginActions from './actions';
import _ from 'lodash';
import { saga, utils } from '../../common';
import * as DashboardAPI from '../dashboard/api';
import AsyncStorage from '@react-native-community/async-storage';
import { ONBOARD_STORE_KEY, LOGIN_STORE_KEY, USER_INFO_STORE_KEY } from './constants';
import { navigateToLogin, profileUpdate } from '../user/actions';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { auth } from '@react-native-firebase/auth';

const { types: ActionTypes } = Actions;

function* savePincode(action) {
    GoogleSignin.configure({
        webClientId: '1072124528258-eb8n2gp82f4iok4npam4coabd01u25ns.apps.googleusercontent.com',
    });
    const token = yield call(googleSignIn);
    if (token != null) {
        yield call([AsyncStorage, 'setItem'], LOGIN_STORE_KEY, JSON.stringify(token.idToken));
        yield call([AsyncStorage, 'setItem'], USER_INFO_STORE_KEY, JSON.stringify(token.user));
        yield put(profileUpdate(token.user));
        yield put(Actions.navigateToDashboard());
    }

    // const FBToken = yield call(FBSignIn);
    // console.log(FBToken);
}

function* getStarted(action) {
    yield call([AsyncStorage, 'setItem'], ONBOARD_STORE_KEY, JSON.stringify(action.payload.data));
    yield put(navigateToLogin());
}

async function googleSignIn() {
    try {
        return await GoogleSignin.signIn();
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            return null
        }
    }
}

async function FBSignIn() {
    try {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }
        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();
        if (!data) {
            throw 'Something went wrong obtaining access token';
        }
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
    } catch (error) {
        console.log(error);
    }
}

function* logout() {
    GoogleSignin.configure({
        webClientId: '1072124528258-eb8n2gp82f4iok4npam4coabd01u25ns.apps.googleusercontent.com',
    });
    yield call(googleSignOut);
    yield call([AsyncStorage, 'removeItem'], LOGIN_STORE_KEY);
    yield put(navigateToLogin());
}

async function googleSignOut() {
    return await GoogleSignin.signOut();
}

export default function* splashSaga() {
    yield all([
        takeLatest(LoginActions.types.SET_PINCODE_LOCALLY, savePincode),
        takeLatest(LoginActions.types.GET_STARTED, getStarted),
        takeLatest(LoginActions.types.LOGOUT, logout)
    ]);
}
