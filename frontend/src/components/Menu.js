import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <nav>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">User</a>
                        <ul className="nav-sub">
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-link" activeClassName="active">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link" activeClassName="active">Register</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" href="#">WebSocket</a>
                        <ul className="nav-sub">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/websocket/basic">Basic</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/websocket/room">Room</NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        );
    }
}
                // <div className="bd-toc-item">
                //     <p>User</p>
                //     <ul className="nav bd-sidenav">
                //         <li><NavLink to="/signin" activeClassName="active">SignIn</NavLink></li>
                //         <li><NavLink to="/signup" activeClassName="active">SignUp</NavLink></li>
                //     </ul>
                // </div>
                // <div className="bd-toc-link"><NavLink exact to="/" activeClassName="active">Home</NavLink></div>
                // <div><NavLink to="/websocket/basic">Basic</NavLink></div>
                // <div><NavLink to="/websocket/room">Room</NavLink></div>
                // <div><NavLink to="/2">1</NavLink></div>
                // <div><NavLink to="/3">2</NavLink></div>

export default Menu;