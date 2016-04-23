import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import EventActions from '../event_actions';
import EventStore from '../event_store';
/*import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';*/

import {Link} from 'react-router';
import Button from 'muicss/lib/react/button';

import history from '../../history';
import Event from '../event_layout';

import NavigationBox from './navigation';

class IndexPosts extends React.Component {
  constructor(props) {
    super(props);
    let posts = EventStore.getByType('posts');
    if(posts.length > 0){
      let organizedPosts = this.getPostsByYearAndMonth(posts);
      let year = Object.keys(organizedPosts)[0];
      let month = Object.keys(organizedPosts[year])[0];
      let post = Object.keys(organizedPosts[year][month])[0];
      this.state = {
        posts: organizedPosts,
        year: year,
        month: month,
        post: post
      };
    }else{
      this.state = {
        posts: [],
        year: undefined,
        month: undefined,
        post: undefined
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
    let posts = state.posts;
    let organizedPosts = this.getPostsByYearAndMonth(posts);
    let year = _.last(Object.keys(organizedPosts));
    let month = _.last(Object.keys(organizedPosts[year]));
    let post = _.last(Object.keys(organizedPosts[year][month]));
    this.setState({
      posts: organizedPosts,
      year: year,
      month: month,
      post: post
    });

  }

  handleDelete(postId) {
    EventActions.delete({
      type: 'posts',
      id: postId
    });
  }

  handleUpdate(postId) {
    history.pushState(null, `/posts/update/${postId}`);
  }

  getPostsByYearAndMonth(posts){
    return posts.reduce((res, post) => {
      let year = moment(post.createdAt).year();
      let month = moment(post.createdAt).month();
      if(!res[year]){
        res[year] = {};
      }
      if(!res[year][month]){
        res[year][month] = [];
      }

      res[year][month].push(post);
      return res;
    }, {});
  }

  update(obj){
    if (obj.month != undefined) {
      let post = _.last(Object.keys(this.state.posts[this.state.year][obj.month]));
      this.setState({
        month: obj.month,
        post: post
      });
    }
    if (obj.year != undefined) {
      let year = Object.keys(this.state.posts)[obj.year];
      let month = _.last(Object.keys(this.state.posts[year]));
      let post = _.last(Object.keys(this.state.posts[year][month]));
      this.setState({
        year: year,
        month: month,
        post: post
      });
    }
    if (obj.item != undefined){
      this.setState({
        post: obj.item
      });
    }
  }

  goTo(link){
    history.pushState(null, link);
  }

  render() {
    let selectedPost;
    if (this.state.year != undefined && this.state.month != undefined && this.state.post != undefined) {
      let postData = this.state.posts[this.state.year][this.state.month][this.state.post];
      selectedPost = (
        <Event key={postData._id} className="post"
          commentsOpen
          event={postData}
          markdownContent
          to={`/posts/${postData._id}`}
          delete={this.handleDelete}
          update={this.handleUpdate}
        >
          {postData.content}
        </Event>
      );
    };

    let postObjects;
    if(this.state.year != undefined && this.state.month != undefined){
      postObjects = this.state.posts[this.state.year][this.state.month];
    }

    const years = Object.keys(this.state.posts);
    const months = moment.months();

    const yearObjects = years.map((year) => {
      let obj = {header: year };
      if(this.state.posts){
        obj.amount = _.reduce(this.state.posts[year], (res, month) =>{
          return res + Object.keys(month).length;
        },0);

      }else{
       obj.amount = 0;
      }
      return obj;
    });

    const monthObjects = months.map((month, index) => {
      let obj = {header: month };
      if(this.state.posts[this.state.year] && this.state.posts[this.state.year][index]){
        obj.amount = Object.keys(this.state.posts[this.state.year][index]).length;
      }else{
       obj.amount = 0;
      }
      return obj;
    });

    return (
      <div className="container">
        <div className="page-title">
          Posts
          <div className="add-new post" onClick={this.goTo.bind(this, "/posts/new")}>
            <span>+</span>
          </div>
        </div>
        <div className="app-row-center">
          <div className="col-left" >
            <NavigationBox
              update={this.update.bind(this)}
              chosenYear={years.indexOf(this.state.year)}
              years={yearObjects}
              chosenMonth={this.state.month}
              months={monthObjects}
              chosenPost = {this.state.post}
              posts={postObjects} />
          </div>
          <div className="col-main" >
            {selectedPost}
          </div>
        </div>

      </div>
    );
  }
}

export default IndexPosts;

