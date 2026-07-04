import React from 'react';

const ApiReference = () => {
  return (
    <main className="relative z-10 w-full flex flex-col items-center justify-start min-h-[calc(100vh-160px)] pt-28 pb-xl">
      <div className="absolute w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(78,222,163,0.05)_0%,rgba(5,20,36,0)_70%)] rounded-full top-0 left-1/2 -translate-x-1/2 -z-10 pointer-events-none"></div>

      <div className="w-full max-w-[800px] bg-surface/30 backdrop-blur-[40px] border border-white/10 rounded-xl shadow-[0_8px_32px_0_rgba(99,102,241,0.15)] p-lg relative overflow-hidden my-8">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        
        <h1 className="font-sans text-hero text-primary font-bold tracking-tight mb-md text-center">API Reference</h1>
        <p className="font-sans text-body text-on-surface-variant text-center mb-xl">
          Integrate NeoDev's powerful backend into your own applications.
        </p>

        <div className="space-y-md">
          <section>
            <h2 className="font-sans text-section-heading font-semibold text-on-surface mb-sm">Authentication</h2>
            <div className="bg-surface-dim p-4 rounded-lg border border-white/5 mb-2">
              <code className="text-primary font-code text-sm">POST /api/auth</code>
            </div>
            <p className="font-sans text-body-sm text-on-surface-variant mb-xs">
              Authenticate a user and get a JSON Web Token (JWT) in return. Required payload includes <code className="bg-surface px-1 rounded text-primary">email</code> and <code className="bg-surface px-1 rounded text-primary">password</code>.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-section-heading font-semibold text-on-surface mb-sm">Profiles</h2>
            <div className="bg-surface-dim p-4 rounded-lg border border-white/5 mb-2">
              <code className="text-primary font-code text-sm">GET /api/profile</code>
            </div>
            <p className="font-sans text-body-sm text-on-surface-variant mb-xs">
              Get all developer profiles. This endpoint is public and does not require a token. It returns an array of profile objects populated with user names and avatars.
            </p>
            <div className="bg-surface-dim p-4 rounded-lg border border-white/5 mb-2 mt-4">
              <code className="text-primary font-code text-sm">POST /api/profile</code>
            </div>
            <p className="font-sans text-body-sm text-on-surface-variant mb-xs">
              Create or update the authenticated user's profile. Requires a valid JWT token in the <code className="bg-surface px-1 rounded text-primary">x-auth-token</code> header.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-section-heading font-semibold text-on-surface mb-sm">Posts</h2>
            <div className="bg-surface-dim p-4 rounded-lg border border-white/5 mb-2">
              <code className="text-primary font-code text-sm">GET /api/posts</code>
            </div>
            <p className="font-sans text-body-sm text-on-surface-variant mb-xs">
              Retrieve all community posts. Requires authentication. Posts are sorted by most recent first.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ApiReference;
