import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { fetchEvents } from '../../../actions/event_actions';

import Event from '../event.jsx';
import { CategoryList } from './category_list.jsx';
import LoadingAnimation from '../../presentational/loading_animation.jsx';
import SideMenu from '../../containers/side_menu.jsx';
import colors from '../../../stylesheets/colors';
import{ViewMenu} from '../../presentational/view_menu.jsx';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchEvents('Post', 'byYearAndMonth');

    this.state = {
      selected: [parseInt(this.props.params.year), parseInt(this.props.params.month), this.props.params.id]
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.events.length) {
      let year = _.isFinite(this.state.selected[0]) ? this.state.selected[0] : newProps.events.length -1;
      let month = _.isFinite(this.state.selected[1]) ? this.state.selected[1] : newProps.events[year].values.length - 1;
      let post = this.state.selected[2] || undefined;

      this.setState({
        selected: [year, month, post]
      });
    }
  }

  changeSelection(selectionArray) {
    if (selectionArray[0] === this.state.selected[0] && !selectionArray[1]) {
      return;
    }
    if (!selectionArray[1]) {
      selectionArray[1] = this.props.events[selectionArray[0]].values.length - 1;
    }
    if (!selectionArray[2]) {
      selectionArray[2] = undefined;
    }

    this.setState({
      selected: selectionArray
    });
  }

  render() {
    if (this.props.loading) {
      return (
        <LoadingAnimation />
      )
    }

    let events = _.get(this.props.events, [this.state.selected[0], 'values', this.state.selected[1], 'values'], []);
    events = this.state.selected[2] ? events.filter(event => event._id === this.state.selected[2]) : events;

    let eventElements = events.map((event) => {
      return (
        <Event
          key={event._id}
          event={event}
          />
      );
    });

    return (
      <div>
        <div className="row">
          <div className="side-in-list-view">
            <SideMenu
              color={colors.posts.secondary_color}
              selectedColor={colors.posts.tertiary_color}
            >
                <CategoryList
                  eventType={'posts'}
                  events={this.props.events}
                  selected={this.state.selected}
                  selectionChanged={(selectionArray) => this.changeSelection(selectionArray)}
                />

            </SideMenu>
          </div>
          <div className="main-in-list-view">
            {eventElements}
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps({events}, ownProps) {
  return {
    loading: events.loading.Post,
    events: events.Post
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
