import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import LightBox from '../presentational/lightbox.jsx';
import {fetchOne} from '../../actions/event_actions.js';


class ShowGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxHeight: 350,
      lightBoxIsOpen: false,
      lightBoxImage: 0
    };

    this.props.fetchOne('Photoset', this.props.params.galleryId);
  }

  getWidth() {
    return window.innerWidth - 50;
  }

  shouldAddToRow(row, candidate) {
    let ratioSum = row.reduce((result, img) => result +
      (parseInt(img.width_c, 10) / parseInt(img.height_c, 10)),
    0);
    ratioSum += (parseInt(candidate.width_c, 10) / parseInt(candidate.height_c, 10));
    return this.getWidth() / ratioSum;
  }


  * rowGenerator(photos = []) {
    let row = [];
    let height = 0;
    let photoIndex = 0;

    for (const img of photos) {
      height = this.shouldAddToRow(row, img);

      if (height >= this.state.maxHeight) {
        row.push(img);
      } else {
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
        height={this.state.maxHeight}
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
      { src: photo.url_c,
        caption: photo.title
      }
    ));
    const rows = [...this.rowGenerator(photosetPhotos)];
    const photos = rows ?
      rows.map((photos, index) => (
          <div className="row" key={index}>
            <div className="col-md-12" >
              {photos}
            </div>
          </div>
        )) :
      <h2> Loading </h2>;
    return (
      <section className="gallery">
        <div className="page-title">
          {this.props.photoset.title}
          <div className="add-new" onClick={() => {}}>
          <span>+</span>
          </div>
        </div>
        <LightBox images = {lightBoxImages}
          currentImage = {this.state.lightBoxImage}
          lightboxIsOpen = {this.state.lightBoxIsOpen}
          closeLightboxCb = {this.closeLightbox.bind(this)}
        />
        {photos}
      </section>
    );
  }
}

class Photo extends React.Component {
  render() {
    const photo = this.props.photo;
    const style = {
      width: this.props.height * parseInt(this.props.photo.width_c, 10) / parseInt(this.props.photo.height_c, 10),
      height: this.props.height
    };
    return (
      <div className="photo" style={style} onClick={this.props.onClick}>
        <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`} />
      </div>
    );
  }
}



function mapStateToProps({events}) {
  return {
    loading: events.loading,
    photoset: events.event
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchOne}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowGallery);
