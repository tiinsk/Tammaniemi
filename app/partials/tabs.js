import React from 'react';

export class Tabs extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  setActive(index){
    this.setState({
      activeIndex: index
    });
  }

  render(){
    console.log(this.props.children);
    let headers = this.props.children.map((child,index) =>{
      return(
        <li onClick={this.setActive.bind(this,index)} key={index} className={index == this.state.activeIndex ? "active" : ""}>
          {child.props.title}
        </li>
      );
    });
    let tabs = this.props.children.map((child, index) => {
      return(
        <div key={index} style={index == this.state.activeIndex ? {display: "initial"} : {display:"none"} }>
          {child.props.children}
        </div>
      );
    });
    return(
      <div className="tabs">
        <ul className="tab-headers">{headers}</ul>
        <div>
          {tabs}
        </div>
      </div>
    );
  }

}

export class Tab extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<div>{this.props.children}</div>);
  }

}
