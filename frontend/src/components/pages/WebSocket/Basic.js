import React, { Component } from 'react'
import update from 'react-addons-update'
import PropTypes from 'prop-types'

import socket from './../../../lib/socket'

class Basic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
            messages: []
        }

        let that = this
        socket.on('message', (res) => {
            console.log(res)

            that.addMessage(res)
        })
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleClickSend = () => {
        const sender = this.props.name
        const recepient = 'ALL'
        const command = 'chat'
        const type = 'text'
        const data = this.state.message

        socket.emit('message', {
            sender,
            recepient,
            command,
            type,
            data
        })

        this.clearInput('message')
    }

    handleKeyUpSend = e => {
        if (e.keyCode === 13) this.handleClickSend()
    }

    clearInput = name => this.setState({ [name]: '' })

    addMessage = (message) => {
        this.setState({
            messages: update(
                this.state.messages,
                {
                    $push: [message]
                }
            )
        })
    }

    render() {
        const messages = this.state.messages
        const name = this.props.name
        const messagesStr = <Messages messages={messages} name={name} />

        return (
            <div>
                <div>
                    {messagesStr}
                </div>
                <br/>
                <div>
                    <div className="ui input fluid">
                        <input type="text" name="message" placeholder="Enter message" value={this.state.message} onChange={this.handleChange} onKeyUp={this.handleKeyUpSend} />
                        <button type="button" className="ui button" onClick={this.handleClickSend}>Send</button>
                    </div>
                </div>
            </div>
        )
    }

    
}

{/* <ol className="discussion">
    <li className="other">
        <div className="messages">
            <p>어디쯤이야? 다들 기다리고 있어.</p>
            <time dateTime="2016-02-10 18:10">18시 10분</time>
        </div>
    </li>
    <li className="self">
        <div className="messages">
            <p>차가 막히네. 조금 늦을 듯.</p>
            <time dateTime="2016-02-10 18:00">18시 00분</time>
        </div>
    </li>
    <li className="other">
        <div className="messages">
            <p>강남역에 있는 카페에 자리 잡았어.</p>
            <time dateTime="2016-02-10 17:40">17시 40분</time>
        </div>
    </li>
</ol> */}

class Messages extends Component {
    render() {
        const { messages, name } = this.props

        return (
            <ol className="discussion">
                { messages.map((data, index) => <Message message={data} key={index} name={name} />) }
            </ol>
        )
    }
}

class Message extends Component {
    render() {console.log(this.props)
        const { sender, data } = this.props.message
        const name = this.props.name

        const liClass = sender === name ? 'self' : 'other'
        return (
            <li className={liClass}>
                <div className="messages">
                    <p>{data}</p>
                    <time dateTime="2016-02-10 17:40">17시 40분</time>
                </div>
            </li>
        )
    }
}

Basic.propTypes = {
    name: PropTypes.string
}

Basic.defaultProps = {
    name: ''
}

export default Basic
