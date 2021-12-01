import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OnBoardView } from '../components';
import * as UserActions from '../../user/actions';

class OnBoard extends Component {

    render() {
        return (
            <OnBoardView {...this.props} />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onBoardGetStarted: (data) => dispatch(UserActions.getStarted(data)),

});

export default connect(null, mapDispatchToProps)(OnBoard);;
