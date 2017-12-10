import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'

import Menu from './../components/Menu'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import WebSocket from './WebSocket'
import NotFoundPage from './../components/NotFoundPage'

import * as auth from './../actions/auth'
import { connect } from 'react-redux'

import socket from './../lib/socket'

class App extends Component {
    componentDidMount() {
        if (this.props.isLoggedIn === false) {
            this.props.login().then(
                (res) => {
                    if (this.props.name !== '') {
                        const { name, email } = this.props.response.data
    
                        socket.init({
                            email, 
                            name
                        })
                    }
                }
            )
        }
    }

    render() {
        const menuStyles = {
            position: 'fixed',
            top: '0px',
            bottom: '0px',
            left: '0px',
            width: '250px',
        }

        const sectionStyles = {
            'marginLeft': '250px', 
            'minWidth': '365px', 
            'maxWidth': '1150px'
        }
        return (
            <Router>
                <div>
                    <div className="ui" style={menuStyles}>
                        <Menu />
                    </div>
                    <div style={sectionStyles}>
                        <div className="ui padded one column grid">
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route path="/login" component={Login}/>
                                <Route path="/register" component={Register}/>
                                <Route path='/websocket/:sub' component={WebSocket}/>
                                <Route component={NotFoundPage}/>
                            </Switch>
                        
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
// <Route path='/websocket' component={WebSocket}/>
// <Route exact path="/" component={Home}/>
// <Route path="/about/:username" component={About}/>
// <Route path="/posts" component={Posts}/>
// <Route path="/login" component={Login}/>
// <Route path="/me" component={MyPage}/>
// <Route path="/search" component={Search}/>
// <Route component={NoMatch}/>

App.propTypes = {
    isLoggedIn: PropTypes.bool,
    name: PropTypes.string
}

export default connect(
    (state) => {
        return {
            name: state.auth.status.name,
            isLoggedIn: state.auth.status.isLoggedIn,
            response: state.auth.response
        };
    },
/* 
    액션 생성자를 사용하여 액션을 생성하고,
    해당 액션을 dispatch 하는 함수를 만든 후, 이를 props 로 연결해줍니다.
*/
    (dispatch) => {
        return {
            login: () => {
                return dispatch(auth.login_request())
            }
        }
    }
)(App);
