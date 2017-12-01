import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './containers/Login';
import registerServiceWorker from './registerServiceWorker';

// Redux 관련 불러오기
import { Provider } from 'react-redux';
import configureStore from './store/configureStore'

// 스토어 생성
// const store = createStore(reducers, applyMiddleware(thunk));
const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Login />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
