import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LightBox from '../presentational/lightbox.jsx';
import {fetchOne, clearEvent} from '../../actions/event_actions.js';
import Photo from '../presentational/photo.jsx';

const ROOT_PADDING_PERCENT = 7;

class ShowGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxHeight: 280,
      lightBoxIsOpen: false,
      lightBoxImage: 0
    };

    this.props.fetchOne('Photoset', this.props.params.galleryId);
    this.onResize = this.onResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    this.props.clearEvent();
  }

  onResize() {
    this.forceUpdate();
  }

  getContainerWidth() {
    return document.body.clientWidth * ((100 - ROOT_PADDING_PERCENT * 2) / 100) - 20;
  }

  heightWithCandidate(row, candidate) {
    let ratioSum = row.reduce((result, img) => result + (parseInt(img.width_c, 10) / parseInt(img.height_c, 10)), 0);
    ratioSum += (parseInt(candidate.width_c, 10) / parseInt(candidate.height_c, 10));
    return Math.round(this.getContainerWidth() / ratioSum);
  }

  * rowGenerator(photos = []) {
    let row = [];
    let height = this.state.maxHeight;
    let prevHeight = this.state.maxHeight;
    let photoIndex = 0;

    for (const img of photos) {
      const candidateHeight = this.heightWithCandidate(row, img);

      if (candidateHeight >= this.state.maxHeight) {
        row.push(img);
        height = candidateHeight;
      } else {
        prevHeight = height;
        yield row.map((photo) => (
          <Photo photo={photo}
                 key={photo.id}
                 height={height}
                 onClick={this.openLightBox.bind(this, photoIndex++)}
                 index={photoIndex}
          />
        ));
        row = [img];
      }
    }
    yield row.map((photo) => (
      <Photo photo={photo}
             key={photo.id}
             height={prevHeight}
             onClick={this.openLightBox.bind(this, photoIndex++)}
             index={photoIndex}
      />
    ));
  }

  openLightBox(index) {
    this.setState({
      lightBoxIsOpen: true,
      lightBoxImage: index
    });
  }

  closeLightbox() {
    this.setState({
      lightBoxIsOpen: false
    });
  }

  render() {
    const photosetPhotos = this.props.photoset.photo || [];
    const lightBoxImages = photosetPhotos.map((photo) => (
      {
        src: photo.url_c,
        caption: photo.title
      }
    ));
    const rows = [...this.rowGenerator(photosetPhotos)];

    const photos = rows ?
      rows.map((photos, index) => (
        <div className="row" key={index} style={{margin: `0 ${ROOT_PADDING_PERCENT}%`}}>
          {photos}
        </div>
      )) :
      <h2> Loading </h2>;
    return (
      <section className="gallery">
        <LightBox images={lightBoxImages}
                  currentImage={this.state.lightBoxImage}
                  lightboxIsOpen={this.state.lightBoxIsOpen}
                  closeLightboxCb={this.closeLightbox.bind(this)}/>
        {photos}
      </section>
    );
  }
}

function mapStateToProps({events}) {
  return Object.assign({}, {
    loading: events.loading,
    photoset: events.event
  });
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchOne, clearEvent}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowGallery);
