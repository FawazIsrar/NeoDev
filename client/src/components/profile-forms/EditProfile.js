import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = ({ createProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [isGeneratingBio, setIsGeneratingBio] = useState(false);

  const generateBio = async () => {
    if (!formData.skills || !formData.status) {
      alert("Please fill in Skills and Status first so the AI has context.");
      return;
    }
    try {
      setIsGeneratingBio(true);
      const res = await axios.post("/api/ai/generate-bio", {
        skills: formData.skills,
        status: formData.status,
        company: formData.company,
      });
      setFormData({ ...formData, bio: res.data.bio });
    } catch (err) {
      console.error(err);
      alert("Failed to generate bio. Make sure GEMINI_API_KEY is set in .env");
    } finally {
      setIsGeneratingBio(false);
    }
  };

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        company: profile.company || "",
        website: profile.website || "",
        location: profile.location || "",
        status: profile.status || "",
        skills: profile.skills ? profile.skills.join(",") : "",
        githubusername: profile.githubusername || "",
        bio: profile.bio || "",
        twitter: profile.social ? profile.social.twitter || "" : "",
        facebook: profile.social ? profile.social.facebook || "" : "",
        linkedin: profile.social ? profile.social.linkedin || "" : "",
        youtube: profile.social ? profile.social.youtube || "" : "",
        instagram: profile.social ? profile.social.instagram || "" : "",
      });
      if (profile.social && (profile.social.twitter || profile.social.facebook || profile.social.linkedin || profile.social.youtube || profile.social.instagram)) {
        toggleSocialInputs(true);
      }
    }
  }, [profile]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, true);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <main className="flex-grow pt-24 pb-xl px-margin-mobile md:px-margin-desktop relative z-10 w-full max-w-[1440px] mx-auto min-h-[calc(100vh-80px)]">
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-container/20 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container/10 blur-[150px] pointer-events-none z-0"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Header Section */}
        <div className="md:col-span-12 mb-lg">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-sans text-body group mb-sm">
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to Dashboard
          </Link>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-on-surface">Edit Profile</h1>
          <p className="font-sans text-body text-on-surface-variant mt-xs">Update your professional information and developer identity.</p>
        </div>

        {/* Main Form Container (Glass Panel) */}
        <div className="md:col-span-8 md:col-start-3 glass-card rounded-xl p-md md:p-lg relative overflow-hidden group">
          <form className="space-y-lg" onSubmit={onSubmit}>
            
            {/* Professional Info */}
            <div className="space-y-md">
              <h2 className="font-sans text-section-heading text-primary border-b border-white/10 pb-2">Professional Info</h2>
              
              <div className="space-y-xs">
                <label className="block font-sans text-caption uppercase text-on-surface-variant uppercase tracking-wider" htmlFor="status">* Professional Status</label>
                <select 
                  className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface font-sans text-body focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                  name="status" 
                  id="status"
                  value={status} 
                  onChange={onChange}
                  required
                >
                  <option value="0">* Select Professional Status</option>
                  <option value="Developer">Developer</option>
                  <option value="Junior Developer">Junior Developer</option>
                  <option value="Senior Developer">Senior Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Student or Learning">Student or Learning</option>
                  <option value="Instructor">Instructor or Teacher</option>
                  <option value="Intern">Intern</option>
                  <option value="Other">Other</option>
                </select>
                <small className="font-sans text-body-sm text-tertiary">Give us an idea of where you are at in your career</small>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="block font-sans text-caption uppercase text-on-surface-variant uppercase tracking-wider" htmlFor="company">Company</label>
                  <input 
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface font-sans text-input focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                    type="text"
                    id="company"
                    placeholder="Company"
                    name="company"
                    value={company}
                    onChange={onChange}
                  />
                </div>
                <div className="space-y-xs">
                  <label className="block font-sans text-caption uppercase text-on-surface-variant uppercase tracking-wider" htmlFor="location">Location</label>
                  <input 
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface font-sans text-input focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                    type="text"
                    id="location"
                    placeholder="Location"
                    name="location"
                    value={location}
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="block font-sans text-caption uppercase text-on-surface-variant uppercase tracking-wider" htmlFor="website">Website</label>
                  <input 
                    className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface font-sans text-input focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                    type="text"
                    id="website"
                    placeholder="Website"
                    name="website"
                    value={website}
                    onChange={onChange}
                  />
                </div>
                <div className="space-y-xs">
                  <label className="block font-sans text-caption uppercase text-on-surface-variant uppercase tracking-wider" htmlFor="githubusername">Github Username</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-on-surface-variant/50 font-code">@</span>
                    <input 
                      className="w-full bg-surface-container-low border border-white/10 rounded-lg pl-8 pr-4 py-3 text-on-surface font-code focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                      type="text"
                      id="githubusername"
                      placeholder="Github Username"
                      name="githubusername"
                      value={githubusername}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-xs">
              <label className="block font-sans text-caption uppercase text-on-surface-variant uppercase tracking-wider" htmlFor="skills">* Skills</label>
              <input 
                className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface font-code focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
                type="text"
                id="skills"
                placeholder="* Skills"
                name="skills"
                value={skills}
                onChange={onChange}
                required
              />
              <small className="font-sans text-body-sm text-tertiary">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
            </div>

            {/* Bio */}
            <div className="space-y-xs">
              <div className="flex justify-between items-center mb-xs">
                <label className="block font-sans text-caption uppercase text-on-surface-variant uppercase tracking-wider" htmlFor="bio">Bio</label>
                <button 
                  type="button" 
                  className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30 rounded-full px-3 py-1 font-sans text-caption uppercase text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors disabled:opacity-50"
                  onClick={generateBio}
                  disabled={isGeneratingBio}
                >
                  <span className="material-symbols-outlined text-[14px]">magic_button</span> 
                  {isGeneratingBio ? 'Generating...' : 'AI Generate'}
                </button>
              </div>
              <textarea 
                className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-3 text-on-surface font-sans text-input focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none resize-none"
                id="bio"
                placeholder="A short bio of yourself"
                name="bio"
                value={bio}
                onChange={onChange}
                rows="4"
              />
            </div>

            {/* Social Links Toggle */}
            <div className="pt-sm border-t border-white/10">
              <button
                onClick={() => toggleSocialInputs(!displaySocialInputs)}
                type="button"
                className="bg-surface-variant text-on-surface hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 font-sans text-body-sm transition-colors flex items-center gap-2 mb-2"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                Add Social Network Links <span className="text-tertiary text-xs">(Optional)</span>
              </button>
            </div>

            {/* Social Links */}
            {displaySocialInputs && (
              <div className="space-y-sm bg-black/20 p-md rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#1DA1F2]">flutter_dash</span>
                  <input className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2 text-on-surface font-code focus:border-primary/50 outline-none" type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={onChange} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#1877F2]">facebook</span>
                  <input className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2 text-on-surface font-code focus:border-primary/50 outline-none" type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={onChange} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#FF0000]">smart_display</span>
                  <input className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2 text-on-surface font-code focus:border-primary/50 outline-none" type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={onChange} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#0A66C2]">work</span>
                  <input className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2 text-on-surface font-code focus:border-primary/50 outline-none" type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={onChange} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#E4405F]">photo_camera</span>
                  <input className="w-full bg-surface-container-low border border-white/10 rounded-lg px-4 py-2 text-on-surface font-code focus:border-primary/50 outline-none" type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={onChange} />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-sm pt-md border-t border-white/10">
              <Link to="/dashboard" className="px-6 py-3 rounded-lg font-sans text-caption uppercase uppercase tracking-wider bg-transparent border border-white/10 hover:bg-white/5 transition-all text-on-surface">
                Cancel
              </Link>
              <button type="submit" className="px-6 py-3 rounded-lg font-sans text-caption uppercase uppercase tracking-wider bg-primary text-on-primary hover:bg-primary-fixed-dim shadow-[0_0_15px_rgba(78,222,163,0.3)] transition-all">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile, getCurrentProfile })(EditProfile);
