import React from 'react';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import { Link } from 'react-router';
import Button from 'muicss/lib/react/button';
import { withRouter } from 'react-router';

import EventStore from '../event_store';

class IndexGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photosets: EventStore.getByType('photosets')
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    EventStore.listen(this.onChange);
  }

  componentWillUnmount() {
    EventStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({
      photosets: state.photosets
    });
  }


  render() {
    const galleryList = this.state.photosets.length ? this.state.photosets.map((photoset) =>
      (<Photoset photoset={photoset} key={photoset.id} router={this.props.router} />)
    ) : <h2>Loading</h2>;
    return (
      <section className="gallery">
        <div className="page-title">
          Gallery
          <div className="add-new gallery" onClick={() => this.props.router.push("/gallery/new")}>
            <span>+</span>
          </div>
        </div>
        <div className="app-row-only-1100">
          <div className="col-main-only">
            <div className="photoset-container">
              {galleryList}
            </div>
          </div>
        </div>
      </section>
    );
  }
}


class Photoset extends React.Component {

  goTo(id) {
    this.props.router.push(`/gallery/${id}`);
  }

  render() {
    const photoset = this.props.photoset;
    const style = {
      backgroundImage: `url("//farm${photoset.farm}.staticflickr.com/${photoset.server}/${photoset.primary}_${photoset.secret}_m.jpg")`
    };
    return (
      <div className="photoset-frame" onClick={this.goTo.bind(this, photoset.id)} >
        <div className="photoset" style={style} />
        <div className="details">
          <span className="title">
            {photoset.title._content}
          </span>
          <span className="amount">
            {photoset.photos} photos
          </span>
        </div>
      </div>
    );
  }
}

export default withRouter(IndexGallery);
