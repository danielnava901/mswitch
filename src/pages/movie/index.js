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
                    poster_path: "",
                    genres: [],
                    overview: ""
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
        let posterPath = this.state.info.data.poster_path;
        console.log(this.state.info.data.genres);
        return(
            <div className="Movie">
                <div className="Movie-info">
                    <div className="info-poster">
                        <img src={`${URL}/${posterPath}`} alt="" className="info-poster-img"/>
                    </div>
                    <div className="info-data">
                        <div className="info-data-title">
                            <strong style={{fontSize: "24px"}}>{this.state.info.data.title}</strong>
                            <span style={{fontSize: "15px"}}>{this.state.info.data.original_title}</span>
                            <small>{this.state.info.data.release_date}</small>
                        </div>
                        <div className="info-scores">
                            <div className="info-data-vote-average">
                                {this.state.info.data.vote_average}
                            </div>
                        </div>
                        <div className="info-genres">
                            {
                                this.state.info.data.genres.map(item => <div key={item.id}>{item.name}</div>)
                            }
                        </div>
                        <div className="info-overview">
                            {
                                this.state.info.data.overview
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Movie;