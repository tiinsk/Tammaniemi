import React from 'react';

import Event from '../containers/event.jsx';
import User from '../containers/user.jsx';
import LoadingAnimation from './loading_animation.jsx';
import translate from '../../translate.jsx';
import PhotosetEvent from '../containers/photoset_event.jsx';

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
    if ((this.state.currentPage + 1) * this.state.itemsPerPage < this.props.data.events.length) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }
  }

  render() {
    if (this.props.data.loading.events) {
      return (
        <LoadingAnimation />
      )
    }

    const events = this.props.data.events.slice(0, this.getEndItem()).map((event) => {
      switch (event.__t) {
        case 'User':
          return <User key={event._id}
                       user={event}/>;
        case 'Photoset':
          return <PhotosetEvent
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
