import React, { Component } from 'react';
import update from 'react-addons-update';
import PropTypes from 'prop-types';

import { getMessagesByRecepient } from './../../../lib/message'
import socket from './../../../lib/socket';

class Basic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
            messages: []
        }

        let that = this
        socket.on('message', (res) => {
            that.addMessage(res)
        })
    }

    componentDidMount() {
        getMessagesByRecepient('ALL').then((res) => {
            const { messages } = res.data.data
console.log(messages)
            this.setState({
                messages
            })

            this.moveScrollBottom()
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

    moveScrollBottom = () => {
        if (this.discussionWrap)
            this.discussionWrap.scrollTop = this.discussionWrap.scrollHeight
    }    

    addMessage = (message) => {
        this.setState({
            messages: update(
                this.state.messages,
                {
                    $push: [message]
                }
            )
        })

        this.moveScrollBottom()
    }

    render() {
        const messages = this.state.messages
        const name = this.props.name
        const messagesStr = <Messages messages={messages} name={name} />

        return (
            <div>
                <div className="discussion-wrap" ref={wrap => {this.discussionWrap = wrap}}>
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

class Messages extends Component {
    render() {
        const { messages, name } = this.props

        return (
            <div className="discussion">
                { messages.map((data, index) => <Message message={data} key={index} name={name} />) }
            </div>
        )
    }
}

class Message extends Component {
    render() {
        const { sender, data } = this.props.message
        const name = this.props.name

        const isSelf = sender === name
        const liClass = `message ${isSelf ? 'self' : 'other'}`
        const nameStr = isSelf ? null : (
            <div className="message-name ">
                <i aria-hidden="true" className="user icon"></i>
                <h6 className="ui header">{sender}</h6>
            </div>
        )

        const timeStr = (
            <time dateTime="2016-02-10 17:40">오전 09:32</time>
        )
        const cntStr = (
            <span className="cnt"></span>
        )
        return (
            <div className={liClass}>
                {nameStr}
                { isSelf ? timeStr : null }
                { isSelf ? cntStr : null }
                <div className="ui card">
                    <div className="content">{data}</div>
                </div>
                { !isSelf ? timeStr : null }
                { !isSelf ? cntStr : null }
            </div>
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