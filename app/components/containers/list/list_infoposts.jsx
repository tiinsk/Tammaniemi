import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchEvents } from '../../../actions/event_actions';

import Event from '../event.jsx';
import { CategoryList } from './category_list.jsx';
import LoadingAnimation from '../../presentational/loading_animation.jsx';

class InfopostList extends React.Component {
  constructor(props){
    super(props);

    this.props.fetchEvents('infoposts', 'byCategory');

    this.state = {
      selected: []
    };

  }

  componentWillReceiveProps(newProps){
    if(newProps.events.length) {
      let category = this.state.selected[0] || newProps.events.length -1;
      this.setState({
        selected: [category, undefined]
      });
    }
  }

  changeSelection(selectionArray){

    if(selectionArray[0] === this.state.selected[0] && !selectionArray[1]){
      return;
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

    let events = _.get(this.props.events, [this.state.selected[0], 'values'], []);
    events = this.state.selected[1] ? events.filter(event => event._id === this.state.selected[1]) : events;

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
            eventType='infoposts'
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

function mapStateToProps({events}) {

  return {
    loading: events.loading,
    events: events.infoposts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InfopostList);
