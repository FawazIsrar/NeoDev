import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
      <td className="py-3 px-4 font-sans text-body text-on-surface">{edu.school}</td>
      <td className="py-3 px-4 font-sans text-body text-on-surface-variant hidden sm:table-cell">{edu.degree}</td>
      <td className="py-3 px-4 font-sans text-body-sm text-tertiary">
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          'Now'
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td className="py-3 px-4 text-right">
        <button
          onClick={() => deleteEducation(edu._id)}
          className="text-error hover:bg-error/10 p-2 rounded-full transition-colors inline-flex items-center justify-center"
          title="Delete Education"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="font-sans text-section-heading text-on-surface mb-md">Education Credentials</h2>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-on-surface-variant font-sans text-caption uppercase uppercase tracking-wider text-xs">
              <th className="py-3 px-4 font-medium">School</th>
              <th className="py-3 px-4 font-medium hidden sm:table-cell">Degree</th>
              <th className="py-3 px-4 font-medium">Years</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>{educations}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
