import React from 'react';

import {CategoryList, ItemList} from  '../../navigation/list.js'

export default class Navigation extends React.Component{
  constructor(props){
    super(props);
  }

  updateCategory(category){
    this.props.update({
      category: category
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
        <CategoryList className="infopost" updateChosen={this.updateCategory.bind(this)}  chosenItem={this.props.chosenCategory} headers={this.props.categories}  />
        <ItemList className="infopost" updateChosen={this.updateItem.bind(this)} chosenItem={this.props.chosenInfopost} items={this.props.infoposts} />
      </div>
    );
  }
}
