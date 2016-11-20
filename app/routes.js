import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';
import App from './app.jsx';
import Root from './root';

import Login from './components/containers/login.jsx';
import Home from './components/containers/home.jsx';
import PostList from './components/containers/list/list_posts.jsx';
import InfopostList from './components/containers/list/list_infoposts.jsx';
import TaskList from './components/containers/list/list_tasks.jsx';


import ShowUser from './user/components/show';
import IndexUsers from './user/components/index';

import AddPost from './events/post/add';
import ShowPost from './events/post/show';
import UpdatePost from './events/post/update';

import AddInfoPost from './events/infopost/add';
import ShowInfoPost from './events/infopost/show';
import UpdateInfoPost from './events/infopost/update';

import AddReservation from './events/reservation/add';
import ShowReservation from './events/reservation/show';
import IndexReservations from './events/reservation/index';
import UpdateReservation from './events/reservation/update';
import RecentlyAdded from './events/reservation/recently-added';
import UpcomingReservations from './events/reservation/upcoming-reservations';

import AddTask from './events/task/add';
import ShowTask from './events/task/show';
import UpdateTask from './events/task/update';

import IndexGallery from './events/gallery/index';
import ShowGallery from './events/gallery/show';
import AddGallery from './events/gallery/add';

import CreateUser from './user/components/create_user';

const requireAuth = (store) => {
  return (nextState, replaceState, next) =>  {
    console.log("requireAuth", store.getState());
    store.getState().auth.userPromise.then(() => {
      next();
    }).catch((err) => {
      console.log(err);
      replaceState({ pathname: '/'});
      next();
    });
  }
}

const isLoggedIn = (store) => {
  return (nextState, replaceState, next) => {
    console.log('isLoggedIn', store.getState());
    store.getState().auth.userPromise.then(() => {
      replaceState({ pathname: '/home'});
      next();
    }).catch((err) => {
      console.log(err);
      next();
    });
  }
};

export default (store) => {
  return(
    <Route path="/" component={Root}>
      <IndexRoute component={Login} onEnter={isLoggedIn(store)} />
      <Route path="/" component={App}>
        <Route path="/home" component={Home} onEnter={requireAuth(store)} />
        <Route path="/users/:userId" component={ShowUser} onEnter={requireAuth(store)} />
        <Route path="/users" component={IndexUsers} onEnter={requireAuth(store)} />

        <Route path="/posts/new" component={AddPost} onEnter={requireAuth(store)} />
        <Route path="/posts" component={PostList} onEnter={requireAuth(store)} />
        <Route path="/posts/:postId" component={ShowPost} onEnter={requireAuth(store)} />
        <Route path="/posts/update/:postId" component={UpdatePost} onEnter={requireAuth(store)} />

        <Route path="/infoposts/new" component={AddInfoPost} onEnter={requireAuth(store)} />
        <Route path="/infoposts" component={InfopostList} onEnter={requireAuth(store)} />
        <Route path="/infoposts/:infopostId" component={ShowInfoPost} onEnter={requireAuth(store)} />
        <Route path="/infoposts/update/:infopostId" component={UpdateInfoPost} onEnter={requireAuth(store)} />

        <Route path="/reservations" component={IndexReservations} onEnter={requireAuth(store)}>
          <IndexRedirect to="recently-added" />

          <Route path="new" component={AddReservation} onEnter={requireAuth(store)} />
          <Route path="update/:reservationId" component={UpdateReservation} onEnter={requireAuth(store)} />
          <Route path="recently-added" component={RecentlyAdded} onEnter={requireAuth(store)} />
          <Route path="upcoming" component={UpcomingReservations} onEnter={requireAuth(store)} />
          <Route path=":reservationId" component={ShowReservation} onEnter={requireAuth(store)} />

        </Route>

        <Route path="/tasks/new" component={AddTask} onEnter={requireAuth(store)} />
        <Route path="/tasks" component={TaskList} onEnter={requireAuth(store)} />
        <Route path="/tasks/:taskId" component={ShowTask} onEnter={requireAuth(store)} />
        <Route path="/tasks/update/:taskId" component={UpdateTask} onEnter={requireAuth(store)} />

        <Route path="/gallery" component={IndexGallery} onEnter={requireAuth(store)} />
        <Route path="/gallery/new" component={AddGallery} onEnter={requireAuth(store)} />
        <Route path="/gallery/:galleryId" component={ShowGallery} onEnter={requireAuth(store)} />
      </Route>

      <Route path="/invite/:token" component={CreateUser} />
    </Route>
  );
};
