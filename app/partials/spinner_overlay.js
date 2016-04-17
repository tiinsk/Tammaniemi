import React from 'react';
import Spinner from 'react-spinkit';

class SpinnerOverlay extends React.Component {

  createSpinner(visible) {
    if (visible) {
      return (
        <div className="spinner-overlay">
          <div className="spinner-container">
            <Spinner spinnerName="three-bounce" />
          </div>
        </div>
      );
    }

    return null;
  }

  render() {
    return this.createSpinner(this.props.isVisible);
  }
}

export default SpinnerOverlay;
