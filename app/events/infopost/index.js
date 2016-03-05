import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import InfoPostStore from './infopost_store';
import InfoPostActions from './infopost_actions';

class IndexInfoPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = InfoPostStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    InfoPostStore.listen(this.onChange);
    InfoPostActions.getInfoPosts(this.props.params);
  }

  componentWillUnmount() {
    InfoPostStore.unlisten(this.onChange);
  }
/*
  componentDidUpdate(prevProps) {
    console.log("updated");
    if (!isEqual(prevProps.params, this.props.params)) {
      InfoPostActions.getInfoPosts(this.props.params);
    }
  }
*/
  onChange(state) {
    this.setState(state);
  }

  render() {
    let infopostList = this.state.infoposts.map((infopost, index) => {
      return (
              <div key={infopost._id} className=''>
                <h4>
                  <Link to={`/infoposts/${infopost._id}`}>{infopost.title}</Link>
                </h4>

              </div>
      );
    });

    return (
      <div className='container'>
        <div className='list-group'>
          {infopostList}
        </div>
      </div>
    );
  }
}

export default IndexInfoPosts;
