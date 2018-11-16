import React, {Component} from 'react';

import {searchById} from '../../services/MovieApi';
import apiRoutes from '../../ApiRoutes/apiRoutes';
import axios from 'axios';
import TokenService from '../../services/TokenService';
import './movie.css'


const URL = "https://image.tmdb.org/t/p/w342/";
const tokenService = new TokenService();


//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mdb: props.mdb,

        };

        this.props = props;
        this.onClickScore = this.onClickScore.bind(this);
    }

    onClickScore() {
        let formData = new FormData();
        formData.append("score", this.props.id);
        formData.append("mdb", JSON.stringify(this.state.mdb));

        axios.post(`${apiRoutes.base}${apiRoutes.routes.getMovie}${this.state.mdb.id}`, formData, {
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`
            }
        }).then(response => {
            console.log(".---> ", response);
            this.props.onUpdate()
        });
    }

    render() {
        console.log(`/images/emojis/${this.props.icon}.png`);
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
            mdb_id: mdb_id
        };

        this.getMovieForUser = this.getMovieForUser.bind(this);
        this.onUpdateScore = this.onUpdateScore.bind(this);
    }

    getMovieForUser() {
        console.log("getMovieForUser")
        return axios.get(`${apiRoutes.base}${apiRoutes.routes.getMovie}${this.state.mdb_id}`, {
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`
            }
        });
    }

    onUpdateScore() {
        this.getMovieForUser().then(function(response) {
            console.log("res", response);
            if ("data" in response) {
                this.setState({
                    scores: response.data.scores,
                });

                if ("data" in response.data) {
                    this.setState({
                        score: response.data.data.score
                    });
                }
            }
        }.bind(this));
    }

    componentWillMount() {

        searchById(this.state.mdb_id)
            .then(function(data) {
                this.setState({
                    info: data
                });
            }.bind(this));

        this.getMovieForUser().then(function(response) {
            console.log("res", response);
            if("data" in response) {
                this.setState({
                    scores: response.data.scores,
                });

                if("data" in response.data) {
                    this.setState({
                        score: response.data.data.score
                    });
                }
            }



        }.bind(this));
    }

    render() {
        let posterPath = this.state.info.data.poster_path;

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
                        <div className="info-scores-section">
                            <div className="info-data-vote-average">
                                {this.state.info.data.vote_average}
                            </div>
                            <div className="info-scores">
                                {
                                    this.state.scores.map((score, index) =>{
                                        let isSelected = false;

                                        if(Number(score.id) === Number(this.state.score)) {
                                            isSelected = true;
                                        }

                                        console.log(index, isSelected);
                                        return  <Score key={score.id}
                                                       value={score.value}
                                                       id={score.id}
                                                       name={score.name}
                                                       icon={score.icon}
                                                       isSelected={isSelected}
                                                       mdb={this.state.info.data}
                                                       porcent={score.porcent}
                                                        onUpdate={this.onUpdateScore}/>
                                    })
                                }
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