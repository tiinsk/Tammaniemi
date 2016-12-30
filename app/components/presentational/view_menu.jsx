import React from 'react';
import { Link } from 'react-router';
import colors from '../../stylesheets/colors';

export const ViewMenu = ({path}) => {

  let titles = {
    posts: "Posts",
    infoposts: "Infoposts",
    tasks: "Tasks",
    reservations: "Reservations",
    gallery: "Gallery",
    home: "News Feed",
    users: "Users"
  };

  let type = path.split('/')[1];

  let color;
  let addLink = `/${type}/create`;
  let listLink = `/${type}`;
  let title = titles[type];

  if(colors[type]) {
    color = colors[type].secondary_color;
  }

  switch (type){
    case 'home':
      addLink = null;
      listLink = null;
      break;
    case 'users':
      addLink = null;
      listLink = null;
      break;
  }


  return(
    <div className="view-menu">
      <div className="page-title">{title}</div>
      <div className="links">
        { addLink ?
          <div className="link add">

            <Link
              to={addLink}
            >
              <span>Add</span>
              <div className="icon-container" style={{background: color}}>
                <div className="icon"></div>
              </div>
            </Link>
          </div> : null
        }
        { listLink ?
          <div className="link list">
            <Link
              to={listLink}
            >
              <span>List</span>
              <div className="icon-container" style={{background: color}}>
                <div className="icon"></div>
              </div>
            </Link>
          </div> : null
        }
        </div>

    </div>
  );
};
