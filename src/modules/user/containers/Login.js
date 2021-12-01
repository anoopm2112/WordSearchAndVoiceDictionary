import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginView } from '../components';
import * as DashboardActions from '../../dashboard/actions';
import * as UserActions from '../../user/actions';

class Login extends Component {

    render() {
        return (
            <LoginView {...this.props} />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    navigateToDashboard: () => dispatch(DashboardActions.navigateToDashboard()),
    setPincodeLocally: (data) => dispatch(UserActions.setPincodeLocally(data))
});

export default connect(null, mapDispatchToProps)(Login);;
