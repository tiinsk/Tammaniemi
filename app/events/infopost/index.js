import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import EventActions from '../event_actions';
import EventStore from '../event_store';

import history from '../../history';

import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import Event from "../event_layout";

import NavigationBox from './navigation';

class IndexInfoPosts extends React.Component {
  constructor(props) {
    super(props);
    let infoposts = EventStore.getByType('infoposts');
    if(infoposts.length > 0){
      let organizedInfoposts = this.getInfopostsByCategory(infoposts);
      let category = Object.keys(organizedInfoposts)[0];
      this.state = {
        infoposts: organizedInfoposts,
        category: category
      };
    }else{
      this.state = {
        infoposts: [],
        category: undefined
      };
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    EventStore.listen(this.onChange);
  }

  componentWillUnmount() {
    EventStore.unlisten(this.onChange);
  }

  onChange(state) {
    let infoposts = state.infoposts;
    let organizedInfoposts = this.getInfopostsByCategory(infoposts);
    let category = Object.keys(organizedInfoposts)[0];
    this.setState({
      infoposts: organizedInfoposts,
      category: category
    });

  }

  handleDelete(infopostId) {
    EventActions.delete({
      type: 'infoposts',
      id: infopostId
    });
  }

  handleUpdate(infopostId){
    history.pushState(null, `/infoposts/update/${infopostId}` );
  }


  getInfopostsByCategory(infoposts){
    return infoposts.reduce((res, infopost) => {
      let category = infopost.category;
      if(!res[category]){
        res[category] = [];
      }

      res[category].push(infopost);
      return res;
    }, {});
  }

  update(category){
    this.setState({
      category: category
    });
  }

  render() {
    let selectedInfoposts = [];
    if (this.state.category != undefined) {
      selectedInfoposts = this.state.infoposts[this.state.category];
    };
    let infopostList = selectedInfoposts.map((infopost) => {
      return (
          <Event key={infopost._id}
            markdownContent
            className="infopost"
            event={infopost}
            to={`/infoposts/${infopost._id}`}
            secondarySymbol={infopost.category}
            addComment={this.handleAddComment}
            delete={this.handleDelete}
            update={this.handleUpdate}
          >
            {infopost.content}
          </Event>
      );
    });

    const categories = [
          "Yleistä",
          "Kevät- ja syystyöt",
          "Kunnossapito",
          "Piha",
          "Sauna",
          "Sähkö",
          "Tärkeät yhteystiedot",
          "Vene ja vesistö",
          "Vesi",
          "WC ja jätteet"
          ];

    const categoryObjects = categories.map((category, index) => {
      let obj = {header: category };
      if(this.state.infoposts[index]){
        obj.amount = Object.keys(this.state.infoposts[index]).length;
      }else{
       obj.amount = 0;
      }
      return obj;
    });

    return (
      <div className='container'>
        <Row>
        <Col md="3">
            <NavigationBox
              update={this.update.bind(this)}
              chosenCategory={this.state.category}
              categories={categoryObjects}
              infoposts={selectedInfoposts} />
          </Col>
          <Col md="6">
            {infopostList}
          </Col>
        </Row>
      </div>
    );
  }
}

export default IndexInfoPosts;
