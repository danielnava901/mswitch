import React, {Component} from 'react';

import {searchById} from '../../services/MovieApi';


class Movie extends Component {

    constructor(props) {
        super(props);

        const mdb_id = this.props.match.params.id;

        this.state = {
            info: {},
            mdb_id: mdb_id
        };
    }

    componentWillMount() {
        searchById(this.state.mdb_id)
        .then(function(data){
            console.log(data);
            this.setState({
                info: data.data
            });
        }.bind(this));
    }

    render() {


        return(
            <div>
                <h3>{this.state.info.title}</h3>
            </div>
        );
    }

}

export default Movie;