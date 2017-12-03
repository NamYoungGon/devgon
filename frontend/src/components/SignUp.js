import React, { Component } from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            name: '',
            redirect: false
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleClickRegister = () => {
        const { email, password, name } = this.state
        this.props.onRegister(email, password, name).then(
            ({ error, message, data }) => {
                if (error) {
                    alert(`error -> ${message}`)
                } else {
                    if (data) {
                        alert(`${message}`)
                        this.setState({
                            redirect: true
                        })
                    } else {
                        alert(`${message}`)
                    }
                }
            }
        )
    }

    render() {
        const { redirect } = this.state
        if (redirect)
            return <Redirect to='/login'/>

        const authentication = this.props.authentication === true ? '로그인 상태' : (
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
                <div className="form-group">
                    <label htmlFor="inputName">Name</label>
                    <input type="text" name="name" className="form-control" id="inputName" placeholder="name" value={this.state.name} onChange={this.handleChange} />
                </div>           
                <button type="button" className="btn btn-primary" onClick={this.handleClickRegister}>Register</button>
            </form>
        )
        return (
            <div className="col">
                { authentication }
            </div>
        )
    }
}

export default SignUp
