/* 
    Action 의 종류들을 선언합니다.
    앞에 export 를 붙임으로서, 나중에 이것들을 불러올 때, 
    import * as types from './ActionTypes' 를 할 수 있어요.
*/

export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export const AUTH_REGISTER = 'AUTH_REGISTER'
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS'
export const AUTH_REGISTER_FAIL = 'AUTH_REGISTER_FAIL'

export const AUTH_RESPONSE = 'AUTH_RESPONSE'