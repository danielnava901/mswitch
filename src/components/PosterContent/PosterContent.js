/**
 * Created by daniel on 16/03/18.
 */
import React, { Component } from 'react';
import Poster from '../Poster/Poster';


class PosterContent extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        const movies = this.props.movies;

        return (
            <div>
                {movies.map((movie, i) => <Poster key={i} movie={movie}/>)}
            </div>
        )
    }
}

export default PosterContent;