import React from 'react';

import {CategoryList, ItemList} from  '../../navigation/list.js'

export default class Navigation extends React.Component{
  constructor(props){
    super(props);
  }

  updateYear(year){
    this.props.update({
      year: year
    });
  }
  updateMonth(month){
    this.props.update({
      month: month
    });
  }

  updateItem(item){
    this.props.update({
      item: item
    });
  }

  render(){
    return(
      <div className="nav-box">
        <CategoryList className="post" updateChosen={this.updateYear.bind(this)} chosenItem={this.props.chosenYear} headers={this.props.years}  />
        <CategoryList className="post" updateChosen={this.updateMonth.bind(this)}  chosenItem={this.props.chosenMonth} headers={this.props.months}  />
        <ItemList className="post" updateChosen={this.updateItem.bind(this)} chosenItem={this.props.chosenPost} items={this.props.posts} />
      </div>
    );
  }
}
