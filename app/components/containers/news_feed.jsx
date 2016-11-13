import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchEvents } from '../../actions/event_actions';

import Event from './event.jsx';
import LoadingAnimation from '../presentational/loading_animation.jsx';

class NewsFeed extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      itemsPerPage: 30,
      currentPage: 1
    }
  }

  componentWillMount(){
    this.props.fetchEvents('events', 'time');
  }

  getEndItem() {
    return this.state.currentPage * this.state.itemsPerPage;
  }

  changePage() {
    if ((this.state.currentPage + 1) * this.state.itemsPerPage < this.props.events.events.length) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  }



  render(){
    if(this.props.events.loading){
      return(
        <LoadingAnimation />
      )
    }

    const events = this.props.events.events.slice(0, this.getEndItem()).map((event) => {
      return (
        <Event
          key={event._id}
          event={event}
        />
      );
    });

    return (
      <div>
        {events}
        <div className="show-more" onClick={this.changePage.bind(this)}>
          <span>Show more</span>
        </div>
      </div>
    );
  }

}

function mapStateToProps({events}) {
  return {
    events
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
