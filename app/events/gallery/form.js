import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';

class PhotosetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoset: props.photoset,
      contentError: ''
    };
  }

  componentWillReceiveProps (newProps) {
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
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <legend className="title">Add new photoset</legend>
          <Input label="Title" floatingLabel required
            value={this.state.photoset.title}
            onChange={this.updateTitle.bind(this)}
          />
          <div className="content">
            <label className="label">Photos</label>
            <input type="file" required multiple onChange={this.updatePhotos.bind(this)} />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </Form>
      </div>
    );
  }
}

export default PhotosetForm;
