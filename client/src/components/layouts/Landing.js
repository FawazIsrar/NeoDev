import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  // If user is logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="flex-1 flex items-center justify-center relative z-10 px-margin-mobile md:px-margin-desktop mt-20 min-h-[calc(100vh-80px)]">
      {/* Hero Glassmorphism Card */}
      <div className="glass-card rounded-xl p-lg md:p-xl max-w-2xl w-full text-center shadow-[0_0_60px_-15px_rgba(78,222,163,0.15)] border-t-white/20 border-l-white/20">
        <h1 className="font-sans text-hero text-on-background mb-md">
          Welcome to <span className="text-primary">NeoDev</span>
        </h1>
        <p className="font-sans text-body text-tertiary mb-lg max-w-lg mx-auto">
          Create a developer profile/portfolio, share posts and get help from other developers. Built for the future of code.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-sm">
          <Link to="/register" className="glow-button font-sans text-caption uppercase tracking-wider bg-transparent border border-primary text-primary px-xl py-3 rounded-full hover:bg-primary/5 w-full sm:w-auto">
            Sign Up
          </Link>
          <Link to="/login" className="font-sans text-caption uppercase tracking-wider bg-surface-variant text-on-surface px-xl py-3 rounded-full hover:bg-surface-variant/80 transition-colors border border-white/10 w-full sm:w-auto">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Landing;
