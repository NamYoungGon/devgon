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
    }

    componentDidMount() {
        getMessagesByRecepient('basic').then((res) => {
            const { messages } = res.data.data

            this.setState({
                messages
            })

            socket.emit('room', {
                command: 'join',
                roomId: 'basic',
                roomName: 'basic',
                roomOwner: 'admin'
            })

            this.moveScrollBottom()
        })

        socket.on('message', (res) => {
            this.addMessage(res)
        })

    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleClickSend = () => {
        const sender = this.props.name
        const recepient = 'basic'
        const command = 'roomchat'
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
                <div>
                    <div className="ui medium header">
                        <i aria-hidden="true" className="users big icon"></i>
                        User List
                    </div>
                    <div role="list" className="ui animated middle aligned list">
                        <div role="listitem" className="item">
                            <div className="content">
                                <div className="header">Grape</div>
                            </div>
                        </div>
                        <div role="listitem" className="item">
                            <div className="content">
                                <div className="header">Mang</div>
                            </div>
                        </div>
                    </div>
                </div>
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
        
        let prevMonth, prevDay

        const messagesStr = messages.map((data, index) => {
            const date = data.date
            const { year, month, day } = date
            let divideStr = null
            if (prevMonth !== month || prevDay !== day) {
                prevMonth = month
                prevDay = day
                divideStr = <div className="ui horizontal divider">{ year }년 { month }월 { day }일</div>
            }
            return (
                <div key={index}>
                    { divideStr } 
                    <Message message={ data } name={ name } />
                </div>
            )
        })

        return (
            <div className="discussion">
                { messagesStr }
            </div>
        )
    }
}

class Message extends Component {
    render() {
        const { sender, date, data } = this.props.message
        const { hour, minute } = date
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
            <time>{hour}:{minute}</time>
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