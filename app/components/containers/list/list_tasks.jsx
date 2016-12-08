import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchEvents } from '../../../actions/event_actions';

import Event from '../event.jsx';
import { CategoryList } from './category_list.jsx';
import LoadingAnimation from '../../presentational/loading_animation.jsx';
import { OptionMenu } from '../../presentational/option_menu.jsx';

class TaskList extends React.Component {
  constructor(props){
    super(props);

    this.props.fetchEvents('Task', 'byCategory');

    this.state = {
      selected: [parseInt(this.props.params.category), this.props.params.id],
      showOption: 1,
      events: []
    };

  }

  componentWillReceiveProps(newProps){
    if(newProps.events !== this.state.events){
      this.setState({
        events: this.filterEvents(newProps.events, this.state.showOption)
      });
    }

    if(newProps.events.length) {
      let category = _.isFinite(this.state.selected[0]) ? this.state.selected[0] : newProps.events.length -1;
      let event = this.state.selected[1] || undefined;
      this.setState({
        selected: [category, event]
      });
    }
  }

  filterEvents(categories, option){
    return categories.map(category => {
        let filteredCategory = {};
        filteredCategory.key = category.key;
        filteredCategory.values = category.values.filter(event => {
          if(option === 1){
            return !event.isDone
          }
          if(option === 2){
            return true;
          }
          if(option === 3){
            return event.isDone;
          }
        });
        return filteredCategory;
      }
    );
  }

  changeSelection(selectionArray){
    if(selectionArray[0] === this.state.selected[0] && !selectionArray[1]){
      return;
    }
    this.setState({
      selected: selectionArray,
    });
  }


  showChange(value){
    this.setState({
      showOption: value,
      events: this.filterEvents(this.props.events, value)
    });
  }

  render(){
    if(this.props.loading){
      return(
        <LoadingAnimation />
      )
    }

    let events = _.get(this.state.events, [this.state.selected[0], 'values'], []);
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
      <div className="list-tasks">
        <OptionMenu
          option={this.state.showOption}
          onShowChange={ (val) => this.showChange(val)}
        />
        <div className="row">
          <div className="col-xs-3" >
            <CategoryList
              eventType='tasks'
              events={this.state.events}
              selected={this.state.selected}
              selectionChanged={(selectionArray) => this.changeSelection(selectionArray) }
            />
          </div>
          <div className="col-xs-7" >
            {eventElements.length ? eventElements : <div className="no-items">No tasks to show</div>}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({events}) {
  return {
    loading: events.loading,
    events: events.Task
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
