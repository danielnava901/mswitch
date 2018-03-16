/**
 * Created by daniel on 3/03/18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


//assets
import './Content.css';

class Content extends Component {

    static propTypes = {
        body: PropTypes.object.isRequired
    };

    render() {
        const {body} = this.props;

        return (
            <div className="Content">
                {body}
            </div>
        );
    }
}

export default Content;