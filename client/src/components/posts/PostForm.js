import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);

  const enhancePost = async () => {
    if (!text) {
      alert("Please write something first to enhance it.");
      return;
    }
    try {
      setIsEnhancing(true);
      const res = await axios.post("/api/ai/enhance-post", { text });
      setText(res.data.text);
    } catch (err) {
      console.error(err);
      const msg = err.response && err.response.data ? err.response.data : "Failed to enhance post.";
      alert(msg);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="comment-form-container glass-panel">
      <h3 className="text-primary" style={{ marginBottom: '1rem' }}>Create a Post</h3>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="3"
          placeholder="What's on your mind?"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <input type="submit" className="btn btn-primary" value="Post" style={{ margin: 0 }} />
          <button 
            type="button" 
            className="btn btn-dark" 
            onClick={enhancePost}
            disabled={isEnhancing}
            style={{ margin: 0, padding: '0.6rem 1rem' }}
          >
            <i className="fas fa-magic"></i> {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
          </button>
        </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
