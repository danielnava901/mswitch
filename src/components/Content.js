/**
 * Created by daniel on 3/03/18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Content extends Component {

    static propTypes = {
        body: PropTypes.object.isRequired
    };

    render() {
        const {body} = this.props;

        return (
            <div>
                {body}
            </div>
        );
    }
}

export default Content;