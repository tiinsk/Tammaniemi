import React from 'react';

export default class Navigation extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="nav-box">
        <TaskList className="task" updateChosen={this.props.update.bind(this)}  chosenItem={this.props.chosenCategory} headers={this.props.categories}  />
      </div>
    );
  }
}


class TaskList extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let headers = this.props.headers.map((header, index) => {
      if (header.doneAmount > 0 || header.undoneAmount > 0) {

        let doneAmount, undoneAmount;
        if(header.doneAmount){
          doneAmount = (
            <span className="item-count done">{header.doneAmount}</span>
          );
        }
        if(header.undoneAmount){
          undoneAmount = (
            <span className="item-count undone">{header.undoneAmount}</span>
          );
        }
        return(
          <div key={index} className={"header selectable " + (this.props.chosenItem == index ? "selected" : "" )} onClick={this.props.updateChosen.bind(this, index)}>
            <span>{header.header}</span>
            {doneAmount}
            {undoneAmount}
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
      <div className={"task-list " + this.props.className}>
        {headers}
      </div>
    );
  }

}
