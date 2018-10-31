/**
 * Created by daniel on 3/03/18.
 */
import React, { Component } from 'react';
import UserCard from '../../components/UserCard/UserCard';

class User extends Component {

    constructor(props) {
        super(props);
        this.state ={
            movies: [],
            avatar: "/images/profile/avatar.png",
            resume: {
                fav: 1,
                scores: 4,
                lists: 12
            },
            info: {
                name: "Daniel Nava",
                username: "dnviveros"
            }
        };
    }

    componentWillMount() {
        // pedir info del usuario y actualizar state
    }

    render() {

        return (
            <div>
                <UserCard avatar={this.state.avatar} resume={this.state.resume} info={this.state.info}/>
            </div>
        );
    }
}

export default User;