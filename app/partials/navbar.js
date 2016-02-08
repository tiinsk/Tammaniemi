import React from 'react';
import {IndexLink} from 'react-router';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <IndexLink to='/' className='navbar-brand'>
            Tammaniemi
          </IndexLink>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
        
          <ul className='nav navbar-nav'>
            <li><IndexLink to='/'>Home</IndexLink></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Users <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="/users/new">New</a></li>
                <li><a href="/users">Index</a></li>
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Posts <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="/posts/new">New</a></li>
                <li><a href="/posts">Index</a></li>
              </ul>
            </li>



          </ul>
        </div>
      </nav>
    );
  }
}

/*Navbar.contextTypes = {
  router: React.PropTypes.func.isRequired
};*/

export default Navbar;