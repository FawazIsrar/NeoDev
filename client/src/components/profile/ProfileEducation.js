import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
  edu: { school, degree, fieldofstudy, current, to, from, description }
}) => (
  <div className="flex gap-md relative">
    <div className="w-12 h-12 rounded-lg bg-surface-container-highest border border-white/10 flex items-center justify-center shrink-0 z-10">
      <span className="material-symbols-outlined text-tertiary">account_balance</span>
    </div>
    <div className="pb-md">
      <h3 className="font-sans text-card-title text-on-surface">{school}</h3>
      <div className="flex items-center gap-2 mt-1 mb-2">
        <span className="font-sans text-body-sm text-on-surface-variant">
          {degree} {fieldofstudy && `in ${fieldofstudy}`}
        </span>
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

ProfileEducation.propTypes = {
  edu: PropTypes.shape({
    school: PropTypes.string.isRequired,
    degree: PropTypes.string,
    fieldofstudy: PropTypes.string,
    current: PropTypes.bool,
    to: PropTypes.string,
    from: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired
};

export default ProfileEducation;
