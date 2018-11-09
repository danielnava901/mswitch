import React, {Component} from 'react';
import './register.css'
import axios from 'axios';



class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            name: ""
        };

        this.onRegisterRequest = this.onRegisterRequest.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeName = this.onChangeName.bind(this);

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

    onRegisterRequest(e) {
        let form = new FormData();
        form.append("_name", this.state.name);
        form.append("_email", this.state.email);
        form.append("_username", this.state.username);
        form.append("_password", this.state.password);


        axios.post("http://localhost:8000/api/register", form)
        .then(function(response) {
            console.log("AXIOS response");
            console.log(response);
        });
    }

    render() {
        return (
            <div className="Register">
                <div className="Register-form">
                    <input type="text" placeholder="Nombre" onChange={this.onChangeName}/>
                    <input type="text" placeholder="Usuario" onChange={this.onChangeUsername}/>
                    <input type="text" placeholder="Email" onChange={this.onChangeEmail}/>
                    <input type="password" placeholder="Contraseña" onChange={this.onChangePassword}/>

                    <button onClick={this.onRegisterRequest}>
                        Registrar
                    </button>
                </div>
            </div>
        );
    }
}


export default Register;