import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchEvents} from '../../../actions/event_actions';
import LoadingAnimation from '../../presentational/loading_animation.jsx';
import Photoset from '../../presentational/photoset.jsx';

class PhotosetList extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchEvents('Photoset', 'time');
  }


  render() {
    if (this.props.loading) {
      return (
        <LoadingAnimation />
      )
    }

    let photosetElements = this.props.photosets.map((photoset, index) => {
      return (
        <Photoset
          photoset={photoset}
          key={index}
        />
      );
    });

    return (
      <div className="list-photoset">
        <div className="row center">
          <div className="gallery-main">
            <div className="row wrap space-between">
              {photosetElements}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps({events}) {
  return {
    loading: events.loading.Photoset,
    photosets: events.Photoset
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotosetList);
