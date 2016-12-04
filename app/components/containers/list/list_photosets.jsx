import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchEvents} from '../../../actions/event_actions';
import LoadingAnimation from '../../presentational/loading_animation.jsx';
import Photoset from '../../presentational/photoset.jsx';

class PhotosetList extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchEvents('photosets', 'time');
  }


  render() {
    if (this.props.loading) {
      return (
        <div>
          <div className="page-title">
            Gallery
          </div>
          <LoadingAnimation />
        </div>
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
        <div className="page-title">
          Gallery
        </div>
        <div className="photosets-container row around-xs center-xs">
          <div className="col-xs-11 col-md-9 col-lg-8">
            <div className="row">
              {photosetElements}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps({events}) {
  console.log("photosets", events.photosets);
  return {
    loading: events.loading,
    photosets: events.photosets
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchEvents}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotosetList);
