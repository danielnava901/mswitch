/**
 * Created by daniel on 16/03/18.
 */
import React, { Component } from 'react';

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
            <div key={movie.id} onClick={e => this.onClick(movie.id)}>
                <strong>{movie.title}</strong>
            </div>
        );
    }
}


export default Poster;