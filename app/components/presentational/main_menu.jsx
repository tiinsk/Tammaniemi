import React from 'react';

import NavBar from './nav_bar.jsx';

const MainMenu = () => {
  return(
    <div className="main-menu">
      <NavBar />
      <div className="jumbotron">
        <div className="img" ></div>
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default MainMenu;

