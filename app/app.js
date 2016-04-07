import React from 'react';
import history from './history';
import MainMenu from './partials/main_menu';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedPath: null,
      navOpen: false
    };
  }

  handleUpdateSelectedIndex(e, path) {
    console.log(e, path);
    this.setState({
      selectedPath: path,
    });
    history.pushState(null, path);
  }

  toggleLeftNav() {
    this.setState({
      navOpen: !this.state.navOpen
    });
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

