import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [activeFilter, setActiveFilter] = useState('All Developers');

  const categories = {
    'All Developers': [],
    'Frontend': ['frontend', 'html', 'css', 'javascript', 'react', 'vue', 'angular', 'svelte', 'tailwind', 'bootstrap', 'ui', 'ux', 'nextjs', 'next.js'],
    'Backend': ['backend', 'node', 'express', 'python', 'django', 'flask', 'java', 'spring', 'php', 'laravel', 'c#', 'dotnet', 'ruby', 'go', 'sql', 'mongodb', 'api', 'database', 'postgres', 'mysql'],
    'Fullstack': ['fullstack', 'full-stack', 'mern', 'mean', 'full stack'],
    'Web3': ['web3', 'solidity', 'blockchain', 'ethereum', 'smart contract', 'rust', 'crypto', 'nft', 'dapp', 'web 3']
  };

  const getFilteredProfiles = () => {
    if (activeFilter === 'All Developers') return profiles;
    
    return profiles.filter(profile => {
      const profileSkills = profile.skills.map(s => s.toLowerCase());
      const profileStatus = profile.status.toLowerCase();
      
      const filterKeywords = categories[activeFilter];
      
      // Check if any filter keyword is included in skills or status
      const matchesSkill = profileSkills.some(skill => 
        filterKeywords.some(keyword => skill.includes(keyword))
      );
      
      const matchesStatus = filterKeywords.some(keyword => profileStatus.includes(keyword));
      
      // For Fullstack, also check if they have both frontend and backend skills
      if (activeFilter === 'Fullstack') {
         if (matchesSkill || matchesStatus) return true;
         
         const hasFrontend = profileSkills.some(skill => categories['Frontend'].some(keyword => skill.includes(keyword)));
         const hasBackend = profileSkills.some(skill => categories['Backend'].some(keyword => skill.includes(keyword)));
         return hasFrontend && hasBackend;
      }
      
      return matchesSkill || matchesStatus;
    });
  };

  const filteredProfiles = getFilteredProfiles();
  const filterOptions = Object.keys(categories);

  return (
    <main className="flex-grow pt-32 pb-xl px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto w-full min-h-[calc(100vh-80px)]">
      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <div className="mb-lg">
            <h1 className="font-sans text-hero text-on-surface mb-sm">Developers</h1>
            <p className="font-sans text-body text-on-surface-variant max-w-2xl">
              Connect with top-tier engineering talent. Filter by stack, experience, and availability to find the perfect addition to your team.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-xs mb-lg">
            {filterOptions.map(option => (
              <button 
                key={option}
                onClick={() => setActiveFilter(option)}
                className={`glass-card px-4 py-2 rounded-full font-sans text-caption uppercase tracking-wider transition-colors ${
                  activeFilter === option 
                    ? 'text-primary border-primary/50 bg-primary/10' 
                    : 'text-on-surface-variant border-white/5 hover:text-on-surface hover:bg-white/5'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Developer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4 className="text-on-surface-variant col-span-full">No profiles found for this category...</h4>
            )}
          </div>
        </Fragment>
      )}
    </main>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
