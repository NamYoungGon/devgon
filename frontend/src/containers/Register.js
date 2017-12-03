import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as auth from './../actions/auth'
import { connect } from 'react-redux'

import SignUp from './../components/SignUp'

class Register extends Component {
    handleRegister = (email, password, name) => {
        return this.props.register(email, password, name).then(
            (res) => {
                return this.props.response
             }
        )
    }

    render() {
        return (
            <div>
                <SignUp onRegister={this.handleRegister} authentication={this.props.isLoggedIn} />
            </div>
        )
    }
}

Register.propTypes = {
    isLoggedIn: PropTypes.bool
}

export default connect(
    (state) => {
        return {
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
            register: (email, password, name) => {
                return dispatch(auth.register(email, password, name))
            }
        }
    }
)(Register)