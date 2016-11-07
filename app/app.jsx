import React from 'react';
import _ from 'lodash';

import MainMenu from './components/presentational/main_menu.jsx';


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
