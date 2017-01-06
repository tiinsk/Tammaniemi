import React from 'react';
import translate from '../../translate.jsx';

export default translate(({strings}) => {
  return (
    <div className="loading-animation">
      <div className="loader-dot"></div>
      <div className="loader-dot"></div>
      <div className="loader-dot"></div>
      <div className="loader-dot"></div>
      <div className="loader-dot"></div>
      <div className="loader-text">{strings.loading}</div>
    </div>
    );
});
