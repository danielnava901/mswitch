import React, {Component} from 'react';
import Comment from '../Comment/Comment';

class CommentContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: {
                text: ""
            },
            coments: [
                {
                    id:1,
                    mdbid: 1,
                    text: "textppppp",
                    isSameUser: true,
                    replies: [
                        {
                            mdbid: 1,
                            id:3,
                            text: "respuesta1",
                            isSameUser: true
                        },
                        {
                            id:4,
                            mdbid: 1,
                            text: "respuesta2",
                            isSameUser: true
                        },
                        {
                            id:5,
                            mdbid: 1,
                            text: "respuesta1",
                            isSameUser: true
                        },
                        {
                            id:6,
                            mdbid: 1,
                            text: "respuesta2",
                            isSameUser: true
                        }
                        ]
                },
                {
                    id:2,
                    mdbid: 1,
                    text: "asas",
                    isSameUser: false,
                    isReply: true,
                    replies: [{
                        id:7,
                        mdbid: 1,
                        text: "respuesta1",
                        isSameUser: true
                    },
                    {
                        id:8,
                        mdbid: 1,
                        text: "respuesta2",
                        isSameUser: true
                    }]
                }],
        };

        this.props = props;
        this.onChangeComment = this.onChangeComment.bind(this);
    }

    componentWillMount() {
        if(this.props.type === "MOVIE_COMMENT") {

        }
    }

    onChangeComment(event) {
        this.setState({
            comment: {
                text: event.target.value
            }
        })
    }

    render() {
        return (
            <div>
                <div>
                    <input type="text" value={this.state.comment.text} onChange={event => this.onChangeComment(event)}/>
                </div>
                {
                    this.state.coments.map(comment => {
                        return <Comment key={comment.id}
                                        text={comment.text}
                                        isSameUser={comment.isSameUser}
                                        isReply={comment.isReply}
                                        replies={comment.replies}
                                        mdbid={comment.mdbid}
                                        />
                        }
                    )
                }
            </div>
        );
    }

}

export default CommentContent;