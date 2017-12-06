import React, { Component } from 'react';
// import update from 'react-addons-update';
import PropTypes from 'prop-types';

// import { getMessagesByRecepient } from './../../../lib/message'
// import socket from './../../../lib/socket';

class Room extends Component {
    render() {
        return (
            <div>
                <div>
                    방 목록
                </div>
                <div>
                    <button>방 만들기</button>
                </div>
            </div>
        )
    }
}

Room.propTypes = {
    name: PropTypes.string
}

Room.defaultProps = {
    name: ''
}

export default Room