import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

// 초기 상태를 정의합니다.
const initialState = {
    login: {
        // I - init
        // P - processing
        // F - fail
        // S - success
        status: 'I'
    },
    register: {
        status: 'I'
    },
    status: {
       isLoggedIn: false 
    }
}

// 리듀서 함수를 정의합니다. 
const auth = (state = initialState, action) => {
    switch(action.type) {
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: {
                        $set: 'P'
                    }
                }
            })
        case types.AUTH_SUCCESS:
            return update(state, {
                login: {
                    status: {
                        $set: 'S'
                    }
                },
                status: {
                    isLoggedIn: {
                        $set: true
                    }
                }
            })
        case types.AUTH_FAIL:
            return update(state, {
                login: {
                    status: {
                        $set: 'F'
                    }
                }
            })
        default:
            return state;
    }
};

export default auth