import * as types from './ActionTypes'

import axios from 'axios'

export function login(email, password) {
    return (dispatch) => {
        // const request = axios({
        //     method: 'POST',
        //     url: '/api/user/login',
        //     data: {
        //         email,
        //         password
        //     }
        // })
        // 
        // return request.then(
        //     response => dispatch(login_success(response)),
        //     err => dispatch(login_fail(err))

        return axios.post('/api/user/login', { email, password })
            .then((response) => {
                dispatch(login_success(response))
            }).catch((err) => {
                dispatch(login_fail(err))
            })
        
    }
}

export function login_success() {
    return {
        type: types.AUTH_SUCCESS
    }
}

export function login_fail() {
    return {
        type: types.AUTH_FAIL
    }
}