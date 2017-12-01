import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { connect } from 'react-redux';

class App extends Component {
    render() {
        return (
            <div className="App">
                App
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            // isLoggedIn: state.auth.status.isLoggedIn
        };
    },
/* 
    액션 생성자를 사용하여 액션을 생성하고,
    해당 액션을 dispatch 하는 함수를 만든 후, 이를 props 로 연결해줍니다.
*/
    (dispatch) => {
        return {
            // login: (email, password) => {
            //     dispatch(auth.login(email, password))
            // }
        };
    }
)(App);
