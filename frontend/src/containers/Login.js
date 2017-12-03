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

    render() {
        return (
            <div>
                <SignIn onLogin={this.handleLogin} authentication={this.props.isLoggedIn} name={this.props.name} />
            </div>
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
                return dispatch(auth.login(email, password))
            }
        }
    }
)(Login)