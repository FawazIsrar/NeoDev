import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { getCurrentProfile, deleteAccount, uploadAvatar } from '../actions/profile';
import Spinner from './layouts/Spinner';
import Experience from './dashboard/Experience';
import Education from './dashboard/Education';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { profile, loading } = useSelector(state => state.profile);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;
        
        let width = img.width;
        let height = img.height;
        
        let offsetX = 0;
        let offsetY = 0;
        const minDim = Math.min(width, height);
        
        if (width > height) {
          offsetX = (width - height) / 2;
          width = minDim;
        } else {
          offsetY = (height - width) / 2;
          height = minDim;
        }

        canvas.width = MAX_WIDTH;
        canvas.height = MAX_HEIGHT;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, offsetX, offsetY, minDim, minDim, 0, 0, MAX_WIDTH, MAX_HEIGHT);

        const base64Image = canvas.toDataURL('image/jpeg', 0.8);
        dispatch(uploadAvatar(base64Image));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  if (loading && !profile) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter mt-28 mb-xl">
      {/* Left Column: User Profile Card & Actions */}
      <div className="md:col-span-4 flex flex-col gap-md">
        {/* Profile Card */}
        <div className="glass-card rounded-xl p-md flex flex-col items-center text-center transition-all duration-300">
          <div className="relative mb-sm cursor-pointer group" onClick={() => fileInputRef.current.click()} title="Click to change avatar">
            <img 
              className="w-32 h-32 rounded-full object-cover border-2 border-primary/30 p-1" 
              src={user && user.avatar ? user.avatar : "https://via.placeholder.com/200"} 
              alt="Avatar" 
            />
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-white">camera_alt</span>
            </div>
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-primary rounded-full border-2 border-surface"></div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
          
          <h1 className="font-sans text-section-heading text-on-surface mb-1">
            {user && user.name}
          </h1>
          
          {profile ? (
            <>
              <p className="font-code text-body-sm text-primary mb-md">{profile.status} {profile.company && `at ${profile.company}`}</p>
              {profile.bio && (
                <p className="font-sans text-body-sm text-on-surface-variant mb-md text-left w-full border-t border-white/5 pt-sm">
                  {profile.bio}
                </p>
              )}
              {profile.skills && (
                <div className="w-full border-t border-white/5 pt-sm">
                  <div className="flex flex-wrap gap-xs justify-center">
                    {profile.skills.slice(0, 5).map((skill, index) => (
                      <span key={index} className="px-3 py-1 rounded-full bg-primary/20 text-primary font-code text-body-sm text-xs border border-primary/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="font-sans text-body-sm text-on-surface-variant mb-md">
              You have not yet set up a profile.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-sm">
          {profile ? (
            <>
              <Link to="/edit-profile" className="w-full py-3 rounded-lg bg-primary text-on-primary font-sans text-caption uppercase tracking-wider hover:bg-primary-fixed transition-colors shadow-[0_0_15px_rgba(78,222,163,0.3)] hover:shadow-[0_0_25px_rgba(78,222,163,0.5)] flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">edit</span> Edit Profile
              </Link>
              <Link to="/add-education" className="w-full py-3 rounded-lg glass-card text-on-surface font-sans text-caption uppercase tracking-wider hover:border-white/30 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">school</span> Add Education
              </Link>
              <Link to="/add-experience" className="w-full py-3 rounded-lg glass-card text-on-surface font-sans text-caption uppercase tracking-wider hover:border-white/30 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">work</span> Add Experience
              </Link>
            </>
          ) : (
            <Link to="/create-profile" className="w-full py-3 rounded-lg bg-primary text-on-primary font-sans text-caption uppercase tracking-wider hover:bg-primary-fixed transition-colors shadow-[0_0_15px_rgba(78,222,163,0.3)] hover:shadow-[0_0_25px_rgba(78,222,163,0.5)] flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">add_circle</span> Create Profile
            </Link>
          )}
          
          <button onClick={() => dispatch(deleteAccount())} className="w-full py-3 mt-md rounded-lg border border-error/30 text-error font-sans text-caption uppercase tracking-wider hover:bg-error/10 transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">delete</span> Delete Account
          </button>
        </div>
      </div>

      {/* Right Column: Main Content Area */}
      <div className="md:col-span-8 flex flex-col gap-gutter">


        {/* Experience and Education (Replacing Recent Contributions) */}
        {profile && (
          <div className="flex flex-col gap-gutter">
            {profile.experience && profile.experience.length > 0 && (
              <div className="glass-card rounded-xl p-md hover:border-white/30 transition-all">
                <Experience experience={profile.experience} />
              </div>
            )}
            
            {profile.education && profile.education.length > 0 && (
              <div className="glass-card rounded-xl p-md hover:border-white/30 transition-all">
                <Education education={profile.education} />
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
};

export default Dashboard;
