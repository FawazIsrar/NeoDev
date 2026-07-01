import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
  <div className="comment-item glass-panel">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4 className="text-center">{name}</h4>
      </Link>
    </div>
    <div className="comment-content">
      <div className="comment-header">
        <p className="post-date text-primary" style={{ margin: 0, fontSize: '0.9rem' }}>
          <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deleteComment(postId, _id)}
            type="button"
            className="btn btn-dark"
            style={{ padding: '0.3rem 0.7rem', margin: 0 }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        )}
      </div>
      <p className="my-1">{text}</p>
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
