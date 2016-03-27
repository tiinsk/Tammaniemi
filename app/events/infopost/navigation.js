import React from 'react';

import {CategoryList, ItemList} from  '../../navigation/list.js'

export default class Navigation extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <CategoryList className="infopost" updateChosen={this.props.update.bind(this)}  chosenItem={this.props.chosenCategory} headers={this.props.categories}  />
        <ItemList className="infopost" items={this.props.infoposts} />
      </div>
    );
  }
}
