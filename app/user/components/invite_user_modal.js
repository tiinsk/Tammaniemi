import React from 'react';

import axios from 'axios';

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

    axios.post('/api/invite', {email}).then(() => {
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
        <div className="btn" onClick={this.openModal.bind(this)}>
          Invite new user
        </div>

        <div className={`modal ${this.state.displayModal ? 'show-modal' : ''}`} >
          <div className="modal-content">
            {/*<Row>
              <Col md="8" md-offset="2" >
                <Form className="form" onSubmit={this.handleSubmit.bind(this)}>
                  <legend className="title">Invite new user </legend>
                  <Input
                    label="Email"
                    type="email"
                    className="form-control"
                    value={this.state.email}
                    floatingLabel
                    required
                    onChange={this.updateEmail.bind(this)}
                  />

                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                  <button className="cancel-btn" onClick={this.closeModal.bind(this)}>
                    Cancel
                  </button>
                </Form>
              </Col>
            </Row>*/}
          </div>
        </div>
      </div>
    );
  }
}
