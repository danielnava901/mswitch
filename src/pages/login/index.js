import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import axios from "axios";
import './login.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isAuthenticated: false
        };

        this.props = props;

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onLogin(e) {
        let form = new FormData();
        form.append("_username", this.state.username);
        form.append("_password", this.state.password);


        axios.post("http://localhost:8000/api/login_check", form)
            .then(function(response) {
                sessionStorage.setItem('token', response.data.token);

                if(response.data.token) {
                    this.props.auth.authenticate(() => {
                        this.setState({
                            isAuthenticated: true
                        })
                    });


                }

            }.bind(this));
    }


    render() {
        return this.state.isAuthenticated ? <Redirect to="/movies"/> :(
            <div>
                <div className="Login">
                    <div className="Login-form">
                        <input type="text" placeholder="Usuario" onChange={this.onChangeUsername}/>
                        <input type="password" placeholder="Contraseña" onChange={this.onChangePassword}/>
                        <button onClick={this.onLogin}>
                            Entrar
                        </button>

                    </div>
                </div>
            </div>
        );
    }

}

export default Login;