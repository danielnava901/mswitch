/**
 * Created by daniel on 3/03/18.
 */
import React from 'react';
import {Route, Switch} from 'react-router-dom';

import App from './pages/app/App';
import Favorites from './pages/favorites/index';
import Lists from './pages/lists/index';
import Movies from './pages/movies/index';
import Movie from './pages/movies/movie';
import Dashboard from './pages/dashboard/index';
import P404 from './pages/p404/index';
import User from './pages/user/index';

const AppRoutes = () => {
    const links = [
        {
            id: 1,
            name: "Inicio",
            url: "/movies"
        },
        {
            id: 2,
            name: "Favoritos",
            url: "/favorites"
        },
        {
            id: 3,
            name: "Perfil",
            url: "/user"
        }
    ];


    let v = 1;
    let intro = v===1 ? <App links={links}>
        <Switch>
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/lists" component={Lists} />
            <Route exact path="/movies" component={Movies} />
            <Route exact path="/movies/:id" component={Movie} />
            <Route exact path="/user" component={User} />
            <Route exact path="/" component={Dashboard} />
            <Route component={P404} />
        </Switch>
    </App> : <div>H</div>;

    return (
        intro
    );
};

export default AppRoutes;