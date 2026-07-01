import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions
}) => (
  <div className="post-card glass-panel my-1">
    <div className="post-header">
      <Link to={`/profile/${user}`} className="post-user-info">
        <img className="round-img" src={avatar} alt="" />
        <div>
          <h4>{name}</h4>
          <p className="post-date text-primary">
            <Moment format="YYYY/MM/DD hh:mm A">{date}</Moment>
          </p>
        </div>
      </Link>
      {!auth.loading && auth.user && user === auth.user._id && (
        <button
          onClick={() => deletePost(_id)}
          type="button"
          className="btn btn-dark"
          style={{ padding: '0.4rem 0.8rem', borderRadius: '8px' }}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      )}
    </div>

    <div className="post-body my-1">
      <p>{text}</p>
    </div>

    <div className="post-actions">
      <button
        onClick={() => addLike(_id)}
        type="button"
        className="btn btn-light"
      >
        <i className="fas fa-thumbs-up"></i>{' '}
        <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
      </button>
      <button
        onClick={() => removeLike(_id)}
        type="button"
        className="btn btn-light"
      >
        <i className="fas fa-thumbs-down"></i>
      </button>
      {showActions && (
        <Link to={`/posts/${_id}`} className="btn btn-primary">
          Discussion{' '}
          {comments.length > 0 && (
            <span className="comment-count">{comments.length}</span>
          )}
        </Link>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
