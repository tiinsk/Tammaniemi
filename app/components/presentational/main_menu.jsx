import React from 'react';

import NavBar from './nav_bar.jsx';
import {ViewMenu} from '../presentational/view_menu.jsx';

const MainMenu = ({path}) => {
  return(
    <div className="main-menu">
      <NavBar />
      <div className="jumbotron">
        <div className="img" ></div>
        <div className="overlay"></div>
        <ViewMenu
          path={path}
        />
      </div>
    </div>
  );
};

export default MainMenu;

