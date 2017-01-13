import React from 'react';

import Event from '../containers/event.jsx';
import User from '../containers/user.jsx';
import LoadingAnimation from './loading_animation.jsx';
import translate from '../../translate.jsx';
import Photoset from '../containers/photoset.jsx';

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 30,
      currentPage: 1
    }
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

  render() {
    if (this.props.events.loading) {
      return (
        <LoadingAnimation />
      )
    }

    const events = this.props.events.events.slice(0, this.getEndItem()).map((event) => {
      switch (event.__t) {
        case 'User':
          return <User key={event._id}
                       user={event}/>;
        case 'Photoset':
          return <Photoset
                  key={event._id}
                  photoset={event}/>;
          break;
        default:
          return <Event key={event._id}
                        event={event}
          />
      }
    });

    return (
      <div>
        {events}
        <div className="show-more" onClick={this.changePage.bind(this)}>
          <span>{this.props.strings.newsFeed.showMore}</span>
        </div>
      </div>
    );
  }
}

export default translate(NewsFeed);
