import React, {Component} from 'react';

import {searchById} from '../../services/MovieApi';
import apiRoutes from '../../ApiRoutes/apiRoutes';
import axios from 'axios';
import TokenService from '../../services/TokenService';
import './movie.css'

const IMG_URL = "https://image.tmdb.org/t/p/w342/";
const tokenService = new TokenService();


//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

function send(mdbId, data, cb) {
    let formData = new FormData();

    for(var key in data) {
        formData.append(key, data[key]);
    }


    axios.post(`${apiRoutes.base}${apiRoutes.routes.getMovie}${mdbId}`, formData, {
        headers: {
            Authorization: `Bearer ${tokenService.getToken()}`
        }
    }).then(response => {
        cb()
    });
}

class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mdb: props.mdb,
            isFavorite: props.isFavorite
        };

        this.props = props;
        this.onClickScore = this.onClickScore.bind(this);
    }

    onClickScore() {
        let formData = new FormData();
        formData.append("score", this.props.id);
        formData.append("mdb", JSON.stringify(this.state.mdb));
        formData.append("isFavorite", this.state.isFavorite);

        axios.post(`${apiRoutes.base}${apiRoutes.routes.getMovie}${this.state.mdb.id}`, formData, {
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`
            }
        }).then(response => {
            this.props.onUpdate()
        });
    }

    render() {
        return (
            <div className="Score-div" data-value={this.props.value} onClick={this.onClickScore} data-selected={this.props.isSelected}>
                <img src={`/images/emojis/${this.props.icon}`} className={this.props.isSelected ? "" : "grayscale"} alt={this.props.name}/>
                <span className="Score-div-porcent">{this.props.porcent ? this.props.porcent : '0%'}</span>
            </div>
        );
    }

}

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

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
            scores: [],
            score: -1,
            mdb_id: mdb_id,
            isFavorite: 0,
        };

        this.getMovieForUser = this.getMovieForUser.bind(this);
        this.onUpdateScore = this.onUpdateScore.bind(this);
        this.updateMovie = this.updateMovie.bind(this);
        this.onFavClick = this.onFavClick.bind(this);
    }

    getMovieForUser() {
        console.log("getMovieForUser");
        return axios.get(`${apiRoutes.base}${apiRoutes.routes.getMovie}${this.state.mdb_id}`, {
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`
            }
        });
    }

    updateMovie() {
        console.log("onUpdate", this.state.info);
        send(this.state.mdb_id, {
            score: this.state.score,
            mdb: JSON.stringify(this.state.info.data),
            isFavorite: this.state.isFavorite
        }, function() {
            this.onUpdateScore()
        }.bind(this));
    }

    onUpdateScore() {
        this.getMovieForUser().then(function(response) {
            console.log("onUpdate", response);
            if ("data" in response) {
                this.setState({
                    scores: response.data.scores,
                });

                if ("data" in response.data) {
                    this.setState({
                        score: response.data.data.score,
                        isFavorite: response.data.data.is_favorite
                    });
                }
            }
        }.bind(this));
    }

    onFavClick() {
        console.log("isFav", this.state.isFavorite);
        this.setState({
            isFavorite: this.state.isFavorite ? 0 : 1
        }, function() {
            this.updateMovie();
        }.bind(this));
    }

    componentWillMount() {

        searchById(this.state.mdb_id)
            .then(function(data) {
                this.setState({
                    info: data
                });

                console.log("onSearch", this.state.info);
                this.getMovieForUser().then(function(response) {
                    console.log("res", response);
                    if("data" in response) {
                        this.setState({
                            scores: response.data.scores,
                        });

                        if("data" in response.data) {
                            this.setState({
                                score: response.data.data.score,
                                isFavorite: response.data.data.is_favorite
                            });
                        }
                    }
                }.bind(this));
            }.bind(this));
    }

    render() {
        let posterPath = this.state.info.data.poster_path;
        console.log("isFav...>", this.state.isFavorite);
        let isFavorite = this.state.isFavorite;
        return(
            <div className="Movie">
                <div className="Movie-info">
                    <div className="info-poster">
                        <img src={`${IMG_URL}/${posterPath}`} alt="" className="info-poster-img"/>
                    </div>
                    <div className="info-data">
                        <div className="info-data-title">
                            <strong style={{fontSize: "24px"}}>{this.state.info.data.title}</strong>
                            <span style={{fontSize: "15px"}}>{this.state.info.data.original_title}</span>
                            <small>{this.state.info.data.release_date}</small>
                        </div>
                        <div className="info-scores-section">
                            <div className={`info-data-vote-average ` +
                                (
                                    this.state.info.data.vote_average < 5 ? ' red' :
                                    (
                                        this.state.info.data.vote_average < 6 ? ' yellow' :
                                        (
                                            this.state.info.data.vote_average < 7 ? ' blue' : ' green'
                                        )
                                    )
                                )
                            }>
                                {this.state.info.data.vote_average}
                            </div>
                            <div className="fav">
                                <img className={isFavorite ? "" : "grayscale"}
                                     src={`/images/emojis/star.png`} alt="fav" title="Favorito"
                                    onClick={this.onFavClick}
                                />
                            </div>
                        </div>
                        <div className="info-scores">
                            {
                                this.state.scores.map((score, index) =>{
                                    let isSelected = false;

                                    if(Number(score.id) === Number(this.state.score)) {
                                        isSelected = true;
                                    }

                                    return  <Score key={score.id}
                                                   value={score.value}
                                                   id={score.id}
                                                   name={score.name}
                                                   icon={score.icon}
                                                   isSelected={isSelected}
                                                   mdb={this.state.info.data}
                                                   isFavorite={this.state.isFavorite}
                                                   porcent={score.porcent}
                                                   onUpdate={this.onUpdateScore}/>
                                })
                            }
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