import React, {Component} from 'react';
import './Comment.css';
import axios from "axios";
import apiRoutes from "../../ApiRoutes/apiRoutes";
import TokenService from "../../services/TokenService";

const tokenService = new TokenService();

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sameUser: props.isSameUser,
            userId: props.userId,
            text: props.text,
            isReply: props.isReply,
            replies: props.replies,
            show_input_reply: false,
            reply_text: ""
        };

        this.props = props;
        this.onChangeComment = this.onChangeComment.bind(this);
        this.showInputReply = this.showInputReply.bind(this);
        this.enterInputReply = this.enterInputReply.bind(this);
        this.changeInputReply = this.changeInputReply.bind(this);
    }

    onChangeComment(event) {
        this.setState({
            text: event.target.value
        });
    }

    showInputReply() {
        this.setState({
            show_input_reply: !this.state.show_input_reply,
            reply_text: !this.state.show_input_reply ? "" : this.state.reply_text
        });
    }

    enterInputReply(e) {
        if (e.key === 'Enter') {
            console.log('do validate');
            let comment = this.state.reply_text;
            let {mdbid, commentId} = this.props;
            let form = new FormData();
            form.append("comment", comment);
            form.append("parentId", commentId);
            axios.post(`${apiRoutes.base}${apiRoutes.routes.getComment}${mdbid}`, form, {
                headers: {
                    Authorization: `Bearer ${tokenService.getToken()}`
                }
            }).then(respose => {
                this.setState({
                    reply_text: ""
                });
                this.props.refreshComments();
            });
        }
    }

    changeInputReply(e) {
        console.log(e.target.value);
        this.setState({
            reply_text: e.target.value
        });
    }

    render() {
        let inputReply = <input type="text" value={this.state.reply_text}
                                onChange={this.changeInputReply}
                                onKeyPress={this.enterInputReply} />;

        return (
            <div className="Comment">
                {
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <span>{this.props.text}</span>
                        <span>{this.props.date}</span>
                    </div>

                }
                {
                    this.props.replies.map(reply => {
                        return (
                            <div key={reply.id} className="Comment Comment-reply"
                                 style={{display: "flex", justifyContent: "space-between"}}>
                                <span>{reply.text}</span>
                                <span>{reply.date}</span>
                            </div>
                        )
                    })
                }
                {
                    Number(this.props.isReply) === 0 ?
                                    <div>
                                        <small onClick={this.showInputReply} style={{cursor: "pointer"}}>Responder</small>
                                        {
                                            this.state.show_input_reply ? inputReply : ""
                                        }
                                    </div> :
                                    <div>&nbsp;</div>
                }
            </div>
        );
    }

}

export default Comment;