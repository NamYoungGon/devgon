import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as auth from './../actions/auth'
import { connect } from 'react-redux'

import SignIn from './../components/SignIn'

class Login extends Component {
    handleLogin = (email, password) => {
        return this.props.login(email, password).then(
            (res) => {
                return this.props.response
             }
        )
    }
    handleLogout = () => {
        return this.props.logout().then(res => {return ;})
    }

    render() {
        return (
            <SignIn onLogin={this.handleLogin} onLogout={this.handleLogout} authentication={this.props.isLoggedIn} name={this.props.name} />
        );
    }
}

Login.propTypes = {
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
            login: (email, password) => {
                return dispatch(auth.login_request(email, password))
            },
            logout: () => {
                return dispatch(auth.logout_request())
            }
        }
    }
)(Login)