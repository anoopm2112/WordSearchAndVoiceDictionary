import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { VoiceWordSearchView } from '../components';
import * as Actions from '../actions';

class VoiceWordSearch extends Component {

    render() {
        return (
            <VoiceWordSearchView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({
    setSearchWord: (data) => dispatch(Actions.setSearchWord(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VoiceWordSearch);
