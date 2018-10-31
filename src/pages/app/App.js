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
        const {links} = this.props;

        return (
            <div className="App">
                <div className="App-wrapper">
                    <Header links={links}/>
                    <Content body={children}/>
                </div>
            </div>
            );
    }
}

export default App;
