import React from 'react';
import _ from 'lodash';

import history from './history';


import LoginStore from './login/login_store';
import LoginActions from './login/login_actions';

import MainMenu from './partials/main_menu';

//import Navbar from './partials/navbar';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
/*
import OwnTheme from './theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
*/
import AppBar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
          <MainMenu />
          {this.props.children}
      </div>
    );
  }
}

export default App;
