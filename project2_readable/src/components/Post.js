import React, { Component } from 'react';
import * as api from '../utils/api'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { browserHistory } from 'react-router'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Comments from './Comments'
import { getAllPosts, votePost, removePost } from '../actions';
import AddEditComment from './AddEditComment'
import AddEditPost from './AddEditPost'

class Post extends Component {
  state = {
    commentModalOpen: false,
    isEditing: false,
  }

  componentWillMount () {
    api.getPosts().then(data => this.props.getAllPosts(data))
  }

  openCommentModal = () => {
    this.setState(() => ({
      commentModalOpen: true,
    }))
  }

  handleUpVote = (id, e) => {
    api.votePost(id, "upVote").then((data) => this.props.votePost(id, data))
  }

  handleDownVote = (id, e) => {
    api.votePost(id, "downVote").then((data) => this.props.votePost(id, data))
  }

  handleDeletePost = (id, e) => {
    api.removePost(id).then((data) => this.props.removePost(data.id))
    //Go back to home
    this.props.history.push('/')
  }

  handleEditPost = (id, e) => {
    this.setState((prevState) => ({isEditing: !prevState.isEditing}))
  }


  togglePostModal = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }))
  }

  toggleCommentModal = () => {
    this.setState((prevState) => ({
      commentModalOpen: !prevState.commentModalOpen,
    }))
  }
  render(){
    const { id, timestamp, title, body, author, category, voteScore, deleted, commentCount } = this.props.data ? this.props.data : {}
    const {commentModalOpen, isEditing } = this.state
    const postId = this.props.match ? this.props.match.params.post_id : "";
    return (
      <div>
        <div className='row'>
          <div className='post-details col'>
            <h2>Post Details</h2>
            <Link to="/" replace={false}>Back</Link>
            <div>{title} by {author}</div>
            <div>{body}</div>
            <div>Comment Count: {commentCount}</div>
            <div>Time posted: {new Date(timestamp).toLocaleString('en-us', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}
            </div>
            <div className='row justify-content-between'>
              <div className='col-4'>Current Score:
                <button type="button" className="btn btn-light" onClick={this.handleUpVote.bind(this, id)}><i class="fas fa-thumbs-up"></i></button>
                {voteScore}
                <button type="button" className="btn btn-light" onClick={this.handleDownVote.bind(this, id)}><i class="fas fa-thumbs-down"></i></button>
              </div>
              <div className="btn-group col-2" role="group">
                <button type="button" className="btn btn-light" onClick={this.handleEditPost.bind(this, id)}><span class="far fa-edit"></span></button>
                <button type="button" className="btn btn-danger"  onClick={this.handleDeletePost.bind(this, id)}><i class="far fa-trash-alt"></i></button>
              </div>
            </div>
            <button className='btn btn-outline-primary' onClick={this.openCommentModal}>Add Comment</button>
          </div>
        </div>
        <Comments />
        <Modal
          isOpen={commentModalOpen}
          toggle={this.toggleCommentModal}
          contentLabel='Modal'
          ariaHideApp={false}
        >
         <ModalBody>
            <AddEditComment parentId={id} />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={isEditing}
          toggle={this.togglePostModal}
          contentLabel='Modal'
          ariaHideApp={false}
        >
        {/* If is editing, then display Modal and pass in props of post details*/}
          <ModalBody>
            <AddEditPost data={this.props.data}/>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    data: Object.values(state.posts).filter((p) => p.id === ownProps.match.params.post_id)[0],
  }
}
export default connect(mapStateToProps, { getAllPosts, votePost, removePost })(Post);
