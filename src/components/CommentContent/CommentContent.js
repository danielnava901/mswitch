import React, {Component} from 'react';
import Comment from '../Comment/Comment';

class CommentContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            coments: []
        };

        this.props = props;
    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                {this.state.coments.map(comment => { return <Comment/>})}
            </div>
        );
    }

}

export default CommentContent;