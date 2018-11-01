/**
 * Created by daniel on 3/03/18.
 */
import React, { Component } from 'react';


import PosterContent from '../../components/PosterContent/PosterContent';
import {discover} from '../../services/MovieApi';
import Poster from '../../components/Poster/Poster';

class Movies extends Component {

    constructor(props) {
        super(props);
        this.state ={
            movies: []
        };
    }

    componentWillMount() {
        discover()
        .then(function(data) {
                this.setState({movies: data.data.results});
            }.bind(this)
        );
    }

    render() {
        const movies = this.state.movies;

        return (
            <div>
                <h1>Peliculas</h1>
                <PosterContent>
                    {movies.map((movie, i) => <Poster key={i} movie={movie} />)}
                </PosterContent>

            </div>
        );
    }
}

export default Movies;