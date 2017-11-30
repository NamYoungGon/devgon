import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Authentication extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChangeEmail = e => {
        this.setState({
            email: e.target.value
        })
    }

    handleChangePassword = e => {
        this.setState({
            password: e.target.value
        })
    }

    handleClickLogin = () => {
        this.props.onLogin(this.state.email, this.state.password)
    }

    render() {
        const authentication = this.props.authentication === true ? '로그인 성공' : (
            <div>
                <div>
                    email : <input type="text" onChange={this.handleChangeEmail} />
                </div>
                <div>
                    password : <input type="text" onChange={this.handleChangePassword}/>
                </div>
                <button onClick={this.handleClickLogin}>로그인</button>
            </div>
        )

        return (
            <div>
                { authentication }
            </div>
        );
    }
}

Authentication.propTypes = {
    onLogin: PropTypes.func,
    authentication: PropTypes.bool
}

Authentication.defaultProps = {
    onLogin: () => { console.error('onLogin not defined') },
    authentication: false
}

export default Authentication