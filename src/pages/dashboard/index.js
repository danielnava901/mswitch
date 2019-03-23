/**
 * Created by daniel on 4/03/18.
 */
import React, { Component } from 'react';
import Poster from '../../components/Poster/Poster';
import axios from "axios";
import apiRoutes from "../../ApiRoutes/apiRoutes";
import TokenService from "../../services/TokenService";
import PosterContent from '../../components/PosterContent/PosterContent';
let tokenService = new TokenService();

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };

        this.getBestMovies = this.getBestMovies.bind(this);
    }


    getBestMovies() {
        return axios.get(`${apiRoutes.base}${apiRoutes.routes.getBestMovies}`, {
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`
            }
        });
    }

    componentWillMount() {
        if(this.props.auth) {
            this.getBestMovies().then(data => {
                this.setState({movies: data.data.data});
            });
        }
    }

    render() {
        let {movies} = this.state;
        let {auth} = this.props;

        console.log("m", movies);
        return (
            <div>
                <h1>Inicio</h1>
                {
                    auth ?  <PosterContent>
                        {movies.map((movie, i) => <Poster key={movie.id} movie={JSON.parse(movie.mdb_json)} />)}
                    </PosterContent> : ""
                }

            </div>
        );
    }
}

export default Dashboard;