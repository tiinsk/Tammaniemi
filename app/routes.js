import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import App from './app';
import Root from './root';
import Home from './home/home';

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

import AddReservation from './events/reservation/add';
import ShowReservation from './events/reservation/show';
import IndexReservations from './events/reservation/index';
import UpdateReservation from './events/reservation/update';
import RecentlyAdded from './events/reservation/recently-added';
import UpcomingReservations from './events/reservation/upcoming-reservations';

import AddTask from './events/task/add';
import ShowTask from './events/task/show';
import IndexTasks from './events/task/index';
import UpdateTask from './events/task/update';

import IndexGallery from './events/gallery/index';
import ShowGallery from './events/gallery/show';
import AddGallery from './events/gallery/add';

import LoginStore from './login/login_store';

import CreateUser from './user/components/create_user';

function requireAuth(nextState, replaceState, next) {
  console.log('requireAuth');
  LoginStore.getState().userPromise.then(() => {
    next();
  }, () => {
    replaceState({ pathname: '/'});
    next();
  });
}

function isLoggedIn (nextState, replaceState, next) {
  console.log('isLoggedIn');
  LoginStore.getState().userPromise.then(() => {
    replaceState({ pathname: '/home'});
    next();
  }, () => {
    next();
  });
}

export default (
  <Route path="/" component={Root}>
    <IndexRoute component={Login} onEnter={isLoggedIn} />
    <Route path="/" component={App}>
      <Route path="/home" component={Home} onEnter={requireAuth} />
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

      <Route path="/reservations" component={IndexReservations} onEnter={requireAuth}>
        <IndexRedirect to="recently-added" />

        <Route path="new" component={AddReservation} onEnter={requireAuth} />
        <Route path="update/:reservationId" component={UpdateReservation} onEnter={requireAuth} />
        <Route path="recently-added" component={RecentlyAdded} onEnter={requireAuth} />
        <Route path="upcoming" component={UpcomingReservations} onEnter={requireAuth} />
        <Route path=":reservationId" component={ShowReservation} onEnter={requireAuth} />

      </Route>

      <Route path="/tasks/new" component={AddTask} onEnter={requireAuth} />
      <Route path="/tasks" component={IndexTasks} onEnter={requireAuth} />
      <Route path="/tasks/:taskId" component={ShowTask} onEnter={requireAuth} />
      <Route path="/tasks/update/:taskId" component={UpdateTask} onEnter={requireAuth} />

      <Route path="/gallery" component={IndexGallery} onEnter={requireAuth} />
      <Route path="/gallery/new" component={AddGallery} onEnter={requireAuth} />
      <Route path="/gallery/:galleryId" component={ShowGallery} onEnter={requireAuth} />
    </Route>

    <Route path="/invite/:token" component={CreateUser} />
  </Route>
);
