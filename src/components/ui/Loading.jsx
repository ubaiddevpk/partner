import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-4 animate-pulse mx-auto bg-white">
          <img src="/logo.png" alt="Partner Logo" className="w-10 h-10 object-contain" />
        </div>
        <p className="text-neutral-600 font-medium">Loading Partner...</p>
      </div>
    </div>
  );
};

export default Loading;