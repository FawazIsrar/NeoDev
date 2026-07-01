import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { getCurrentProfile, deleteAccount, uploadAvatar } from '../actions/profile';
import Spinner from './layouts/Spinner';
import DashboardActions from './dashboard/DashboardActions';
import Experience from './dashboard/Experience';
import Education from './dashboard/Education';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { profile, loading } = useSelector(state => state.profile);
  const fileInputRef = useRef(null);

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
        
        // Ensure square cropping for avatars
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
        // Draw the center square portion of the image onto the 200x200 canvas
        ctx.drawImage(img, offsetX, offsetY, minDim, minDim, 0, 0, MAX_WIDTH, MAX_HEIGHT);

        const base64Image = canvas.toDataURL('image/jpeg', 0.8);
        dispatch(uploadAvatar(base64Image));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  // Show loading spinner while profile is being fetched
  if (loading && !profile) {
    return <Spinner />;
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '1rem' }}>
          {user && user.avatar && (
            <div 
              style={{ position: 'relative', cursor: 'pointer' }} 
              onClick={() => fileInputRef.current.click()}
              title="Click to change avatar"
              className="avatar-container"
            >
              <img 
                src={user.avatar} 
                alt="avatar" 
                className="round-img" 
                style={{ width: '80px', height: '80px', border: '3px solid var(--primary-color)' }} 
              />
              <div style={{
                position: 'absolute', bottom: '0', right: '0', 
                background: 'var(--primary-color)', color: '#fff', 
                borderRadius: '50%', width: '25px', height: '25px', 
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
              }}>
                <i className="fas fa-camera" style={{ fontSize: '12px' }}></i>
              </div>
            </div>
          )}
          <div>
            <h1 className="large text-primary" style={{ marginBottom: '0' }}>Dashboard</h1>
            <p className="lead" style={{ margin: '0' }}>
              Welcome {user && user.name}
            </p>
          </div>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*" 
          onChange={handleImageUpload} 
        />
        <DashboardActions />
      </div>

      <div className="dashboard-content">
        {profile !== null ? (
          <div className="profile-status">
            <h2 className="text-success">
              <i className="fas fa-check-circle"></i> You have a profile
            </h2>
            <p>You have successfully set up your developer profile.</p>

            {profile.experience && profile.experience.length > 0 && (
              <Experience experience={profile.experience} />
            )}
            {profile.education && profile.education.length > 0 && (
              <Education education={profile.education} />
            )}

            <div className="my-2">
              <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
                <i className="fas fa-user-minus"></i> Delete My Account
              </button>
            </div>
          </div>
        ) : (
          <div className="no-profile">
            <h2 className="text-warning">
              <i className="fas fa-exclamation-triangle"></i> No Profile Found
            </h2>
            <p>You have not yet set up a profile. Please add some info to get started.</p>
            <Link to="/create-profile" className="btn btn-primary">
              <i className="fas fa-plus"></i> Create Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
