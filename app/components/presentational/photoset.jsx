import React from 'react';
import {withRouter} from 'react-router';

class Photoset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };

    this.onLoad = this.onLoad.bind(this);
    this.goTo = this.goTo.bind(this);
  }

  onLoad() {
    this.setState({
      isLoaded: true
    })
  }

  goTo(id) {
    this.props.router.push(`/gallery/${id}`);
  }

  render() {
    const {photoset} = this.props;
    const {isLoaded} = this.state;
    const style = {
      backgroundImage: `url("${photoset.primaryPhotoUrl}")`
    };
    const loadedClass = isLoaded ? 'loaded' : 'notLoaded';

    return (
      <div className="photoset-container" onClick={() => this.goTo(photoset.flickrId) }>
        <div className="photoset">
          <img
            src={`${photoset.primaryPhotoUrl}`}
            className="hidden"
            onLoad={() => this.onLoad()}/>
          <div className={`placeholder ${loadedClass}`}></div>
          <div className={`photoset-img ${loadedClass}`} style={style}></div>
          <div className="info">
            <span className="title">
              {photoset.title}
            </span>
            <span className="amount">
              {photoset.photos.length} photos
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Photoset);
