import { types as ActionTypes } from './actions';

const initialState = {
    availableNotifyVaccineList: {
        data: []
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}