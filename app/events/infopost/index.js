import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import EventActions from '../event_actions';
import EventStore from '../event_store';
import Button from 'muicss/lib/react/button';

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
      let infopost = Object.keys(organizedInfoposts[catgory])[0];
      this.state = {
        infoposts: organizedInfoposts,
        category: category,
        infopost: infopost
      };
    }else{
      this.state = {
        infoposts: [],
        category: undefined,
        infopost: undefined
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
    let infopost = _.last(Object.keys(organizedInfoposts[category]));
    this.setState({
      infoposts: organizedInfoposts,
      category: category,
      infopost: infopost
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

  update(obj){
    if (obj.category != undefined) {
      let infopost = _.last(Object.keys(this.state.infoposts[obj.category]));
      this.setState({
        category: obj.category,
        infopost: infopost
      });
    }
    if (obj.item != undefined) {
      this.setState({
        infopost: obj.item
      });
    }
  }

  goTo(link){
    history.pushState(null, link);
  }

  render() {
    let selectedInfopost;
    if (this.state.category != undefined && this.state.infopost != undefined) {
      let data = this.state.infoposts[this.state.category][this.state.infopost];
      selectedInfopost = (
          <Event key={data._id}
            markdownContent
            className="infopost"
            event={data}
            to={`/infoposts/${data._id}`}
            secondarySymbol={data.category}
            addComment={this.handleAddComment}
            delete={this.handleDelete}
            update={this.handleUpdate}
          >
            {data.content}
          </Event>
      );
    };
    let infopostObjects;
    if (this.state.category != undefined) {
      infopostObjects = this.state.infoposts[this.state.category];
    };

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
        <div className="page-title">
          Infoposts
          <div className="add-new post" onClick={this.goTo.bind(this, "/infoposts/new")}>
            <span>+</span>
          </div>
        </div>
        <div className="app-row-center">
        <div className="col-left">
            <NavigationBox
              update={this.update.bind(this)}
              chosenCategory={this.state.category}
              categories={categoryObjects}
              chosenInfopost = {this.state.infopost}
              infoposts={infopostObjects} />
          </div>
          <div className="col-main">
            {selectedInfopost}
          </div>
        </div>
      </div>
    );
  }
}

export default IndexInfoPosts;
