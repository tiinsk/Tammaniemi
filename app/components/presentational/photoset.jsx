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
      backgroundImage: `url("//farm${photoset.farm}.staticflickr.com/${photoset.server}/${photoset.primary}_${photoset.secret}_b.jpg")`
    };
    const loadedClass = isLoaded ? 'loaded' : 'notLoaded';

    return (
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 photoset-container" onClick={() => this.goTo(photoset.id) }>
        <div className="photoset">
          <img
            src={`//farm${photoset.farm}.staticflickr.com/${photoset.server}/${photoset.primary}_${photoset.secret}_b.jpg`}
            className="hidden"
            onLoad={() => this.onLoad()}/>
          <div className={`placeholder ${loadedClass}`}></div>
          <div className={`photoset-img ${loadedClass}`} style={style}></div>
          <div className="details">
            <span className="title">
              {photoset.title._content}
            </span>
            <span className="amount">
              {photoset.photos} photos
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Photoset);
