import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SplashView } from '../components';
import { actions as CommonActions } from '../../../common';
import { ROUTE_KEYS as SPLASH_ROUTE_KEYS } from '../constants';
import * as Actions from '../actions';

class Splash extends Component {

    componentDidMount() {
        // this.props.createSidebarInitialRoute(SPLASH_ROUTE_KEYS.SPLASH);
        this.props.initialize();
    }

    render() {
        return (
            <SplashView {...this.props} />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    // createSidebarInitialRoute: (initialRoute) => dispatch(CommonActions.routeChanged(initialRoute)),
    initialize: () => dispatch(Actions.initialize())
});

export default connect(null, mapDispatchToProps)(Splash);
