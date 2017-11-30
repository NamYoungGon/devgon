import * as types from '../actions/ActionTypes';

// 초기 상태를 정의합니다.
const initialState = {
    email: '',
    password: '',
    authentication: false
}

// 리듀서 함수를 정의합니다. 
function user(state = initialState, action) {
    // 레퍼런스 생성
    switch(action.type) {
        // 카운터를 새로 추가합니다
        case types.AUTH_LOGIN:
            return {
                email: action.email,
                password: action.password,
                authentication: true
            };

        default:
            return state;
    }
};

export default user