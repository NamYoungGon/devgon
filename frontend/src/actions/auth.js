import * as types from './ActionTypes'

import axios from 'axios'

export function login_request(email, password) {
    return (dispatch) => {
        dispatch(login());
        return axios.post('/api/user/login', { email, password })
            .then((res) => {
                dispatch(response(res))
                if (res.data.data)
                    dispatch(login_success(res.data.data))
            }).catch((err) => {
                dispatch(response({
                    data: {
                        error: true,
                        data: null,
                        message: err
                    }
                }))
                dispatch(login_fail(err))
            })
    }
}

export function login() {
    return {
        type: types.AUTH_LOGIN
    }
}

export function login_success(name) {
    return {
        type: types.AUTH_LOGIN_SUCCESS,
        payload: name
    }
}

export function login_fail() {
    return {
        type: types.AUTH_LOGIN_FAIL
    }
}

export function logout_request() {
    return (dispatch) => {
        return axios.post('/api/user/logout')
            .then((res) => {
                dispatch(logout())
            }).catch((err) => {
                dispatch(logout())
            })
    }
}
export function logout() {
    return {
        type: types.AUTH_LOGOUT
    }
}

export function register(email, password, name) {
    return (dispatch) => {
        return axios.post('/api/user/register', { email, password, name })
            .then((res) => {
                dispatch(response(res))
                if (res.data.data)
                    dispatch(register_success())
            }).catch((err) => {
                dispatch(response({
                    data: {
                        error: true,
                        data: null,
                        message: err
                    }
                }))
                dispatch(register_fail(err))
            })
    }
}

export function register_success() {
    return {
        type: types.AUTH_REGISTER_SUCCESS
    }
}

export function register_fail() {
    return {
        type: types.AUTH_REGISTER_FAIL
    }
}

export function response({ data }) {
    return {
        type: types.AUTH_RESPONSE,
        payload: data
    }
}