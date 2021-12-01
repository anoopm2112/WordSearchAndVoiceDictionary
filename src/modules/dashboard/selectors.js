import flow from 'lodash/fp/flow';
import _ from 'lodash';
import { STATE_REDUCER_KEY } from './constants';

export const getDashboard = state => state[STATE_REDUCER_KEY];

const sideBar = dashboard => dashboard.sideBar;
export const getSideBarData = flow(getDashboard, sideBar);

const searchWordDetails = dashboard => dashboard.setSearchWordDetails;
export const getSearchWordDetails = flow(getDashboard, searchWordDetails);
