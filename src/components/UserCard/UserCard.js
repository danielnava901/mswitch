import React, {Component} from 'react';
import './UserCard.css';


class UserCard extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="User-card">
                <div className="foto">
                    <img src={this.props.avatar} className="foto-src" alt="avatar"/>
                </div>
                <div className="info">
                    <div>
                        <div className="name" style={{margin: "20px 0"}}>
                            <span style={{fontSize: "25px", marginRight: "20px"}}>{this.props.info.username}</span>
                            <span>edit</span>
                        </div>
                    </div>
                    <div className="resume" style={{display: "flex", justifyContent: "space-between", margin: "20px 0"}}>
                        <div><strong style={{marginRight: "10px", cursor: "pointer"}}>{this.props.resume.fav}</strong> <span>Favoritos</span></div>
                        <div><strong style={{marginRight: "10px", cursor: "pointer"}}>{this.props.resume.scores}</strong><span>Calificaciones</span></div>
                        <div><strong style={{marginRight: "10px", cursor: "pointer"}}>{this.props.resume.lists}</strong><span>Listas</span></div>
                    </div>
                    <div>
                        <div>{this.props.info.name}</div>
                    </div>
                </div>
            </div>
        );
    }

}

export default UserCard;