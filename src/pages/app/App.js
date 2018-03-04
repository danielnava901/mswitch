import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Content from '../../components/Content';
import Header from '../../components/Header';

import './App.css';

class App extends Component {

    static propTypes = {
        children: PropTypes.object.isRequired
    };

    render() {
        const {children} = this.props;
        const links = [
            {
                id: 1,
                name: "Peliculas",
                url: "/movies"
            },
            {
                id: 2,
                name: "Favoritos",
                url: "/favorites"
            }
        ];


        return (
            <div className="App">
                <Header links={links}/>
                <Content body={children}/>
            </div>
            );
    }
}

export default App;
