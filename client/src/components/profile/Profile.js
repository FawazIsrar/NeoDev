import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  const { id } = useParams();

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  if (profile === null || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="flex-grow pt-[104px] pb-xl px-margin-mobile md:px-margin-desktop w-full max-w-[1440px] mx-auto flex flex-col gap-gutter min-h-[calc(100vh-80px)] relative z-10">
      
      {/* Action Buttons Top */}
      <div className="flex justify-between items-center mb-sm">
        <Link to="/profiles" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-sans text-body group">
          <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back to Developers
        </Link>
        {auth.isAuthenticated && auth.loading === false && auth.user !== null && auth.user._id === profile.user._id && (
          <Link to="/edit-profile" className="inline-flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary-fixed border border-primary/30 px-4 py-2 rounded-lg font-sans text-body-sm transition-all shadow-[0_0_15px_rgba(78,222,163,0.15)]">
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Edit Profile
          </Link>
        )}
      </div>

      {/* Hero Section */}
      <section className="glass-card rounded-xl overflow-hidden flex flex-col relative w-full mb-md transition-all duration-500 border-white/5">
        {/* Cover Image (Placeholder with gradient) */}
        <div className="h-48 md:h-64 w-full bg-surface-container-high relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/5">
          <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent"></div>
        </div>

        {/* Profile Info Overlay */}
        <div className="relative px-md md:px-xl pb-lg -mt-16 sm:-mt-24 z-10 flex flex-col items-center text-center gap-xs">
          {/* Avatar */}
          <div className="relative shrink-0 mb-2">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-surface border border-white/10 shadow-[0_0_40px_rgba(78,222,163,0.2)]">
              <img 
                src={profile.user.avatar} 
                alt={profile.user.name} 
                className="w-full h-full rounded-full object-cover" 
              />
            </div>
            {/* Status Indicator */}
            <div className="absolute bottom-2 right-2 w-5 h-5 bg-primary rounded-full border-4 border-surface shadow-[0_0_10px_rgba(78,222,163,0.8)]"></div>
          </div>

          {/* Text */}
          <div className="flex flex-col items-center">
            <h1 className="font-sans text-hero text-on-surface mb-1">{profile.user.name}</h1>
            <p className="font-sans text-body text-primary font-code">
              {profile.status} {profile.company && <span className="text-on-surface-variant">@ {profile.company}</span>}
            </p>
            {profile.location && (
              <div className="flex items-center justify-center gap-1 text-on-surface-variant mt-1">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                <span className="font-sans text-body-sm">{profile.location}</span>
              </div>
            )}
            
            {/* Socials */}
            <div className="flex justify-center gap-sm mt-3">
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors text-xl" title="Website">
                  <i className="fas fa-globe"></i>
                </a>
              )}
              {profile.social?.twitter && (
                <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-[#1DA1F2] transition-colors text-xl" title="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {profile.social?.facebook && (
                <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-[#1877F2] transition-colors text-xl" title="Facebook">
                  <i className="fab fa-facebook"></i>
                </a>
              )}
              {profile.social?.linkedin && (
                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-[#0A66C2] transition-colors text-xl" title="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {profile.social?.youtube && (
                <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-[#FF0000] transition-colors text-xl" title="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              )}
              {profile.social?.instagram && (
                <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-[#E4405F] transition-colors text-xl" title="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        {/* Left Column */}
        <div className="md:col-span-4 flex flex-col gap-gutter">
          
          {/* Bio Card */}
          {profile.bio && (
            <div className="glass-card rounded-xl p-md transition-all duration-300 hover:border-white/20">
              <div className="flex items-center gap-xs mb-sm">
                <span className="material-symbols-outlined text-tertiary">info</span>
                <h2 className="font-sans text-card-title text-on-surface">About</h2>
              </div>
              <p className="font-sans text-body text-on-surface-variant leading-relaxed">
                {profile.bio}
              </p>
            </div>
          )}

          {/* Skills Card */}
          <div className="glass-card rounded-xl p-md transition-all duration-300 hover:border-white/20">
            <div className="flex items-center gap-xs mb-md">
              <span className="material-symbols-outlined text-secondary">terminal</span>
              <h2 className="font-sans text-card-title text-on-surface">Tech Stack</h2>
            </div>
            <div className="flex flex-wrap gap-xs">
              {profile.skills.map((skill, index) => (
                <span key={index} className="font-code text-body-sm px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-8 flex flex-col gap-gutter">
          
          {/* Experience Card */}
          <div className="glass-card rounded-xl p-md transition-all duration-300 hover:border-white/20">
            <div className="flex items-center gap-xs mb-lg">
              <span className="material-symbols-outlined text-primary">work_history</span>
              <h2 className="font-sans text-card-title text-on-surface">Experience</h2>
            </div>
            
            {profile.experience && profile.experience.length > 0 ? (
              <div className="flex flex-col gap-md">
                {profile.experience.map(exp => (
                  <ProfileExperience key={exp._id} exp={exp} />
                ))}
              </div>
            ) : (
              <h4 className="text-on-surface-variant font-sans text-body-sm">No experience credentials</h4>
            )}
          </div>

          {/* Education Card */}
          <div className="glass-card rounded-xl p-md transition-all duration-300 hover:border-white/20">
            <div className="flex items-center gap-xs mb-lg">
              <span className="material-symbols-outlined text-tertiary">school</span>
              <h2 className="font-sans text-card-title text-on-surface">Education</h2>
            </div>
            
            {profile.education && profile.education.length > 0 ? (
              <div className="flex flex-col gap-md">
                {profile.education.map(edu => (
                  <ProfileEducation key={edu._id} edu={edu} />
                ))}
              </div>
            ) : (
              <h4 className="text-on-surface-variant font-sans text-body-sm">No education credentials</h4>
            )}
          </div>

          {/* Github Repos */}
          {profile.githubusername && (
            <ProfileGithub username={profile.githubusername} />
          )}

        </div>
      </div>
    </main>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
