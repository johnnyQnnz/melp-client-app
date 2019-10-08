import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
    render () {
        return (
            <nav className="nav">
                <a><img src="logoWhite.png"/></a>
                <h1><Link to="/">MELP</Link></h1>
            </nav>
        );
    }
}