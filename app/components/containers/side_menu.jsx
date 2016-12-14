import React from 'react';


export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggleOpen() {
    if (this.state.open) {
      document.body.style = "overflow: auto";
    }
    else {
      document.body.style = "overflow: hidden";
    }
    this.setState({
      open: !this.state.open
    });
  }


  render() {
    return (
      <div className={'side-menu-panel' + ' ' + this.props.side}>
        <div>
          <div className={"side-menu " + (this.state.open ? "open" : "closed") }>

            { this.state.open ? (
              <div className="side-menu-overlay"
                   onClick={() => this.state.open ? this.toggleOpen() : null }></div>
            ) : null }
            <div className="centerizer">
              <div className={"content" + " " + (this.state.open ? "open" : "closed")}>
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
        <div className={`flag ${this.state.open ? "invisible" : ""}`}
             style={{background: this.props.color }}
             onClick={() => this.toggleOpen() }>
          <div className="icon open-icon"></div>
        </div>
      </div>
    );
  }
}
