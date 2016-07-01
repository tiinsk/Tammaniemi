import React from 'react';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import LightBox from './lightBox';

import EventStore from '../event_store';


class ShowGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxHeight: 350,
      photoset: EventStore.getByTypeAndId('photosets', this.props.params.galleryId, true),
      lightBoxIsOpen: false,
      lightBoxImage: 0
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    EventStore.listen(this.onChange);
  }

  componentWillUnmount() {
    EventStore.unlisten(this.onChange);
  }

  onChange() {
    this.setState({
      photoset: EventStore.getByTypeAndId('photosets', this.props.params.galleryId)
    });
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
    const photosetPhotos = this.state.photoset.photo || [];
    const lightBoxImages = photosetPhotos.map((photo) => (
      { src: photo.url_c,
        caption: photo.title
      }
    ));
    const rows = [...this.rowGenerator(photosetPhotos)];
    const photos = rows ?
      rows.map((photos, index) => (
          <Row key={index}>
            <Col md="12" >
              {photos}
            </Col>
          </Row>
        )) :
      <h2> Loading </h2>;
    return (
      <section className="gallery">
        <div className="page-title">
          {this.state.photoset.title}
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

export default ShowGallery;
