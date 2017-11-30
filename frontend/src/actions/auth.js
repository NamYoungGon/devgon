import * as types from './ActionTypes'

export const login = (email, password) => {
    return {
        type: types.AUTH_LOGIN,
        email,
        password
    }
}