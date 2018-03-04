/**
 * Created by daniel on 3/03/18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//assets
import './Header.css';

class Header extends Component {

    static propTypes = {
        links: PropTypes.array.isRequired,
    };

    render() {
        const {links} = this.props;

        return (
            <header className="Header">
                <div className="Header-logo">Logo</div>
                {links.map(link => {return <Link to={link.url} key={link.id}>{link.name}</Link>})}
            </header>
        );
    }
}

export default Header;