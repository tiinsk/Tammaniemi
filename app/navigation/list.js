import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import moment from 'moment';

export class CategoryList extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let headers = this.props.headers.map((header, index) => {
      if (header.amount > 0) {
        return(
          <div key={index} className={"header " + (this.props.chosenItem == index ? "selected" : "" )} onClick={this.props.updateChosen.bind(this, index)}>
            <span>{header.header}</span>
            <span className="item-count">{header.amount}</span>
          </div>
        );
      }else{
        return(
          <div key={index} className="header">
            <span>{header.header}</span>
          </div>
        );

      }

    });
    return(
      <div className={"category-list " + this.props.className}>
        {headers}
      </div>
    );
  }

}

export class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let items = _.map(this.props.items, (item, index) => {
      let type = item.__t.toLowerCase();
      return(
        <div key={index}>
          <Link to={`/${type}s/${item._id}`} >
            {item.title}
          </Link>
        </div>
      );
    });

    return(
      <div className={"item-list "  + this.props.className}>
        {items}
      </div>
    );

  }
}

