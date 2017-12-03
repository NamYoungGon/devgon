import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
                    } else {
                        alert(`${message}`)
                        this.clearInput('password')
                    }
                }
            }
        )
    }
    
    clearInput = (name) => {
        this.setState({
            [name]: ''
        })
    }

    render() {
        const authentication = this.props.authentication === true ? `${this.props.name} 님 반갑습니다.` : (
            <form>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" name="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" name="password" className="form-control" id="inputPassword" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <button type="button" className="btn btn-primary" onClick={this.handleClickLogin}>Login</button>
            </form>
        )

        return (
            <div className="col">
                { authentication }
            </div>
        );
    }
}

SignIn.propTypes = {
    onLogin: PropTypes.func,
    authentication: PropTypes.bool
}

SignIn.defaultProps = {
    onLogin: () => { console.error('onLogin not defined') },
    authentication: false
}

export default SignIn