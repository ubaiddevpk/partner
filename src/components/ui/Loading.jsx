import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="flex gap-2.5" style={{ perspective: '1000px' }}>
        {['P', 'a', 'r', 't', 'n', 'e', 'r'].map((letter, index) => (
          <span
            key={index}
            className="inline-block text-6xl font-extrabold text-primary-600"
            style={{
              fontFamily: "'Exo 2', sans-serif",
              animation: 'flip 2s ease-in-out infinite',
              animationDelay: `${index * 0.1}s`,
              transformOrigin: 'center',
              transformStyle: 'preserve-3d',
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700;800&display=swap');

        @keyframes flip {
          0%, 100% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;