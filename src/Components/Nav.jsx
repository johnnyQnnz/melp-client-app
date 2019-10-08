import React from 'react';
import './Nav.css';
import { HashRouter, Route, Link, Switch} from 'react-router-dom';

export default class Nav extends React.Component {
    render () {
        return (
            <nav className="nav">
                <h1><Link to="/">MELP</Link></h1>
            </nav>
        );
    }
}