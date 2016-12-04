import React from 'react';
import {withRouter} from 'react-router';

const Photoset = ({router, photoset}) => {

  const goTo = (id) => {
    router.push(`/gallery/${id}`);
  };

  const style = {
    backgroundImage: `url("//farm${photoset.farm}.staticflickr.com/${photoset.server}/${photoset.primary}_${photoset.secret}_b.jpg")`
  };
  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 photoset-container" onClick={() => goTo(photoset.id) }>
      <div className="photoset">
        <div className="photoset-img" style={style}/>
        <div className="details">
        <span className="title">
          {photoset.title._content}
        </span>
          <span className="amount">
          {photoset.photos} photos
        </span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Photoset);
