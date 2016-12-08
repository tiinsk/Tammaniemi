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

    this.props.fetchEvents('Infopost', 'byCategory');

    this.state = {
      selected: [parseInt(this.props.params.category), this.props.params.id]
    };

  }

  componentWillReceiveProps(newProps){
    if(newProps.events.length) {
      let category = _.isFinite(this.state.selected[0]) ? this.state.selected[0] : newProps.events.length -1;
      let event = this.state.selected[1] || undefined;
      this.setState({
        selected: [category, event]
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
      <div className="row">
        <div className="col-xs-3">
          <CategoryList
            eventType='infoposts'
            events={this.props.events}
            selected={this.state.selected}
            selectionChanged={(selectionArray) => this.changeSelection(selectionArray) }
          />
        </div>
        <div className="col-xs-7">
          {eventElements}
        </div>
      </div>
    );
  }
}

function mapStateToProps({events}) {
  return {
    loading: events.loading,
    events: events.Infopost
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InfopostList);
