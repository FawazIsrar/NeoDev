import React from 'react';

const Documentation = () => {
  return (
    <main className="relative z-10 w-full flex flex-col items-center justify-start min-h-[calc(100vh-160px)] pt-28 pb-xl">
      {/* Background Orbs */}
      <div className="absolute w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(78,222,163,0.05)_0%,rgba(5,20,36,0)_70%)] rounded-full top-0 left-1/2 -translate-x-1/2 -z-10 pointer-events-none"></div>

      <div className="w-full max-w-[800px] bg-surface/30 backdrop-blur-[40px] border border-white/10 rounded-xl shadow-[0_8px_32px_0_rgba(99,102,241,0.15)] p-lg relative overflow-hidden my-8">
        {/* Subtle inner top edge glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <h1 className="font-sans text-hero text-primary font-bold tracking-tight mb-md text-center">Documentation</h1>
        <p className="font-sans text-body text-on-surface-variant text-center mb-xl">
          Learn how to get the most out of NeoDev.
        </p>

        <div className="space-y-md">
          <section>
            <h2 className="font-sans text-section-heading font-semibold text-on-surface mb-sm">Getting Started</h2>
            <p className="font-sans text-body-sm text-on-surface-variant mb-xs">
              NeoDev is a community platform tailored specifically for developers. To begin, simply create an account using your email address. Once logged in, you can set up your developer profile, add your experience and education, and connect your GitHub account to automatically pull in your latest repositories.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-section-heading font-semibold text-on-surface mb-sm">Building Your Profile</h2>
            <p className="font-sans text-body-sm text-on-surface-variant mb-xs">
              Your profile is your digital resume. Make sure to add your skills (comma separated), a professional bio, and links to your social media platforms. Adding your GitHub username is highly recommended, as it will showcase your top 5 repositories directly on your profile.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-section-heading font-semibold text-on-surface mb-sm">Community Discussions</h2>
            <p className="font-sans text-body-sm text-on-surface-variant mb-xs">
              The "Posts" section is where the magic happens. Engage with other developers by asking questions, sharing insights, or posting code snippets. You can like and comment on posts. Our community guidelines encourage respectful and constructive discussions.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Documentation;
