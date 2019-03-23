import React, {Component} from 'react';
import './Comment.css';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sameUser: false,
            userId: props.userId,
            text: props.text,
            isReply: props.isReply,
            replies: props.replies
        };

        this.props = props;
        this.onChangeComment = this.onChangeComment.bind(this);
    }

    onChangeComment(event) {
        console.log(event.target.value);
        this.setState({
            text: event.target.value
        })
    }

    render() {
        return (
            <div className="Comment">
                {
                    this.state.text
                }
                {
                    this.state.replies.map(reply => <div key={reply.id} className="Comment Comment-reply">{reply.text}</div>)
                }
                {
                    !this.state.isReply ? <div><small>Responder</small></div> : <div>&nbsp;</div>
                }
            </div>
        );
    }

}

export default Comment;