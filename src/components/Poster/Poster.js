/**
 * Created by daniel on 16/03/18.
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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

        
        return(
            <div key={movie.id}>
                <strong>{movie.title}</strong>
                <Link to={`/movies/${movie.id}`} key={movie.id}>{movie.title}</Link>
            </div>
        );
    }
}


export default Poster;