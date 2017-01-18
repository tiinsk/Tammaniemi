import React from 'react';
import axios from 'axios';
import Textfield from 'react-mdl/lib/Textfield';
import translate from '../../translate.jsx';

class InviteUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
      this.props.close();
    });
  }

  render() {
    return (
        <form className="invite-user-form"
              onSubmit={ this.handleSubmit.bind(this) }>
          <legend className="title">
            {this.props.strings.inviteUserModal.inviteUser}
          </legend>
          <Textfield className="full-width-textfield"
                     label={this.props.strings.email}
                     type="email"
                     value={ this.state.email }
                     required
                     onChange={ this.updateEmail.bind(this) } />
          <br />
          <button type="submit"
                  className="submit-btn">
            {this.props.strings.events.submit}
          </button>
          <button className="cancel-btn"
                  onClick={ this.props.close }>
            {this.props.strings.cancel}
          </button>
        </form>
      );
  }
}

export default translate(InviteUser);
