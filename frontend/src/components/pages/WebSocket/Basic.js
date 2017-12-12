import React, { Component } from 'react';
import update from 'react-addons-update';
import PropTypes from 'prop-types';

import { getMessagesByRecepient } from './../../../lib/message'
import socket from './../../../lib/socket';
import { addLeadingZero } from './../../../lib/time';

class Basic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
            messages: [],
            users: {},
            isFocus: false
        }
    }

    componentDidMount() {
        getMessagesByRecepient('basic').then((res) => {
            const { messages } = res.data.data

            this.setState({ messages })

            socket.emit('room', {
                command: 'join',
                roomId: 'basic',
                roomName: 'basic',
                roomOwner: 'admin'
            })

            this.moveScrollBottom()
        })

        socket.on('message', (res) => {
            const isFocus = document.hasFocus()

            this.addMessage(res)
            this.setState({ isFocus })

            if (!isFocus) {
                socket.doNotify('arrived message')
            }
        })

        socket.on('join', (res) => {
            const { users } = res
            this.setState({ users })
        })

        window.addEventListener('focus', () => {
            if (socket.getIsLogined() && this.state.isFocus === false) {
                this.setState({ isFocus : true })
            }
        })
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleClickSend = () => {
        const { name, u_no } = this.props.status
        const sender = name
        const recepient = 'basic'
        const command = 'roomchat'
        const type = 'text'
        const data = this.state.message

        socket.emit('message', {
            sender,
            recepient,
            command,
            type,
            data,
            u_no
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
        const name = this.props.status.name
        const messagesStr = <Messages messages={messages} name={name} />

        const usersStr = <JoinedUsers users={this.state.users} />

        return (
            <div>
                {usersStr}
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

class JoinedUsers extends Component {
    render() {
        const { users } = this.props
        
        const usersStr = Object.keys(users).map((user, index) => {
            return (
                <div role="listitem" className="item" key={index}>
                    <div className="content">
                        <div className="header">{users[user].name}</div>
                    </div>
                </div>
            )
        })
        
        return (
            <div>
                <div className="ui medium header">
                    <i aria-hidden="true" className="users big icon"></i>
                    User List
                </div>
                <div role="list" className="ui animated middle aligned list">
                    {usersStr}
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
                divideStr = <div className="ui horizontal divider">{ year }년 { addLeadingZero(month) }월 { addLeadingZero(day) }일</div>
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
            <time>{addLeadingZero(hour)}:{addLeadingZero(minute)}</time>
        )
        
        return (
            <div className={liClass}>
                {nameStr}
                { isSelf ? timeStr : null }
                <div className="ui card">
                    <div className="content">{data}</div>
                </div>
                { !isSelf ? timeStr : null }
            </div>
        )
    }
}

Basic.propTypes = {
    status: PropTypes.object
}

Basic.defaultProps = {
    status: { }
}

export default Basic