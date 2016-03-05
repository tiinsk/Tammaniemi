import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './app';
import Home from './home/home';
import AddUser from './user/components/add';
import ShowUser from './user/components/show';
import IndexUsers from './user/components/index';
import Login from './login/login';

import AddPost from './events/post/add';
import ShowPost from './events/post/show';
import IndexPosts from './events/post/index';
import UpdatePost from './events/post/update';

import AddInfoPost from './events/infopost/add';
import ShowInfoPost from './events/infopost/show';
import IndexInfoPosts from './events/infopost/index';
import UpdateInfoPost from './events/infopost/update';

import LoginStore from './login/login_store';

function requireAuth(nextState, replaceState) {
  if (!LoginStore.getState().isLoggedIn) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={Login} />

    <Route path="/users/new" component={AddUser} onEnter={requireAuth} />
    <Route path="/users/:userId" component={ShowUser} onEnter={requireAuth} />
    <Route path="/users" component={IndexUsers} onEnter={requireAuth} />

    <Route path="/posts/new" component={AddPost} onEnter={requireAuth} />
    <Route path="/posts" component={IndexPosts} onEnter={requireAuth} />
    <Route path="/posts/:postId" component={ShowPost} onEnter={requireAuth} />
    <Route path="/posts/update/:postId" component={UpdatePost} onEnter={requireAuth} />

    <Route path="/infoposts/new" component={AddInfoPost} onEnter={requireAuth} />
    <Route path="/infoposts" component={IndexInfoPosts} onEnter={requireAuth} />
    <Route path="/infoposts/:infopostId" component={ShowInfoPost} onEnter={requireAuth} />
    <Route path="/infoposts/update/:infopostId" component={UpdateInfoPost} onEnter={requireAuth} />

  </Route>
);
