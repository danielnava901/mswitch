import React, {Component} from 'react';
import Movie from "../movie";
import CommentContent from '../../components/CommentContent/CommentContent';

class MovieContent extends Component {
    constructor(props) {
        super(props);
        const mdbid = this.props.match.params.id;
        this.state = {
            mdbid
        }
    }

    render() {
        return <div>
            <Movie mdbid={this.state.mdbid}/>
            <CommentContent mdbid={this.state.mdbid} type="MOVIE_COMMENT"/>
        </div>;
    }
}

export default MovieContent;