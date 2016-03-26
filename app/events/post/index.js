import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import EventActions from '../event_actions';
import EventStore from '../event_store';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

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
      this.state = {
        posts: organizedPosts,
        year: year,
        month: month
      };
    }else{
      this.state = {
        posts: [],
        year: undefined,
        month: undefined
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
    this.setState({
      posts: organizedPosts,
      year: year,
      month: month
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
      this.setState({
        month: obj.month
      });
    }
    if (obj.year != undefined) {
      let year = Object.keys(this.state.posts)[obj.year];
      let month = _.last(Object.keys(this.state.posts[year]));
      this.setState({
        year: year,
        month: month
      });
    }
  }

  render() {
    let selectedPosts = [];
    if (this.state.year != undefined && this.state.month != undefined) {
      selectedPosts = this.state.posts[this.state.year][this.state.month];
    };
    const postList = selectedPosts.map((post) =>
      (
        <Event key={post._id} className="post"
          event={post}
          markdownContent
          to={`/posts/${post._id}`}
          delete={this.handleDelete}
          update={this.handleUpdate}
        >
          {post.content}
        </Event>
      )
    );


    const years = Object.keys(this.state.posts);
    const months = moment.months();

    const yearObjects = years.map((year) => {
      console.log(year);
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
        <Row>
          <Col md="3">
            <NavigationBox
              update={this.update.bind(this)}
              chosenYear={years.indexOf(this.state.year)}
              years={yearObjects}
              chosenMonth={this.state.month}
              months={monthObjects}
              posts={selectedPosts} />
          </Col>
          <Col md="6">
            {postList}
          </Col>
        </Row>

      </div>
    );
  }
}

export default IndexPosts;

