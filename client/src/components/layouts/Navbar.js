import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path ? 
    "text-primary dark:text-primary-fixed-dim border-b-2 border-primary pb-1 active:scale-95 transition-transform" : 
    "text-on-surface-variant dark:text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all duration-300 px-3 py-1 rounded-md active:scale-95";

  const authLinks = (
    <Fragment>
      <div className="hidden md:flex items-center gap-md font-sans text-nav">
        <Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link>
        <Link to="/posts" className={isActive("/posts")}>Posts</Link>
        <Link to="/profiles" className={isActive("/profiles")}>Developers</Link>
      </div>
      <div className="flex items-center gap-md ml-lg">
        <button onClick={logout} className="font-sans text-caption uppercase tracking-wider text-primary border border-primary/30 px-sm py-2 rounded-full hover:bg-primary/10 transition-colors">
          Logout
        </button>
        {user && user.avatar && (
          <img alt="User Avatar" className="w-10 h-10 rounded-full border border-white/10 object-cover" src={user.avatar} />
        )}
      </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <div className="hidden md:flex items-center gap-md font-sans text-nav">
        <Link to="/" className={isActive("/")}>Home</Link>
        <Link to="/profiles" className={isActive("/profiles")}>Developers</Link>
      </div>
      <div className="flex items-center gap-md ml-lg">
        <Link to="/login" className="font-sans text-caption uppercase tracking-wider text-on-surface-variant border border-white/10 px-sm py-2 rounded-full hover:bg-white/5 transition-colors">
          Login
        </Link>
        <Link to="/register" className="font-sans text-caption uppercase tracking-wider bg-primary text-on-primary px-sm py-2 rounded-full hover:bg-primary/90 transition-colors">
          Register
        </Link>
      </div>
    </Fragment>
  );

  return (
    <nav className="bg-surface/30 dark:bg-surface/30 backdrop-blur-md fixed top-0 w-full z-50 border-b border-white/10 shadow-[0_8px_32px_0_rgba(99,102,241,0.15)]">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 w-full max-w-[1440px] mx-auto">
        {/* Brand */}
        <Link to="/" className="font-sans text-page-title font-bold text-primary dark:text-primary-fixed-dim tracking-tight">
          NeoDev
        </Link>



        {/* Navigation Links and Trailing Action */}
        {!loading && (isAuthenticated ? authLinks : guestLinks)}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
