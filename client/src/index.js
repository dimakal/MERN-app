import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from './redux/reducers'
import {Provider} from "react-redux";

const store = createStore(reducers, compose(applyMiddleware(thunk )))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)