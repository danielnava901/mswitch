/**
 * Created by daniel on 3/03/18.
 */
import React, { Component } from 'react';
import PosterContent from '../../components/PosterContent/PosterContent';
import Poster from '../../components/Poster/Poster';
import axios from "axios";
import apiRoutes from "../../ApiRoutes/apiRoutes";
import TokenService from '../../services/TokenService';
const tokenService = new TokenService();

function getFavorites() {
    console.log("getFavorites", tokenService.getToken());
    return axios.get(`${apiRoutes.base}${apiRoutes.routes.getFavorites}`, {
        headers: {
            Authorization: `Bearer ${tokenService.getToken()}`
        }
    });
}

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state ={
            movies: []
        };
    }

    componentWillMount() {
        getFavorites()
            .then(function(data) {
                console.log(data.data.data);
                this.setState({movies: data.data.data});
                }.bind(this)
            );
    }

    render() {
        let {movies} = this.state;

        return (
            <div>
                <h1>Favoritos</h1>
                <PosterContent>
                    {movies.map((movie, i) => <Poster key={movie.id} movie={JSON.parse(movie.mdb_json)} />)}
                </PosterContent>
            </div>
        );
    }
}

export default Favorites;