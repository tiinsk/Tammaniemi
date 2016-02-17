import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './app';
import Home from './home/home';
import AddUser from './user/components/add';
import ShowUser from './user/components/show';
import IndexUsers from './user/components/index';
import Login from './login/components/login';

import AddPost from './events/post/add';
import ShowPost from './events/post/show';
import IndexPosts from './events/post/index';
import UpdatePost from './events/post/update';

import AddInfoPost from './events/infopost/add';
import ShowInfoPost from './events/infopost/show';
import IndexInfoPosts from './events/infopost/index';
import UpdateInfoPost from './events/infopost/update';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/users/new' component={AddUser} />
    <Route path='/users/:userId' component={ShowUser} />
    <Route path='/users' component={IndexUsers} />
    <Route path='/login' component={Login} />

    <Route path='/posts/new' component={AddPost} />
    <Route path='/posts' component={IndexPosts} />
    <Route path='/posts/:postId' component={ShowPost} />
    <Route path='/posts/update/:postId' component={UpdatePost} />

    <Route path='/infoposts/new' component={AddInfoPost} />
    <Route path='/infoposts' component={IndexInfoPosts} />
    <Route path='/infoposts/:infopostId' component={ShowInfoPost} />
    <Route path='/infoposts/update/:infopostId' component={UpdateInfoPost} />

  </Route>
);