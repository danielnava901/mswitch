import React, {Component} from 'react';

import {searchById} from '../../services/MovieApi';
import './movie.css'


const URL = "https://image.tmdb.org/t/p/w342/";

class Movie extends Component {

    constructor(props) {
        super(props);

        const mdb_id = this.props.match.params.id;

        this.state = {
            info: {
                data: {
                    poster_path: ""
                }
            },
            mdb_id: mdb_id
        };
    }

    componentWillMount() {
        searchById(this.state.mdb_id)
            .then(function(data){
                console.log(data);
                this.setState({
                    info: data
                });
            }.bind(this));
    }

    render() {
        console.log("aaaw");

        let posterPath = this.state.info.data.poster_path;
        return(
            <div className="Movie">
                <div className="Movie-info">
                    <div className="info-poster">
                        <img src={`${URL}/${posterPath}`} alt="" className="info-poster-img"/>
                    </div>
                    <div className="info-data">

                    </div>
                </div>
            </div>
        );
    }

}

export default Movie;