/**
 * Created by daniel on 3/03/18.
 */
import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import App from './pages/app/App';
import Favorites from './pages/favorites/index';
import Lists from './pages/lists/index';
import Movies from './pages/movies/index';
import Movie from './pages/movie/index';
import MovieContent from './pages/movieContent/movieContent';
import Dashboard from './pages/dashboard/index';
import P404 from './pages/p404/index';
import User from './pages/user/index';

import Login from './pages/login/index';
import Register from './pages/register/index';
import TokenService from './services/TokenService';



const Auth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};


const PrivateRoute = ({component: Component, ...rest}) => {

    function checkLogin(){
        let tokenService = new TokenService();
        let token = tokenService.getToken();

        if(token) {
            token = tokenService.checkToken(token);
            if(token.hasExpired) {
                Auth.signout();
            }else {
                Auth.authenticate();
            }
        }else {
            Auth.signout();
        }

        return <Route
            {...rest}
            render={props =>{
                return (Auth.isAuthenticated ?
                        <Component {...props}/> :
                        (
                            <Redirect to={{
                                pathname: "/login",
                                state: {from: props.location}
                            }}/>
                        )
                )
            }}
        />;
    }

    return checkLogin();

};

const AuthRoute = ({component: Component, ...rest}) => {

    return <Route
        {...rest}
        render={props =>{
            props["auth"] = rest["auth"];
            return <Component {...props}/>;
        }}
    />

};

const Logout = () => {
    let tokenService = new TokenService();
    tokenService.deleteToken();
    Auth.signout();
    return <Redirect to="/login"/>
};

const AppRoutes = () => {
    const links = [
        {
            id: 1,
            name: "Inicio",
            url: "/",
            visibility: "public",
        },
        {
            id: 2,
            name: "Favoritos",
            url: "/favorites",
            visibility: "private",
        },
        {
            id: 3,
            name: "Perfil",
            url: "/user",
            visibility: "private",
        },
        {
            id: 5,
            name: "Peliculas",
            url: "/movies",
            visibility: "private",
        },
        {
            id: 4,
            name: "Salir",
            url: "/logout",
            visibility: "private",
        },
        {
            id: 5,
            name: "Entrar",
            url: "/login",
            visibility: "public",
        }
    ];


    return (
        <App links={links} auth={Auth.isAuthenticated}>
            <Switch>
                <PrivateRoute exact path="/favorites" component={Favorites} />
                <PrivateRoute exact path="/lists" component={Lists} />
                <PrivateRoute exact path="/movies" component={Movies}/>
                <PrivateRoute exact path="/movies/:id" component={MovieContent} />
                <PrivateRoute exact path="/user" component={User} />
                <AuthRoute exact path="/login" component={Login} auth={Auth}/>
                <Route exact path="/register" component={Register} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/" component={Dashboard} />
                <Route component={P404} />
            </Switch>
        </App>
    );
};

export default AppRoutes;