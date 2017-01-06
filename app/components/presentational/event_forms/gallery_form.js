import React from 'react';
import Textfield from 'react-mdl/lib/Textfield';
import translate from '../../../translate.jsx';

class PhotosetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoset: props.photoset,
      contentError: ''
    };

    this.updateTitle = this.updateTitle.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      photoset: newProps.photoset
    });
  }

  updateTitle(event) {
    const photoset = this.state.photoset;
    photoset.title = event.target.value;
    this.setState({
      photoset
    });
  }

  updatePhotos(event) {
    event.persist();

    const photoset = this.state.photoset;
    photoset.photos = new FormData();
    for (let i = 0; i < event.target.files.length; i++) {
      photoset.photos.append(event.target.files[i].name, event.target.files[i]);
    }

    this.setState({
      photoset
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.photoset.title) {
      this.props.onPhotosetSubmit(this.state.photoset);
    }
  }

  render() {
    return (
      <div className="form photoset-form">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <legend className="title">{this.props.strings.photosetForm.addPhotoset}</legend>
          <Textfield type="text"
                     label={this.props.strings.events.title}
                     required={true}
                     value={this.state.photoset.title}
                     onChange={this.updateTitle}/>
          <div className="content">
            <label className="label">{this.props.strings.photosetForm.photos}</label>
            <input type="file" required multiple onChange={this.updatePhotos.bind(this)}/>
          </div>
          <button type="submit" className="submit-btn">{this.props.strings.events.submint}</button>
        </form>
      </div>
    );
  }
}

export default translate(PhotosetForm);
