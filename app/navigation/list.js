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
          <div key={index} className={"header selectable " + (this.props.chosenItem == index ? "selected" : "" )} onClick={this.props.updateChosen.bind(this, index)}>
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
        <li className={"item " + (this.props.chosenItem == index ? "selected" : "" )} onClick={this.props.updateChosen.bind(this, index)} key={index}>
          <div className="content">
            <div className="title" >{item.title}</div>
            <div className="details">
              <div className="user">{item.userId.name}</div>
              <div className="time">{moment(item.createdAt).format("D. MMM YYYY H:mm")}</div>
          </div>
          </div>
        </li>
      );
    });

    return(
      <ul className={"item-list "  + this.props.className}>
        {items}
      </ul>
    );

  }
}

