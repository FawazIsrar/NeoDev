import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
      <td className="py-3 px-4 font-sans text-body text-on-surface">{exp.company}</td>
      <td className="py-3 px-4 font-sans text-body text-on-surface-variant hidden sm:table-cell">{exp.title}</td>
      <td className="py-3 px-4 font-sans text-body-sm text-tertiary">
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          'Now'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td className="py-3 px-4 text-right">
        <button
          onClick={() => deleteExperience(exp._id)}
          className="text-error hover:bg-error/10 p-2 rounded-full transition-colors inline-flex items-center justify-center"
          title="Delete Experience"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="font-sans text-section-heading text-on-surface mb-md">Experience Credentials</h2>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-on-surface-variant font-sans text-caption uppercase uppercase tracking-wider text-xs">
              <th className="py-3 px-4 font-medium">Company</th>
              <th className="py-3 px-4 font-medium hidden sm:table-cell">Title</th>
              <th className="py-3 px-4 font-medium">Years</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
