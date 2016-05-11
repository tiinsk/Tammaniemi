import React from 'react';
import history from '../history';

export class Tabs extends React.Component{
  constructor(props){
    super(props);
    console.log("constructor!!!");
    var selected = this.props.children.filter(child => child != null).findIndex((child,index) =>{
      return child.props.selected;
    });

    this.state = {
      activeIndex: selected > -1 ? selected : 0
    };
  }

  setActive(index, event, id, e, cb = () => {} ){
    console.log("setting state", index, cb);
    this.setState({
      activeIndex: index
    }, cb );
  }

  goTo(link){
    this.setActive(0, null, null, null, ()=>{history.pushState(null, link)});
  }

  render(){
    console.log(this.props.children);
    console.log("active:",this.state.activeIndex);
    let headers = this.props.children.filter(child => child != null).map((child,index) =>{
      let closeButton;
      if (child.props.closable) {
        closeButton = (
            <div className="close-btn" onClick={this.goTo.bind(this,"/reservations")}>x</div>
          );
      };

      return(
        <li onClick={this.setActive.bind(this,index)} key={index} className={index == this.state.activeIndex ? "active" : ""}>
          {child.props.title} {closeButton}
        </li>
      );
    });
    let tabs = this.props.children.filter(child => child != null).map((child, index) => {
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


export class Tabs2 extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let tabs = this.props.items.map((item, index) => {
      return(
        <li onClick={this.props.selectTab.bind(null,index)} key={index} className={index == this.props.selected ? "active" : ""}>
          {item.name}
        </li>
      );
    });


    return(
      <div className="tabs">
        <ul className="tab-headers">{tabs}</ul>
      </div>
    );
  }
}
