import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { WordDetailsView } from '../components';

class WordDetails extends Component {

    render() {
        return (
            <WordDetailsView {...this.props} />
        );
    }
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WordDetails);
