import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger', 3000);
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <main className="relative z-10 w-full flex flex-col items-center justify-center min-h-[calc(100vh-160px)] pt-28 pb-xl">
      {/* Background Orbs */}
      <div className="absolute w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(78,222,163,0.05)_0%,rgba(5,20,36,0)_70%)] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none"></div>
      <div className="absolute w-[40vw] h-[40vw] bg-[radial-gradient(circle,rgba(192,193,255,0.03)_0%,rgba(5,20,36,0)_70%)] rounded-full top-[20%] right-[10%] -z-10 pointer-events-none"></div>

      {/* Glassmorphism Register Card */}
      <div className="w-full max-w-[500px] bg-surface/30 backdrop-blur-[40px] border border-white/10 rounded-xl shadow-[0_8px_32px_0_rgba(99,102,241,0.15)] p-lg relative overflow-hidden my-8">
        {/* Subtle inner top edge glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        {/* Header */}
        <div className="text-center mb-lg">
          <h1 className="font-sans text-hero text-primary font-bold tracking-tight mb-xs">Join NeoDev</h1>
          <p className="font-sans text-body text-on-surface-variant">Create your developer profile.</p>
        </div>
        
        {/* Form */}
        <form className="flex flex-col gap-md" onSubmit={onSubmit}>
          
          {/* Name Field */}
          <div className="flex flex-col gap-xs relative group">
            <label className="sr-only" htmlFor="name">Full Name</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-sm text-outline-variant group-focus-within:text-primary transition-colors">person</span>
              <input 
                className="w-full h-[52px] bg-surface-dim/80 border border-white/5 rounded-lg pl-[48px] pr-sm font-sans text-input text-on-surface placeholder:text-outline-variant placeholder:text-sm placeholder:font-light focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner" 
                id="name" 
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Full Name" 
                type="text" 
                required 
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-xs relative group">
            <label className="sr-only" htmlFor="email">Email Address</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-sm text-outline-variant group-focus-within:text-primary transition-colors">mail</span>
              <input 
                className="w-full h-[52px] bg-surface-dim/80 border border-white/5 rounded-lg pl-[48px] pr-sm font-sans text-input text-on-surface placeholder:text-outline-variant placeholder:text-sm placeholder:font-light focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner" 
                id="email" 
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email Address" 
                type="email" 
                required 
              />
            </div>
            <p className="font-sans text-body-sm text-tertiary px-1">This site uses Gravatar for profile images.</p>
          </div>
          
          {/* Password Field */}
          <div className="flex flex-col gap-xs relative group">
            <label className="sr-only" htmlFor="password">Password</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-sm text-outline-variant group-focus-within:text-primary transition-colors">lock</span>
              <input 
                className="w-full h-[52px] bg-surface-dim/80 border border-white/5 rounded-lg pl-[48px] pr-sm font-sans text-input text-on-surface placeholder:text-outline-variant placeholder:text-sm placeholder:font-light focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner" 
                id="password" 
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password" 
                type="password" 
                minLength="6"
                required 
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-xs relative group">
            <label className="sr-only" htmlFor="password2">Confirm Password</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-sm text-outline-variant group-focus-within:text-primary transition-colors">lock_reset</span>
              <input 
                className="w-full h-[52px] bg-surface-dim/80 border border-white/5 rounded-lg pl-[48px] pr-sm font-sans text-input text-on-surface placeholder:text-outline-variant placeholder:text-sm placeholder:font-light focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner" 
                id="password2" 
                name="password2"
                value={password2}
                onChange={onChange}
                placeholder="Confirm Password" 
                type="password" 
                minLength="6"
                required 
              />
            </div>
          </div>
          
          {/* Actions */}
          <div className="mt-xs">
            <button 
              className="w-full h-[52px] bg-primary text-on-primary rounded-lg font-sans text-button uppercase tracking-wider hover:bg-primary-fixed transition-all duration-300 shadow-[0_0_15px_rgba(78,222,163,0.15)] hover:shadow-[0_0_25px_rgba(78,222,163,0.3)] active:scale-[0.98] flex items-center justify-center gap-xs" type="submit"
            >
              Sign Up
              <span className="material-symbols-outlined text-[18px]">person_add</span>
            </button>
          </div>
        </form>
        
        {/* Footer Links */}
        <div className="mt-lg pt-md border-t border-white/5 flex flex-col items-center gap-xs">
          <p className="font-sans text-body-sm text-on-surface-variant">
            Already have an account? 
            <Link className="text-primary hover:text-primary-fixed transition-colors font-medium ml-1" to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
