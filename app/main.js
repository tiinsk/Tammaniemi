import 'babel-polyfill';
import './stylesheets/main.scss';
import React from 'react';
import {render} from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import routes from './routes';

import configureStore from './configure_store';

const store = configureStore();

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes(store)}
        </Router>
    </Provider>
), document.getElementById('app'));
