/**
 * Created by daniel on 16/03/18.
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "./Poster.css";

const URL = "https://image.tmdb.org/t/p/w185/";

class Poster extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        console.log("clic", e);
    }

    render() {
        const movie = this.props.movie;
        console.log("MOVIE", movie);
        return(
            <div key={movie.id} className="Poster">
                <Link to={`/movies/${movie.id}`} key={movie.id}>
                    <img src={`${URL}/${movie.poster_path}`} alt="" className="Poster-img"/>
                </Link>
            </div>
        );
    }
}


export default Poster;