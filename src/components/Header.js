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
        const {links, auth} = this.props;

        return (
            <header className="Header">
                <div className="Header-logo"><Link to="/">Logo</Link></div>
                <div>
                    {links.filter(link => {
                        if(auth) {
                            return link.visibility === "private" || link.visibility === "both";
                        }else {
                            return link.visibility === "public" || link.visibility === "both";
                        }
                    }).map(link => {return <Link to={link.url} key={link.id}>{link.name}</Link>})}
                </div>
            </header>
        );
    }
}

export default Header;