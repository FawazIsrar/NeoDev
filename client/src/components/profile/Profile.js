import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layouts/Spinner';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  const { id } = useParams();

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user !== null &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}

          <div className="profile-grid my-1">
            <div className="profile-top glass-panel p-2">
              <img
                className="round-img my-1"
                src={profile.user.avatar}
                alt=""
              />
              <h1 className="large">{profile.user.name}</h1>
              <p className="lead">
                {profile.status} {profile.company && <span> at {profile.company}</span>}
              </p>
              <p>{profile.location && <span>{profile.location}</span>}</p>
            </div>

            <div className="profile-about glass-panel p-2">
              {profile.bio && (
                <Fragment>
                  <h2 className="text-primary">{profile.user.name.trim().split(' ')[0]}s Bio</h2>
                  <p>{profile.bio}</p>
                  <div className="line" />
                </Fragment>
              )}
              <h2 className="text-primary">Skill Set</h2>
              <div className="skills">
                {profile.skills.map((skill, index) => (
                  <div key={index} className="p-1">
                    <i className="fas fa-check" /> {skill}
                  </div>
                ))}
              </div>
            </div>

            <div className="profile-exp glass-panel p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience && profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(exp => (
                    <ProfileExperience key={exp._id} exp={exp} />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu glass-panel p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education && profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(edu => (
                    <ProfileEducation key={edu._id} edu={edu} />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
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
