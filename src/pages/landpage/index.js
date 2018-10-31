/**
 * Created by daniel on 3/03/18.
 */
import React, { Component } from 'react';

class LandPage extends Component {

    constructor(props) {
        super(props);
        this.state ={
            movies: []
        };
    }

    componentWillMount() {

    }

    render() {

        return (
            <div>
                <h1>Hola</h1>
            </div>
        );
    }
}

export default LandPage;