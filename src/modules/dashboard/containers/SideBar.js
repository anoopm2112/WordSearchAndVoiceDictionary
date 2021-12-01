import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SideBarView } from '../components';
import { getSideBarData } from '../selectors';
import { logout } from '../../user/actions';
import { getUserAuthData } from '../../user/selectors';

class SideBar extends Component {
    render() {
        return (
            <SideBarView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({
    sideBar: getSideBarData,
    profileData: getUserAuthData
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
