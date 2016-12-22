import React from 'react';
import axios from 'axios';

import SpinnerOverlay from '../../partials/spinner_overlay';
import GalleryForm from '../presentational/event_forms/gallery_form';
import {withRouter} from 'react-router';

class AddGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoset: {
        title: ''
      },
      spinnerVisible: false
    };
  }

  handleSubmit(photoset) {
    this.setState({
      spinnerVisible: true
    });
    const formData = photoset.photos;
    formData.append('title', photoset.title);

    axios.post('/api/flickr', formData, {
      transformRequest(data) {
        return data;
      }
    }).then((response) => {
      this.setState({
        spinnerVisible: false
      });
      this.props.router.push(`/gallery/${response.data.id}`);
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <SpinnerOverlay isVisible={this.state.spinnerVisible}/>
          <GalleryForm photoset={this.state.photoset} onPhotosetSubmit={this.handleSubmit.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default withRouter(AddGallery);
