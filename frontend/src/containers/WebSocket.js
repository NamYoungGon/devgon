import React from 'react';
import { Route } from 'react-router-dom';
import { Basic, Room } from './../components/pages/WebSocket';

const WebSocket = ({match}) => {

    return (
            <Route exact path={match.url} component={
                    match.params.sub === "basic" ? Basic : 
                    match.params.sub === "room" ? Room : 
                    null
            }/>
        );
    };

export default WebSocket;