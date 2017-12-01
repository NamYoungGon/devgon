import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as auth from './../actions/auth';
import { connect } from 'react-redux';

import Authentication from './../components/Authentication';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleLogin = (email, password) => {
        return this.props.login(email, password).then(
            (res) => {
                return this.props.isLoggedIn
             }
        )
    }

    render() {
        return (
            <div>
                <Authentication onLogin={this.handleLogin} authentication={this.props.authentication} />
                <p>
                    로그인 상태 : {this.props.isLoggedIn === true ? 'true' : 'false'}
                </p>
            </div>
        );
    }
}

Login.propTypes = {
    isLoggedIn: PropTypes.bool
}

export default connect(
    (state) => {
        return {
            isLoggedIn: state.auth.status.isLoggedIn
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
        };
    }
)(Login);