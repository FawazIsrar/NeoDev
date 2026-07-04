import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
  exp: { company, title, current, to, from, description }
}) => (
  <div className="flex gap-md relative">
    {/* Timeline line (hidden on the last item via CSS if desired, but we can just show it) */}
    <div className="absolute left-6 top-12 bottom-[-24px] w-px bg-white/10"></div>
    
    <div className="w-12 h-12 rounded-lg bg-surface-container-highest border border-white/10 flex items-center justify-center shrink-0 z-10">
      <span className="material-symbols-outlined text-primary">dns</span>
    </div>
    
    <div className="pb-md">
      <h3 className="font-sans text-card-title text-on-surface">{title}</h3>
      <div className="flex items-center gap-2 mt-1 mb-2">
        <span className="font-sans text-body-sm text-primary">{company}</span>
        <span className="text-tertiary/50">•</span>
        <span className="font-code text-[12px] text-tertiary">
          <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
          {!to ? 'Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
        </span>
      </div>
      {description && (
        <p className="font-sans text-body text-on-surface-variant">
          {description}
        </p>
      )}
    </div>
  </div>
);

ProfileExperience.propTypes = {
  exp: PropTypes.shape({
    company: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    current: PropTypes.bool,
    to: PropTypes.string,
    from: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired
};

export default ProfileExperience;
