import React from 'react';

class Root extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
          {this.props.children}
      </div>
    );
  }
}



export default Root;
