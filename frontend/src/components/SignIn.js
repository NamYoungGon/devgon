import React, { Component } from 'react'
import PropTypes from 'prop-types'

import socket from './../lib/socket'

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleClickLogin = () => {
        const { email, password } = this.state
        this.props.onLogin(email, password).then(
            ({ error, message, data }) => {
                if (error) {
                    alert(`error -> ${message}`)
                } else {
                    if (data) {
                        alert(`${message}`)

                        const { name } = data

                        socket.init({
                            email, 
                            name
                        })
                    } else {
                        alert(`${message}`)
                        this.clearInput('password')
                    }
                }
            }
        )
    }

    handleClickLogout = () => {
        this.props.onLogout().then(
            () => {
                
            }
        )
    }
    
    clearInput = name => this.setState({ [name]: '' })

    render() {
        const authentication = this.props.authentication === true ? (
                <div>
                    <h5 className="ui header">{this.props.name} 님 반갑습니다.</h5>
                    <button type="button" className="ui button primary" onClick={this.handleClickLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <div className="row">
                        <h5 className="ui header">Email address</h5>
                        <div className="ui input small fluid">
                            <input type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <h5 className="ui header">Password</h5>
                        <div className="ui input small fluid">
                            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <button type="button" className="ui button primary" onClick={this.handleClickLogin}>Login</button>
                    </div>
                </div>
            )

        return (
            <div className="column">
                <div className="ui horizontal divider">Login</div>
                { authentication }
            </div>
        );
    }
}

SignIn.propTypes = {
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    authentication: PropTypes.bool
}

SignIn.defaultProps = {
    onLogin: () => { console.error('onLogin not defined') },
    onLogout: () => { console.error('onLogout not defined') },
    authentication: false
}

export default SignIn