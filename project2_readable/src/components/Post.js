import React, { Component } from 'react';

class Post extends Component {
  const props = this.props;

  render(){
    return (
      <div>
        <div>{props.match.params.post_id}</div>
      </div>
    )
  }
}

export default Post;