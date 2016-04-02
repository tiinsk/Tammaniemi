import React from 'react';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import EventActions from '../event_actions';
import EventStore from '../event_store';

import history from '../../history';

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
      (<Photoset photoset={photoset} key={photoset.id} />)
    ) : <h2>Loading</h2>;
    return (
      <section className="gallery">
        <Row>
          <Col md="8" md-offset="2">
            <div className="photoset-container">
              {galleryList}
            </div>
          </Col>
        </Row>
      </section>
    );
  }
}


class Photoset extends React.Component {

  goTo(id) {
    history.pushState(null, `/gallery/${id}`);
  }

  render() {
    const photoset = this.props.photoset;
    const style = {
      backgroundImage: `url("//farm${photoset.farm}.staticflickr.com/${photoset.server}/${photoset.primary}_${photoset.secret}_m.jpg")`
    };
    return (
      <div className="photoset" style={style} onClick={this.goTo.bind(this, photoset.id)} >
        <div className="overlay"></div>
        <h3>{photoset.title._content} <span className="amount"> {photoset.photos}photos</span></h3>
      </div>
    );
  }
}

export default IndexGallery;
