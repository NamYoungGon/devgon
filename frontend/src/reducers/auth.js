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
       isLoggedIn: false,
       name: ''
    },
    response: {
        error: null,
        message: '',
        data: null
    }
}

// 리듀서 함수를 정의합니다. 
const auth = (state = initialState, action) => {
    switch(action.type) {
        case types.AUTH_RESPONSE:
            return update(state, {
                response: {
                    $set: action.payload
                }
            })
        case types.AUTH_LOGIN:
            return update(state, {
                login: {
                    status: {
                        $set: 'P'
                    }
                }
            })
        case types.AUTH_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: {
                        $set: 'S'
                    }
                },
                status: {
                    isLoggedIn: {
                        $set: true
                    },
                    name: {
                        $set: action.payload
                    }
                }
            })
        case types.AUTH_LOGIN_FAIL:
            return update(state, {
                login: {
                    status: {
                        $set: 'F'
                    }
                }
            })
        case types.AUTH_LOGOUT:
            return update(state, {
                status: {
                    isLoggedIn: {
                        $set: false
                    },
                    name: {
                        $set: ''
                    }
                }
            })
        case types.AUTH_REGISTER:
            return update(state, {
                register: {
                    status: {
                        $set: 'P'
                    }
                }
            })
        case types.AUTH_REGISTER_SUCCESS:
            return update(state, {
                register: {
                    status: {
                        $set: 'S'
                    }
                }
            })
        case types.AUTH_REGISTER_FAIL:
            return update(state, {
                register: {
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