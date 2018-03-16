/**
 * Created by daniel on 3/03/18.
 */
import React, { Component } from 'react';

import {discover} from '../../services/MovieApi';


class Movies extends Component {

    constructor(props) {
        super(props);
        this.state ={
            movies: []
        };
    }

    componentWillMount() {
        discover().then(function(data) {
            this.setState({movies: data});
        }.bind(this));

    }

    render() {
        const movies = this.state.movies;
        console.log("movies", movies);
        return (
            <div>
                <h1>Peliculas</h1>
            </div>
        );
    }
}

export default Movies;