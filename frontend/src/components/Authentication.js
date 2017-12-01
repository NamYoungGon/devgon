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

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClickLogin = () => {
        this.props.onLogin(this.state.email, this.state.password).then(
            (res) => {
                console.log(res)
            }
        )
      
    }

    render() {
        const authentication = this.props.authentication === true ? '로그인 성공' : (
            <div>
                <div>
                    email : <input type="text" name="email" onChange={this.handleChange} />
                </div>
                <div>
                    password : <input type="text" name="password" onChange={this.handleChange}/>
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