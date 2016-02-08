import React from 'react';
import {RouteHandler} from 'react-router';

import Navbar from './partials/navbar';

class App extends React.Component {
  render() {
    return (
      <div>
      	<Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default App;