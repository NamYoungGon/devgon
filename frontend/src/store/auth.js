import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

import * as UserAPI  from './../lib/api/user'

// action types
const AUTHENTICATE = 'auth/AUTHENTICATE';
const LOGIN = 'auth/LOGIN';

// action creator
export const authenticate = createAction(AUTHENTICATE)
export const login = createAction(LOGIN, UserAPI.login)

// initial state
const initialState = Map({
    form: Map({
        email: '',
        password: ''
    }),
    authentication: false
});

// reducers
export default handleActions({
    [AUTHENTICATE]: (state, action) => {
        const { email, password } = action.payload
        console.log(UserAPI.login('1111', '1111'))
        console.log(UserAPI.login('nyg4628@gmail.com', '1111'))
        return state.set('authentication', true)
                    .setIn(['form', 'email'], email)
                    .setIn(['form', 'password'], password)
    },
    [LOGIN]: (state, action) => {

    }
}, initialState);