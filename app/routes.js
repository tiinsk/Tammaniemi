import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import App from './app.jsx';
import Root from './root';

import Login from './components/containers/login.jsx';
import Home from './components/containers/home.jsx';
import PostList from './components/containers/list/list_posts.jsx';
import InfopostList from './components/containers/list/list_infoposts.jsx';
import TaskList from './components/containers/list/list_tasks.jsx';
import UserList from './components/containers/list/list_users.jsx';
import PhotosetList from './components/containers/list/list_photosets.jsx';

import UpdateEvent from './components/containers/event_update.jsx';
import CreateEvent from './components/containers/event_create.jsx';

import ReservationList from './components/containers/list/list_reservations.jsx';

import ShowGallery from './components/containers/gallery.jsx';
import AddGallery from './components/containers/gallery_create';

import CreateUser from './components/containers/create_user.jsx';

const requireAuth = (store) => {
  return (nextState, replaceState, next) => {
    store.getState().auth.userPromise.then(() => {
      next();
    }).catch((err) => {
      console.log(err);
      replaceState({ pathname: '/'});
      next();
    });
  }
};

const isLoggedIn = (store) => {
  return (nextState, replaceState, next) => {
    store.getState().auth.userPromise.then(() => {
      replaceState({ pathname: '/home' });
      next();
    }).catch((err) => {
      console.log(err);
      next();
    });
  }
};

export default (store) => {
  return (
    <Route path="/" component={Root}>
      <IndexRoute component={Login} onEnter={isLoggedIn(store)} />
      <Route path="/" component={App}>
        <Route path="/home" component={Home} onEnter={requireAuth(store)} />
        <Route path="/users" component={UserList} onEnter={requireAuth(store)} />

        <Route path="/:type/update/:id" component={UpdateEvent} onEnter={requireAuth(store)} />
        <Route path="/:type/create" component={CreateEvent} onEnter={requireAuth(store)} />

        <Route path="/posts(/:year(/:month(/:id)))" component={PostList} onEnter={requireAuth(store)} />
        <Route path="/infoposts(/:category(/:id))" component={InfopostList} onEnter={requireAuth(store)} />
        <Route path="/tasks(/:category(/:id))" component={TaskList} onEnter={requireAuth(store)} />

        <Route path="/reservations(/:year(/:month))" component={ReservationList} onEnter={requireAuth(store)} />

        <Route path="/gallery" component={PhotosetList} onEnter={requireAuth(store)} />
        <Route path="/gallery/new" component={AddGallery} onEnter={requireAuth(store)} />
        <Route path="/gallery/:galleryId" component={ShowGallery} onEnter={requireAuth(store)} />
      </Route>

      <Route path="/invite/:token" component={CreateUser} />
    </Route>
  );
};
