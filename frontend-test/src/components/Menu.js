import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { Header } from 'semantic-ui-react'


class Menu extends Component {
    render() {
        return (
            <div className="ui vertical menu">
                <div className="item">
                    <Header as="h4">User</Header>
                    <div className="menu">
                        <NavLink to="/login" className="nav-link item" activeClassName="active">Login</NavLink>
                        <NavLink to="/register" className="nav-link item" activeClassName="active">Register</NavLink>
                    </div>
                </div>
                <div className="item">
                    <Header as="h4">WebSocket</Header>
                    <div className="menu">
                        <NavLink className="nav-link item" to="/websocket/basic">Basic</NavLink>
                        <NavLink className="nav-link item" to="/websocket/room">Room</NavLink>
                    </div>
                </div>
                <div className="item">
                    <Header as="h4">Widget</Header>
                    <div className="menu">
                        <NavLink className="nav-link item" to="/widget/scheduler">Scheduler</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;