import React, { Component } from 'react';
import { connect } from 'react-redux';
import PartialPost from './PartialPost';
import { fetchPosts } from '../actions';

class FullPost extends Component {
  state = {
    value: 'voteScore'
  }

  onSortChange = (e) => {
    const sortMethod = e.target.value;
    this.setState(() => ({
      value: sortMethod,
    }))
  }

  componentDidMount() {
    // If there is enough time, implement a default sort method that can be configured
    // if(this.props.sortMethod) {
    //   document.getElementById('sort').selectedIndex = this.props.sortMethod;
    // }
    // this.props.fetchPosts()

  }
  render(){
    return (
      <div>
        <div className='control-panel'>
          <label>Sort by: </label><select value={this.state.value} id='sort' className='sort' onChange={this.onSortChange}>
            <option value="voteScore">Vote Score</option>
            <option value="timestamp">Timestamp</option>
          </select>
        </div>
        {this.props.posts.map((post) => (<PartialPost key={post.id} data={post}/>))}
      </div>
    )
  }
}

const mapStateToProps  = (state, ownProps) => {
  console.log(Object.values(state.posts));
  const category = ownProps.category;
  let posts = Object.keys(state['posts']);
  if(category) {
    return {
      //Always use filter before mapping to choose the correct values
      posts: Object.keys(state['posts']).filter((postId) => (state['posts'][postId].category === category)).map((postId) => (state['posts'][postId]))
    }
  } else {
    return {
      posts:  Object.keys(state.posts).map((postId) => {
        return state['posts'][postId]
      })
    }
  }
}

export default connect(mapStateToProps, { fetchPosts })(FullPost);
