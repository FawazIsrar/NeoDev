import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getPost } from '../../actions/post';

const Post = ({ getPost, post: { post, loading } }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  if (loading || post === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="flex-grow pt-32 pb-xl px-margin-mobile md:px-margin-desktop max-w-[1024px] mx-auto w-full flex flex-col gap-lg min-h-[calc(100vh-80px)] relative z-10">
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-container/20 blur-[120px] pointer-events-none z-0"></div>
      
      {/* Back Action */}
      <div className="flex items-center gap-sm relative z-10">
        <Link to="/posts" className="bg-white/5 border border-white/10 p-2 rounded-full flex items-center justify-center hover:text-primary hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </Link>
        <span className="font-sans text-body-sm text-tertiary">Back to Feed</span>
      </div>

      {/* Main Post */}
      <div className="relative z-10">
        <PostItem post={post} showActions={false} />
      </div>

      {/* Comments Section */}
      <section className="flex flex-col gap-md relative z-10">
        <h2 className="font-sans text-section-heading font-bold text-on-surface border-b border-white/10 pb-2">Discussion</h2>
        
        {/* Comment Thread */}
        <div className="flex flex-col gap-6 mb-24">
          {post.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
          ))}
        </div>
      </section>

      {/* Sticky Add Comment Input */}
      <CommentForm postId={post._id} />
      
    </main>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
