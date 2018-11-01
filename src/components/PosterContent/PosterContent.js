/**
 * Created by daniel on 16/03/18.
 */
import React, { Component } from 'react';
import './PosterContent.css';


class PosterContent extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const movies = this.props.movies;

        return (
            <div className="Poster-content">
                {this.props.children}
            </div>
        )
    }
}

export default PosterContent;