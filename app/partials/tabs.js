import React from 'react';
import {Link} from 'react-router';


export class Tab extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<div>{this.props.children}</div>);
  }

}

export class Tabs extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let tabs = this.props.items.map((item, index) => {
      let closeButton;
      if (item.closable) {
        closeButton = (
            <div className="close-btn" onClick={this.props.closeItem}>x</div>
          );
      };

      return(
        <span key={index}>
          <Link to={item.path} activeClassName="active">
              {item.name}
          </Link>
          {closeButton}
        </span>

      );
    });


    return(
      <div className="tabs">
        {tabs}
      </div>
    );
  }
}
