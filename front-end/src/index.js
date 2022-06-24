import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './App.css';

import {createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducers from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'


const store=createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(<BrowserRouter>
<Provider store={store}>
    <App />
    </Provider>
      </BrowserRouter>
 ,document.getElementById('root'));
 
 
 