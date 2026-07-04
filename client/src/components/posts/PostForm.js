import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const user = useSelector(state => state.auth.user);

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
    <div className="glass-card rounded-xl p-md mb-md border-white/5 shadow-lg">
      <div className="flex gap-sm items-start">
        <img 
          src={user?.avatar || "https://via.placeholder.com/200"} 
          alt="Current User Avatar" 
          className="w-12 h-12 rounded-full border border-white/10 object-cover shrink-0" 
        />
        <div className="w-full">
          <form
            onSubmit={e => {
              e.preventDefault();
              addPost({ text });
              setText('');
            }}
          >
            <textarea
              name="text"
              className="bg-surface-container-low border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 w-full rounded-lg p-3 text-on-surface placeholder-on-surface-variant/50 placeholder:text-sm placeholder:font-light resize-none min-h-[100px] font-sans text-input transition-all outline-none"
              placeholder="Share your latest architectural musings..."
              value={text}
              onChange={e => setText(e.target.value)}
              required
            ></textarea>
            
            <div className="flex justify-between items-center mt-sm pt-sm border-t border-white/5">
              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={enhancePost}
                  disabled={isEnhancing}
                  className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30 rounded-full px-3 py-1 font-sans text-caption uppercase text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[14px]">magic_button</span>
                  {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
                </button>
              </div>
              <button 
                type="submit"
                className="bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary-fixed px-5 py-2 rounded-lg font-medium shadow-[0_0_10px_rgba(16,185,129,0.2)] hover:shadow-[0_0_15px_rgba(78,222,163,0.4)] transition-all text-sm"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
