import React from 'react';

import MainMenu from './components/presentational/main_menu.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MainMenu path={this.props.location.pathname} />
        {this.props.children}
      </div>
    );
  }
}

export default App;
