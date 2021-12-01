import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DashboardView } from '../components';
import * as Actions from '../actions';
import { getSearchWordDetails } from '../selectors';

class Dashboard extends Component {
    render() {
        return (
            <DashboardView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({
    searchWordDetails: getSearchWordDetails
});

const mapDispatchToProps = dispatch => ({
    setSearchWord: (data) => dispatch(Actions.setSearchWord(data)),
    navigateToVoiceWordSearch: () => dispatch(Actions.navigateToVoiceWordSearch())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
