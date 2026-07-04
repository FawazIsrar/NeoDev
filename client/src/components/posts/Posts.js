import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculate top contributors
  const contributorMap = {};
  posts.forEach(post => {
    if (!contributorMap[post.user]) {
      contributorMap[post.user] = {
        _id: post.user,
        name: post.name,
        avatar: post.avatar,
        points: 0
      };
    }
    contributorMap[post.user].points += 10; // 10 points for a post
    contributorMap[post.user].points += (post.likes?.length || 0) * 2; // 2 points per like

    post.comments?.forEach(comment => {
      if (!contributorMap[comment.user]) {
        contributorMap[comment.user] = {
          _id: comment.user,
          name: comment.name,
          avatar: comment.avatar,
          points: 0
        };
      }
      contributorMap[comment.user].points += 5; // 5 points for a comment
    });
  });

  const topContributors = Object.values(contributorMap)
    .sort((a, b) => b.points - a.points)
    .slice(0, 5);

  return (
    <main className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter mt-sm pt-28 pb-xl min-h-[calc(100vh-80px)] relative z-10">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-container/20 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container/10 blur-[150px] pointer-events-none z-0"></div>

      {/* Left Sidebar (Trending Tags) */}
      <aside className="hidden md:block md:col-span-3">
        <div className="glass-card rounded-xl p-md sticky top-28">
          <h3 className="font-sans text-card-title text-on-surface mb-md">Trending Tags</h3>
          <div className="flex flex-wrap gap-xs">
            <span className="bg-secondary-container/20 text-secondary-fixed border border-secondary-container rounded-full px-3 py-1 text-xs font-code">#TypeScript</span>
            <span className="bg-primary-container/20 text-primary-fixed border border-primary-container rounded-full px-3 py-1 text-xs font-code">#RustLang</span>
            <span className="bg-secondary-container/20 text-secondary-fixed border border-secondary-container rounded-full px-3 py-1 text-xs font-code">#WebGL</span>
            <span className="bg-primary-container/20 text-primary-fixed border border-primary-container rounded-full px-3 py-1 text-xs font-code">#SystemDesign</span>
          </div>
        </div>
      </aside>

      {/* Feed Column */}
      <section className="col-span-1 md:col-span-6 flex flex-col gap-md">
        <div className="mb-2">
          <h1 className="font-sans text-page-title text-on-surface mb-1">Community Feed</h1>
          <p className="font-sans text-body text-on-surface-variant">Welcome to the community</p>
        </div>

        {/* Create Post Input */}
        <PostForm />

        {/* Posts List */}
        <div className="flex flex-col gap-md">
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </section>

      {/* Right Sidebar (Top Contributors) */}
      <aside className="hidden lg:block lg:col-span-3">
        <div className="glass-card rounded-xl p-md sticky top-28 flex flex-col gap-md">
          <h3 className="font-sans text-card-title text-on-surface">Top Contributors</h3>
          
          {topContributors.length > 0 ? (
            topContributors.map((user, index) => (
              <div key={user._id || index} className="flex items-center justify-between">
                <Link to={`/profile/${user._id}`} className="flex items-center gap-2 group">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-white/10 object-cover group-hover:border-primary transition-colors" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-xs group-hover:border-primary transition-colors">
                      {user.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">{user.name}</p>
                    <p className="text-xs text-primary">{user.points} pts</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-sm text-on-surface-variant">No contributors yet.</p>
          )}
        </div>
      </aside>

    </main>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
