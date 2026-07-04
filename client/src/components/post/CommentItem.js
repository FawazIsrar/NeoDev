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
  <div className="flex gap-4">
    <Link to={`/profile/${user}`} className="shrink-0">
      <img 
        className="w-10 h-10 rounded-full border border-white/10 object-cover hover:border-primary/50 transition-colors" 
        src={avatar || "https://via.placeholder.com/150"} 
        alt={name} 
      />
    </Link>
    
    <div className="glass-card rounded-lg rounded-tl-none p-4 w-full relative group hover:border-white/20 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <Link to={`/profile/${user}`}>
            <span className="font-sans text-body-sm font-bold text-on-surface hover:text-primary transition-colors mr-2">{name}</span>
          </Link>
          <span className="font-sans text-body-sm text-tertiary">
            <Moment format="YYYY/MM/DD hh:mm A">{date}</Moment>
          </span>
        </div>
        
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deleteComment(postId, _id)}
            className="text-on-surface-variant hover:text-error transition-colors p-1 rounded hover:bg-error/10 opacity-0 group-hover:opacity-100"
            title="Delete Comment"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        )}
      </div>
      
      <p className="font-sans text-body text-on-surface-variant whitespace-pre-wrap">
        {text}
      </p>
      
      <div className="flex gap-4 mt-3">
        <button className="text-tertiary hover:text-primary font-sans text-body-sm flex items-center gap-1 transition-colors">
          <span className="material-symbols-outlined text-[16px]">keyboard_arrow_up</span> 
        </button>
        <button className="text-tertiary hover:text-on-surface font-sans text-body-sm flex items-center gap-1 transition-colors">
          Reply
        </button>
      </div>
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
