import React, { Component } from 'react'
import { Redirect } from 'react-router'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Basic, Room } from './../components/pages/WebSocket';

class WebSocket extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to='/login'/>
        }

        const { match } = this.props
        
        const outputBasic = (
            <Basic authentication={this.props.isLoggedIn} name={this.props.name} />
        )

        const outputRoom = (
            <Room authentication={this.props.isLoggedIn} name={this.props.name} />
        )

        let output
        let outputSub = ''
        switch (match.params.sub) {
            case 'basic':
                output = outputBasic
                outputSub = 'Basic'
                break
                case 'room':
                output = outputRoom
                outputSub = 'Room'
                break
            default:
                output = null
                break
        }

        return (
            <div className="column">
                <h3 className="ui dividing header">{outputSub}</h3>
                {output}
            </div>
        )
    }
}

WebSocket.propTypes = {
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

        }
    }
)(WebSocket)