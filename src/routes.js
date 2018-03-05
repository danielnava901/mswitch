/**
 * Created by daniel on 3/03/18.
 */
import React from 'react';
import {Route, Switch} from 'react-router-dom';

import App from './pages/app/App';
import Favorites from './pages/favorites/index';
import Lists from './pages/lists/index';
import Movies from './pages/movies/index';
import Dashboard from './pages/dashboard/index';
import P404 from './pages/p404/index';

const AppRoutes = () => {
    return (
        <App>
            <Switch>
                <Route exact path="/favorites" component={Favorites} />
                <Route exact path="/lists" component={Lists} />
                <Route exact path="/movies" component={Movies} />
                <Route exact path="/" component={Dashboard} />
                <Route component={P404} />
            </Switch>
        </App>
    );
};

export default AppRoutes;