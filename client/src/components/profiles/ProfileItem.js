import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div className="glass-card rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 group hover:border-white/30">
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 mb-4 group-hover:border-primary transition-colors">
        <img 
          src={avatar || "https://via.placeholder.com/200"} 
          alt={name} 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <h3 className="font-sans text-section-heading text-on-surface mb-1 truncate w-full">{name}</h3>
      
      <p className="font-code text-body-sm text-primary mb-3 truncate w-full">
        {status} {company && <span> at {company}</span>}
      </p>
      
      {location && (
        <div className="flex items-center gap-2 mb-4 text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">location_on</span>
          <span className="font-sans text-body-sm truncate">{location}</span>
        </div>
      )}
      
      <div className="flex flex-wrap justify-center gap-2 mb-6 min-h-[32px] items-center">
        {skills && skills.length > 0 ? (
          skills.slice(0, 4).map((skill, index) => (
            <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full font-sans text-caption uppercase tracking-wider border border-primary/20">
              {skill}
            </span>
          ))
        ) : (
          <span className="text-on-surface-variant font-sans text-body-sm italic opacity-50">No skills listed</span>
        )}
      </div>
      
      <Link 
        to={`/profile/${_id}`} 
        className="w-full bg-surface-variant/50 border border-primary/30 text-primary py-3 rounded-lg font-sans text-caption uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-all active:scale-95 mt-auto"
      >
        View Profile
      </Link>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
