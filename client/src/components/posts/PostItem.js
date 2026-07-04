import React from 'react';
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
  <article className="glass-card rounded-xl p-md flex flex-col gap-sm border-white/5 transition-all duration-300 hover:border-white/20">
    {/* Author Header */}
    <div className="flex justify-between items-center">
      <Link to={`/profile/${user}`} className="flex items-center gap-3 group">
        <img 
          className="w-10 h-10 rounded-full border border-white/10 object-cover group-hover:border-primary/50 transition-colors" 
          src={avatar || "https://via.placeholder.com/150"} 
          alt={name} 
        />
        <div>
          <h4 className="font-bold text-on-surface group-hover:text-primary-fixed-dim transition-colors">{name}</h4>
          <p className="text-xs text-on-surface-variant font-code">
            <Moment format="YYYY/MM/DD hh:mm A">{date}</Moment>
          </p>
        </div>
      </Link>
      
      {!auth.loading && auth.user && user === auth.user._id && (
        <button
          onClick={() => deletePost(_id)}
          className="text-on-surface-variant hover:text-error transition-colors p-2 rounded-full hover:bg-error/10"
          title="Delete Post"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      )}
    </div>

    {/* Content */}
    <div className="text-on-surface font-sans text-body mt-2">
      <p className="whitespace-pre-wrap">{text}</p>
    </div>

    {/* Actions */}
    <div className="flex items-center gap-md mt-2 pt-3 border-t border-white/5">
      <button 
        onClick={() => addLike(_id)}
        className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors group"
      >
        <span className="material-symbols-outlined text-[20px] group-hover:fill-current">thumb_up</span>
        {likes.length > 0 && <span className="text-sm font-medium">{likes.length}</span>}
      </button>
      
      <button 
        onClick={() => removeLike(_id)}
        className="flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors"
      >
        <span className="material-symbols-outlined text-[20px]">thumb_down</span>
      </button>

      {showActions && (
        <Link 
          to={`/posts/${_id}`} 
          className="flex items-center gap-1 text-on-surface-variant hover:text-secondary transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
          {comments.length > 0 && <span className="text-sm font-medium">{comments.length}</span>}
        </Link>
      )}
    </div>
  </article>
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

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);
