import { actions, MODULE_ROUTE_KEYS } from '../../common';

const { action, navigation: { navigateWithReset } } = actions;

export const types = {
    INITIALIZE: 'Splash/INITIALIZE',
};

export function initialize() {
    return action(types.INITIALIZE);
}