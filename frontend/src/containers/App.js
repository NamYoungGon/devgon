import React, { Component } from 'react';

import * as auth from '../actions/auth';
import { connect } from 'react-redux';

import Authentication from './../components/Authentication';

class App extends Component {
    constructor(props) {
        super(props)
    }

    handleLogin = (email, password) => {
        this.props.login(email, password)
    }

    render() {
        return (
            <div className="App">
                <Authentication onLogin={this.handleLogin} authentication={this.props.authentication} />
                <p>
                    {this.props.email}
                    {this.props.password}
                    {this.props.authentication}
                </p>
            </div>
        );
    }
}

export default connect(
// store 안의 state 값을 props 로 연결해줍니다.
    (state) => {
        return {
            email: state.auth.email,
            password: state.auth.password,
            authentication: state.auth.authentication
        };
    },
/* 
    액션 생성자를 사용하여 액션을 생성하고,
    해당 액션을 dispatch 하는 함수를 만든 후, 이를 props 로 연결해줍니다.
*/
    (dispatch) => {
        return {
            login: (email, password) => {
                dispatch(auth.login(email, password))
            }
        };
    }
)(App);
