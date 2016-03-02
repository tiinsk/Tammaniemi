import React from 'react';
import {RouteHandler, IndexLink, Link} from 'react-router';
import history from './history';

import LoginStore from './login/stores/login';


import Navbar from './partials/navbar';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';
/*
import OwnTheme from './theme';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
*/
import AppBar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';




class App extends React.Component {
  constructor(){
  	super();
  	this.state = {
  		selectedPath: null,
  		navOpen: false
  	}
  }
/*
  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme(OwnTheme),
    };
  }
*/

  handleUpdateSelectedIndex(e, path) {
  	console.log(e, path);
  	this.setState({
    	selectedPath: path,
	});
	history.pushState(null, path);
  }

  toggleLeftNav(){
  	this.setState({
  		navOpen: !this.state.navOpen
  	})
  }

  render() {
  	var style={
		"boxShadow": "0px", 
		"backgroundColor": "transparent", 
		"textShadow": "0px 0px 18px black"
	};

    return (
      <div>
      	<AppBar className="appBar">
      		<div className="mui--appbar-height content">
      			<div className="logo">Tammaniemi</div>
      			<div className="right-menu">
      				<LoginMenu />
      			</div>
      		</div> 
      	</AppBar>
      	<Jumbotron/>
      	<AppBar className="menuBar">
      		<div className="mui--appbar-height content">
      			<div className="mui-dropdown menu-item" >
      				<Button className="mui-btn">
      					<Link to="/">Home</Link>
      				</Button>
      			</div>
      			<Dropdown className="menu-item" label="Posts">
			        <DropdownItem >
			        	<Link to="/posts/new">New</Link>
			        </DropdownItem>
			        <DropdownItem >
			        	<Link to="/posts">Index</Link>
			        </DropdownItem>
      			</Dropdown>
      			<Dropdown className="menu-item" label="Infoposts">
			         <DropdownItem >
			        	<Link to="/infoposts/new">New</Link>
			        </DropdownItem>
			        <DropdownItem >
			        	<Link to="/infoposts">Index</Link>
			        </DropdownItem>
      			</Dropdown>
      			<Dropdown className="menu-item" label="Users">
			         <DropdownItem >
			        	<Link to="/users/new">New</Link>
			        </DropdownItem>
			        <DropdownItem >
			        	<Link to="/users">Index</Link>
			        </DropdownItem>
      			</Dropdown>
      		</div>
      	</AppBar>
        	{this.props.children}
      </div>
    );
  }
}

class LoginMenu extends React.Component{
	constructor(props) {
      super(props);
      this.state = LoginStore.getState();
      this.onChange = this.onChange.bind(this);
      console.log(this.state);
      console.log(this.state.isLoggedIn);
    }

    componentDidMount() {
      LoginStore.listen(this.onChange);
    }

    componentWillUnmount() {
      LoginStore.unlisten(this.onChange);
    }

    onChange(state) {
      this.setState(state);
    }

    render(){
    	let loginMenu = ()=>{
	    	if (this.state.user) {
	    		return(
	    			<div>
	    				<span className="user-logo"> Hi {this.state.user.name}, welcome back! </span>
	    				<Link className="btn" to="/logout">Logout</Link>
	    			</div>
	    		);
	    	}
	    	else{
	    		return(
	    			<Link className="btn" to="/login">Login</Link>
	    		);
	    	}
		};

    	return(
    			loginMenu()
    		);
    }
}

class Jumbotron extends React.Component{
	constructor(){
		super();
		this.state = {
			"randPic": this.giveRandPic()
		}
	}

	componentWillMount(){
		this.setState({
			"randPic": this.giveRandPic()
		});
		console.log(this.state.randPic);
	}

	giveRandPic(){
		var pics = [
			"IMGP1145.jpg",
			"IMGP1147.jpg",
			"IMGP1158.jpg",
			"IMGP1166.jpg",
			"IMGP1169.jpg",
			"IMGP1232.jpg",
			"IMGP1245.jpg",
			"IMGP1273.jpg",
			"IMGP1410.jpg"
			];
		return pics[Math.floor(Math.random() * 9)];  
		//return pics[1];
	}

	render(){
		var imgStyle = {
			"backgroundImage": `url(/img/${this.state.randPic})`,
		}
		return(
			<div className="jumbotron">
				<div className="img" style={imgStyle}></div>
				<div className="overlay"></div>
			</div>
			);
	}
}


export default App;