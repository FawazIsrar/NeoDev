import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div className="comment-form-container glass-panel">
      <h3 className="text-primary" style={{ marginBottom: '1rem' }}>Leave a Comment</h3>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="3"
          placeholder="What are your thoughts?"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-primary my-1" value="Post Comment" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(null, { addComment })(CommentForm);
