import 'babel-polyfill';
import './stylesheets/main.scss';

import React from 'react';
import {render} from 'react-dom';
import WebFont from 'webfontloader';
import { Router, browserHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { isUserLoggedIn } from './actions/login_actions';

import routes from './routes';

import configureStore from './configure_store';

const store = configureStore();

WebFont.load({
  google: {
        families: ['Roboto:300,400,500,700', 'Material Icons', 'Sacramento'],
    },
});

render((
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes(store)}
        </Router>
    </Provider>
), document.getElementById('app'), () => {
  store.dispatch(isUserLoggedIn());
});

