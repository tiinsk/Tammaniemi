import React from 'react';
import Lightbox from 'react-images';

class LightBox extends React.Component {
  constructor(props) {
    super(props);
    this.gotoPrevious = this._gotoPrevious.bind(this);
    this.gotoNext = this._gotoNext.bind(this);
    this.state = {
      currentImage: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentImage: nextProps.currentImage
    });
  }

  _gotoPrevious() {
    const nextImage = this.state.currentImage - 1 > 0 ? this.state.currentImage - 1 : 0;
    this.setState({
      currentImage: nextImage
    });
  }

  _gotoNext() {
    const nextImage = this.state.currentImage + 1 < this.props.images.length ?
          this.state.currentImage + 1 : this.props.images.length - 1;
    this.setState({
      currentImage: nextImage
    });
  }

  render() {
    return (
      <Lightbox
        images={this.props.images}
        isOpen={this.props.lightboxIsOpen}
        backdropClosesModal
        currentImage={this.state.currentImage}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.props.closeLightboxCb}
      />
    );
  }
}

export default LightBox;
