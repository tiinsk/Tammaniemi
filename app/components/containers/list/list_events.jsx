import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchEvents } from '../../../actions/event_actions';

import Event from '../event.jsx';
import { CategoryList } from './category_list.jsx';
import LoadingAnimation from '../../presentational/loading_animation.jsx';

class EventList extends React.Component {
  constructor(props){
    super(props);
    if(props.params.type === 'posts'){
      this.props.fetchEvents(props.params.type, 'byYearAndMonth');
    }
    else if(props.params.type == 'infoposts'){
      this.props.fetchEvents(props.params.type, 'byCategory');
    }

    this.state = {
      selected: [],
      eventType: props.params.type
    };
    console.log("constructor");
  }

  componentWillMount(){
    console.log("willMount");
  }

/*  shouldComponentUpdate(newProps){
    console.log("should update:", newProps.params.type !== this.props.params.type );
    if(newProps.params.type !== this.props.params.type){
      if(newProps.params.type === 'posts'){
        this.props.fetchEvents(newProps.params.type, 'byYearAndMonth');
      }
      else if(newProps.params.type == 'infoposts'){
        this.props.fetchEvents(newProps.params.type, 'byCategory');
      }
      return true;
    }
    return false;
  }*/

  componentWillReceiveProps(newProps){
    if(newProps.params.type !== this.props.params.type){
      if(newProps.params.type === 'posts'){
        this.props.fetchEvents(newProps.params.type, 'byYearAndMonth');
      }
      else if(newProps.params.type == 'infoposts'){
        this.props.fetchEvents(newProps.params.type, 'byCategory');
      }
    }


    if(newProps.events.length) {
      if(this.state.eventType === 'posts'){
        let year = this.state.selected[0] || newProps.events.length -1;
        let month = this.state.selected[1] || newProps.events[year].values.length -1;
        this.setState({
          selected: [year, month, undefined]
        });
      }
      else if( this.state.eventType === 'infoposts'){
        let category = this.state.selected[0] || newProps.events.length -1;
        this.setState({
          selected: [category, undefined]
        });
      }
    }
  }

  changeSelection(selectionArray){
    console.log('changeSelection', selectionArray);

    if(selectionArray[0] === this.state.selected[0] && !selectionArray[1]){
      return;
    }
    if(!selectionArray[1] && this.state.eventType === 'posts'){
      selectionArray[1] = this.props.events[selectionArray[0]].values.length -1;
    }
    if(!selectionArray[2] && this.state.eventType === 'posts'){
      selectionArray[2] = undefined;
    }

    this.setState({
      selected: selectionArray
    });
  }

  render(){
    if(this.props.loading){
      return(
        <LoadingAnimation />
      )
    }

    let events;
    if(this.state.eventType === 'posts'){
      events = _.get(this.props.events, [this.state.selected[0], 'values', this.state.selected[1], 'values'], []);
      events = this.state.selected[2] ? events.filter(event => event._id === this.state.selected[2]) : events;
    }
    else if(this.state.eventType === 'infoposts'){
      events = _.get(this.props.events, [this.state.selected[0], 'values'], []);
      events = this.state.selected[1] ? events.filter(event => event._id === this.state.selected[1]) : events;
    }

    let eventElements = events.map((event) => {
          return (
            <Event
              key={event._id}
              event={event}
            />
          );
        });

    return (
      <div className="app-row-center">
        <div className="col-left" >
          <CategoryList
            eventType={this.state.eventType}
            events={this.props.events}
            selected={this.state.selected}
            selectionChanged={(selectionArray) => this.changeSelection(selectionArray) }
          />
        </div>
        <div className="col-main" >
          {eventElements}
        </div>
      </div>
    );
  }

}

function mapStateToProps({events}, ownProps) {
  let eventList;
  if(ownProps.params.type === 'posts'){
    eventList = events.posts;
  }
  else if(ownProps.params.type === 'infoposts'){
    eventList = events.infoposts;
  }
  console.log(eventList);
  return {
    loading: events.loading,
    events: eventList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
