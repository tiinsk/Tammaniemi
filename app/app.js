import React from 'react';
import _ from 'lodash';

import MainMenu from './partials/main_menu';


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
