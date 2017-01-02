import React from 'react';

class Photo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    }

    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    this.setState({
      isLoaded: true
    })
  }

  render() {
    const {photo, height, onClick} = this.props;
    const {isLoaded} = this.state;
    const width = Math.round(height * parseInt(photo.width_c, 10) / parseInt(photo.height_c, 10));
    const style = {
      container: {
        width: width,
        flex: `0 0 ${width}px`,
        height: height,
      }
    };
    const aspectRatioClass = photo.width_c > photo.height_c ? 'wide' : 'tall';
    const loadedClass = isLoaded ? 'loaded' : 'notLoaded';

    return (
      <div className="photo" style={style.container}>
        <div className={`placeholder ${loadedClass}`}></div>
        <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`}
             onClick={onClick}
             className={`${aspectRatioClass} ${loadedClass}`}
             onLoad={() => this.onLoad()}/>
      </div>
    );
  }
}

export default Photo;
