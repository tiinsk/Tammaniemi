import React from 'react';
import {Route} from 'react-router';
import App from './app';
import Home from './home/home';
import AddUser from './user/components/add';
import ShowUser from './user/components/show';
import IndexUsers from './user/components/index';
import Login from './login/components/login';

import AddPost from './events/post/components/add';
import ShowPost from './events/post/components/show';
import IndexPosts from './events/post/components/index';
import UpdatePost from './events/post/components/update';

export default (
  <Route handler={App}>
    <Route path='/' handler={Home} />
    <Route path='/users/new' handler={AddUser} />
    <Route path='/users/:userId' handler={ShowUser} />
    <Route path='/users' handler={IndexUsers} />
    <Route path='/login' handler={Login} />

    <Route path='/posts/new' handler={AddPost} />
    <Route path='/posts' handler={IndexPosts} />
    <Route path='/posts/:postId' handler={ShowPost} />
    <Route path='/posts/update/:postId' handler={UpdatePost} />

  </Route>
);