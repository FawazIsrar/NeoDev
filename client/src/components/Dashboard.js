import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from '../actions/profile';
import Spinner from './layouts/Spinner';
import DashboardActions from './dashboard/DashboardActions';
import Experience from './dashboard/Experience';
import Education from './dashboard/Education';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { profile, loading } = useSelector(state => state.profile);

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
      <div className="dashboard-header">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
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
