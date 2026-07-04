import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-surface-container-highest border-t border-white/10 py-12 mt-auto">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="font-sans text-section-heading font-bold text-primary tracking-tight block mb-4">
            NeoDev
          </Link>
          <p className="font-sans text-body-sm text-on-surface-variant leading-relaxed">
            The ultimate community platform for developers to connect, share ideas, and showcase their portfolio.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="col-span-1">
          <h4 className="font-sans font-semibold text-on-surface mb-4 uppercase tracking-wider text-xs">Community</h4>
          <ul className="flex flex-col gap-2 font-sans text-body-sm text-on-surface-variant">
            <li><Link to="/profiles" className="hover:text-primary transition-colors">Developers</Link></li>
            <li><Link to="/posts" className="hover:text-primary transition-colors">Discussions</Link></li>
            <li><Link to="/register" className="hover:text-primary transition-colors">Join Now</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="col-span-1">
          <h4 className="font-sans font-semibold text-on-surface mb-4 uppercase tracking-wider text-xs">Resources</h4>
          <ul className="flex flex-col gap-2 font-sans text-body-sm text-on-surface-variant">
            <li><Link to="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
            <li><Link to="/api" className="hover:text-primary transition-colors">API Reference</Link></li>
            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="col-span-1">
          <h4 className="font-sans font-semibold text-on-surface mb-4 uppercase tracking-wider text-xs">Connect</h4>
          <div className="flex gap-4">
            <a href="https://x.com/KhaggaFawa53859" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://github.com/FawazIsrar/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://discord.gg/ebsjeENE7" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary transition-all">
              <i className="fab fa-discord"></i>
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-caption text-on-surface-variant">
          &copy; {new Date().getFullYear()} NeoDev. All rights reserved.
        </p>
        <div className="flex items-center gap-2 font-code text-xs text-on-surface-variant">
          Built with <span className="text-error material-symbols-outlined text-[14px]">favorite</span> by Fawaz Israr
        </div>
      </div>
    </footer>
  );
};

export default Footer;
