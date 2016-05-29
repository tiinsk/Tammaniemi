import React from 'react';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import axios from 'axios';

import SpinnerOverlay from '../../partials/spinner_overlay';
import GalleryForm from './form';
import { withRouter } from 'react-router';

class AddGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoset: {},
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
      transformRequest(data) { return data; }
    }).then((response) => {
      this.setState({
        spinnerVisible: false
      });
      this.props.router.push(`/gallery/${response.data.id}`);
    });
  }

  render() {
    return (
      <Row>
        <Col md="6" md-offset="3" >
          <SpinnerOverlay isVisible={this.state.spinnerVisible} />
          <GalleryForm photoset={this.state.photoset} onPhotosetSubmit={this.handleSubmit.bind(this)} />
        </Col>
      </Row>
    );
  }
}

export default withRouter(AddGallery);
