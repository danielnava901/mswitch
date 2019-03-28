import React, {Component} from 'react';
import Comment from '../Comment/Comment';
import axios from 'axios';
import TokenService from "../../services/TokenService";
import apiRoutes from "../../ApiRoutes/apiRoutes";
const tokenService = new TokenService();

class CommentContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: {
                text: ""
            },
            comments: [],
        };

        this.props = props;
        this.onChangeComment = this.onChangeComment.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.refreshComments = this.refreshComments.bind(this);
    }

    componentWillMount() {
        if(this.props.type === "MOVIE_COMMENT") {
            this.refreshComments();
        }
    }

    refreshComments() {
        let {mdbid} = this.props;
        console.log("..................");
        axios.get(`${apiRoutes.base}${apiRoutes.routes.getComment}${mdbid}`, {
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`
            }
        }).then(response => {
            console.log("***********************");
            if(response.data && response.data.data) {
                console.log(response.data.data);
                this.setState({
                    comments: response.data.data
                });
            }
        });
    }

    onChangeComment(event) {
        this.setState({
            comment: {
                text: event.target.value
            }
        })
    }

    sendComment() {
        let comment = this.state.comment.text;
        let {mdbid} = this.props;
        let form = new FormData();
        form.append("comment", comment);
        axios.post(`${apiRoutes.base}${apiRoutes.routes.getComment}${mdbid}`, form, {
            headers: {
                Authorization: `Bearer ${tokenService.getToken()}`
            }
        }).then(respose => {
            this.setState({
                comment: {
                    text: ""
                 }
            });
            this.refreshComments();
        });
    }

    render() {
        console.log("render", this.state.comments);
        return (
            <div>
                <div>
                    <input type="text" value={this.state.comment.text}
                           onChange={event => this.onChangeComment(event)}/>
                    <button onClick={this.sendComment}>Enviar</button>
                </div>
                {
                    this.state.comments.map(comment => {
                        return <Comment
                                commentId={comment.id}
                                imdbId={this.props.mdbid}
                                key={comment.id}
                                text={comment.text}
                                userId={comment.user_id}
                                isSameUser={comment.is_same_user}
                                isReply={comment.is_reply}
                                replies={comment.replies}
                                mdbid={comment.imdb_id}
                                date={comment.date}
                                refreshComments={this.refreshComments}
                                />
                        }
                    )
                }
            </div>
        );
    }

}

export default CommentContent;