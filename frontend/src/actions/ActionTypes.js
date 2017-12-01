/* 
    Action 의 종류들을 선언합니다.
    앞에 export 를 붙임으로서, 나중에 이것들을 불러올 때, 
    import * as types from './ActionTypes' 를 할 수 있어요.
*/

export const AUTH_TEST = 'AUTH_TEST'
export const AUTH_LOGIN = 'AUTH_LOGIN'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAIL = 'AUTH_FAIL'