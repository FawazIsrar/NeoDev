import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  const user = useSelector(state => state.auth.user);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-surface/80 backdrop-blur-md border-t border-white/10 py-4 z-40">
      <div className="max-w-[1024px] mx-auto px-margin-mobile md:px-margin-desktop flex gap-4 items-end">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 shrink-0 hidden md:block">
          <img 
            className="w-full h-full object-cover" 
            src={user?.avatar || "https://via.placeholder.com/150"} 
            alt="User Avatar" 
          />
        </div>
        
        <form 
          className="relative w-full"
          onSubmit={e => {
            e.preventDefault();
            addComment(postId, { text });
            setText('');
          }}
        >
          <textarea
            name="text"
            className="bg-surface-container-low border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 w-full rounded-lg px-4 py-3 min-h-[50px] max-h-[150px] resize-y font-sans text-input text-on-surface outline-none"
            placeholder="Contribute to the discussion..."
            rows="1"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          ></textarea>
          
          <div className="absolute right-2 bottom-2 flex gap-2">
            <button 
              type="button"
              className="p-2 text-tertiary hover:text-primary transition-colors rounded-md hover:bg-white/5"
            >
              <span className="material-symbols-outlined text-[20px]">code</span>
            </button>
            <button 
              type="submit"
              className="bg-primary text-on-primary hover:bg-primary-fixed-dim px-4 py-1.5 rounded-md font-sans text-body-sm font-bold flex items-center gap-2 transition-colors"
            >
              Send <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(null, { addComment })(CommentForm);
