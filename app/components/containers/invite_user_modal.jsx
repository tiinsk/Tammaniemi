import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Textfield from 'react-mdl/lib/Textfield';

export default class InviteUserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      displayModal: false
    };
  }

  updateEmail(event) {
    const email = event.target.value.trim();
    this.setState({
      email
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const email = this.state.email;

    axios.post('/api/invite', {
      email
    }).then(() => {
      this.closeModal();
    });
  }

  openModal() {
    this.setState({
      displayModal: true
    });
  }

  closeModal() {
    this.setState({
      displayModal: false
    });
  }

  render() {
    return (
      <div className="login-modal">
        <div className="btn"
             onClick={ this.openModal.bind(this) }>
          Invite new user
        </div>
        <div className={ `modal ${this.state.displayModal ? 'show-modal' : ''}` }>
          <div className="modal-content">
            <div className="row">
              <div className="col-md-12">
                <form className="form"
                      onSubmit={ this.handleSubmit.bind(this) }>
                  <legend className="title">
                    Invite new user
                  </legend>
                  <Textfield className="full-width-textfield"
                             label="Email"
                             type="email"
                             value={ this.state.email }
                             required
                             onChange={ this.updateEmail.bind(this) } />
                  <br />
                  <button type="submit"
                          className="submit-btn">
                    Submit
                  </button>
                  <button className="cancel-btn"
                          onClick={ this.closeModal.bind(this) }>
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}
