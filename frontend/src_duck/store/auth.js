import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

import * as UserAPI  from './../lib/api/user'

// action types
const AUTHENTICATE = 'auth/AUTHENTICATE';

// action creator
export const authenticate = createAction(AUTHENTICATE)

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

        return state.set('authentication', true)
                    .setIn(['form', 'email'], email)
                    .setIn(['form', 'password'], password)
    }
}, initialState);