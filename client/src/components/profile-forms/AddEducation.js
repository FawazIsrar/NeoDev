import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";
import { Link, useNavigate } from "react-router-dom";

const AddEducation = ({ addEducation }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, navigate);
  };

  return (
    <main className="flex-grow pt-24 pb-xl px-margin-mobile md:px-margin-desktop flex flex-col items-center justify-center relative overflow-hidden min-h-[calc(100vh-80px)]">
      {/* Background Atmospheric Element */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-[100px] -z-10 pointer-events-none mix-blend-screen"></div>
      
      <div className="w-full max-w-2xl mt-lg">
        <div className="mb-lg">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-sans text-body group mb-sm">
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to Dashboard
          </Link>
          <h1 className="font-sans text-hero text-on-surface mb-xs">Add Education</h1>
          <p className="font-sans text-body text-on-surface-variant">Detail your academic background and foundational learning.</p>
        </div>

        {/* Form Card */}
        <div className="glass-card rounded-xl p-lg glow-inner relative">
          <form className="space-y-gutter flex flex-col gap-md" onSubmit={onSubmit}>
            {/* University/School */}
            <div className="flex flex-col gap-xs">
              <label className="block font-sans text-caption uppercase tracking-wider text-on-surface-variant uppercase tracking-wider mb-xs" htmlFor="school">* University / School</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">school</span>
                <input 
                  className="w-full bg-surface-container-low border border-white/10 rounded-lg pl-[44px] pr-sm py-sm text-input font-sans text-body text-on-surface placeholder:text-surface-variant focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all glow-inner outline-none" 
                  id="school" 
                  name="school"
                  value={school}
                  onChange={onChange}
                  placeholder="e.g. Massachusetts Institute of Technology" 
                  type="text" 
                  required
                />
              </div>
            </div>

            {/* Degree & Field of Study Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="flex flex-col gap-xs">
                <label className="block font-sans text-caption uppercase tracking-wider text-on-surface-variant uppercase tracking-wider mb-xs" htmlFor="degree">* Degree or Certificate</label>
                <input 
                  className="w-full bg-surface-container-low border border-white/10 rounded-lg px-sm py-sm text-input font-sans text-body text-on-surface placeholder:text-surface-variant focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all glow-inner outline-none" 
                  id="degree" 
                  name="degree"
                  value={degree}
                  onChange={onChange}
                  placeholder="e.g. Bachelor of Science" 
                  type="text" 
                  required
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="block font-sans text-caption uppercase tracking-wider text-on-surface-variant uppercase tracking-wider mb-xs" htmlFor="fieldofstudy">Field of Study</label>
                <input 
                  className="w-full bg-surface-container-low border border-white/10 rounded-lg px-sm py-sm text-input font-sans text-body text-on-surface placeholder:text-surface-variant focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all glow-inner outline-none" 
                  id="fieldofstudy" 
                  name="fieldofstudy"
                  value={fieldofstudy}
                  onChange={onChange}
                  placeholder="e.g. Computer Science" 
                  type="text"
                />
              </div>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="flex flex-col gap-xs">
                <label className="block font-sans text-caption uppercase tracking-wider text-on-surface-variant uppercase tracking-wider mb-xs" htmlFor="from">Start Date</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">calendar_today</span>
                  <input 
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg pl-[44px] pr-sm py-sm text-input font-sans text-body text-on-surface focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all glow-inner outline-none [color-scheme:dark]" 
                    id="from" 
                    name="from"
                    value={from}
                    onChange={onChange}
                    type="date"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="block font-sans text-caption uppercase tracking-wider text-on-surface-variant uppercase tracking-wider mb-xs" htmlFor="to">End Date</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">event</span>
                  <input 
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg pl-[44px] pr-sm py-sm text-input font-sans text-body text-on-surface focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all glow-inner outline-none [color-scheme:dark] disabled:opacity-50" 
                    id="to" 
                    name="to"
                    value={to}
                    onChange={onChange}
                    type="date"
                    disabled={toDateDisabled}
                  />
                </div>
              </div>
            </div>

            {/* Current Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="current"
                checked={current}
                value={current}
                onChange={(e) => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
                className="w-4 h-4 rounded border-white/10 bg-surface-container-low text-primary focus:ring-primary focus:ring-offset-surface"
              />
              <span className="font-sans text-body text-on-surface">Current School</span>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-xs">
              <label className="block font-sans text-caption uppercase tracking-wider text-on-surface-variant uppercase tracking-wider mb-xs" htmlFor="description">Program Description</label>
              <textarea 
                className="w-full bg-surface-container-low border border-white/10 rounded-lg px-sm py-sm text-input font-sans text-body text-on-surface placeholder:text-surface-variant focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all glow-inner outline-none min-h-[100px]" 
                id="description" 
                name="description"
                value={description}
                onChange={onChange}
                placeholder="Tell us about the program" 
              />
            </div>

            {/* Actions */}
            <div className="pt-md mt-md border-t border-white/5 flex justify-end gap-sm">
              <Link to="/dashboard" className="px-md py-sm rounded-lg font-sans text-caption uppercase tracking-wider text-on-surface bg-transparent border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all active:scale-95">
                Cancel
              </Link>
              <button className="px-md py-sm rounded-lg font-sans text-button uppercase tracking-wider text-on-primary bg-primary hover:bg-primary-fixed-dim shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:shadow-[0_0_30px_rgba(78,222,163,0.5)] transition-all active:scale-95 flex items-center gap-2" type="submit">
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Add Education
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
