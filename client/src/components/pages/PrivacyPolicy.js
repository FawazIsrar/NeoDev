import React from 'react';

const PrivacyPolicy = () => {
  return (
    <main className="relative z-10 w-full flex flex-col items-center justify-start min-h-[calc(100vh-160px)] pt-28 pb-xl">
      <div className="absolute w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(78,222,163,0.05)_0%,rgba(5,20,36,0)_70%)] rounded-full top-0 left-1/2 -translate-x-1/2 -z-10 pointer-events-none"></div>

      <div className="w-full max-w-[800px] bg-surface/30 backdrop-blur-[40px] border border-white/10 rounded-xl shadow-[0_8px_32px_0_rgba(99,102,241,0.15)] p-lg relative overflow-hidden my-8">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <h1 className="font-sans text-hero text-primary font-bold tracking-tight mb-md text-center">Privacy Policy</h1>
        <p className="font-sans text-body text-on-surface-variant text-center mb-xl">
          Your data is safe with us. Learn how we handle your information.
        </p>

        <div className="space-y-md">
          <section>
            <h2 className="font-sans text-section-heading font-semibold text-on-surface mb-sm">1. Information We Collect</h2>
            <p className="font-sans text-body-sm text-on-surface-variant mb-xs">
              When you register for a NeoDev account, we collect your name, email address, and a hashed version of your password. When you build your profile, we store the professional information you provide, such as your bio, skills, education, experience, and social links.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-section-heading font-semibold text-on-surface mb-sm">2. How We Use Your Data</h2>
            <p className="font-sans text-body-sm text-on-surface-variant mb-xs">
              Your data is solely used to provide you with the NeoDev platform experience. We use your GitHub username to fetch your latest repositories directly from GitHub's API. Your email address is linked to Gravatar to display your profile picture across the platform.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-section-heading font-semibold text-on-surface mb-sm">3. Data Sharing</h2>
            <p className="font-sans text-body-sm text-on-surface-variant mb-xs">
              We do not sell, trade, or rent your personal information to third parties. Your profile information, including your posts and comments, is public to other users on the NeoDev platform as part of our community-driven ecosystem.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-section-heading font-semibold text-on-surface mb-sm">4. Data Security</h2>
            <p className="font-sans text-body-sm text-on-surface-variant mb-xs">
              We implement a variety of security measures to maintain the safety of your personal information. All passwords are encrypted using bcrypt before being stored in our database, and API communications are secured over HTTPS.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
