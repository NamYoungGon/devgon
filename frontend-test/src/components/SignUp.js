import React, { Component } from 'react'
import { Redirect } from 'react-router'

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            emailAuthentication: false,
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

    handleClickSendEmail = () => {
        this.emailInput.disabled = true
    }

    render() {
        const { redirect } = this.state
        if (redirect)
            return <Redirect to='/login'/>

        const authentication = this.props.authentication === true ? '로그인 상태' : (
            <div>
                <div className="row">
                    <h5 className="ui header">Email address</h5>
                    <div className="ui input small fluid">
                        <input type="email" name="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} ref={input => this.emailInput = input} />
                        <button type="button" className="ui button mini" onClick={this.handleClickSendEmail}>인증메일 전송</button>
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
                    <h5 className="ui header">Name</h5>
                    <div className="ui input small fluid">
                        <input type="text" name="name"  placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                    </div>
                </div>
                <br/>
                <div className="row">
                    <button type="button" className="ui button primary" onClick={this.handleClickRegister}>Register</button>
                </div>
            </div>
        )
        return (
            <div className="column">
                <h3 className="ui dividing header">Register</h3>
                { authentication }
            </div>
        )
    }
}

export default SignUp