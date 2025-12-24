import React, { useState } from 'react';
import { Building2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const OnboardingPage = ({ onComplete }) => {
  const [llcName, setLlcName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!llcName.trim()) {
      setError('Please enter your business name');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Store business name in localStorage
      localStorage.setItem('businessName', llcName);
      localStorage.setItem('onboardingComplete', 'true');
      
      // Call parent completion handler
      if (onComplete) {
        onComplete(llcName);
      }
      
      // Navigate to dashboard
      window.history.pushState({}, '', '/dashboard');
      window.dispatchEvent(new PopStateEvent('popstate'));
      
      setIsSubmitting(false);
    }, 1500);
  };

  const benefits = [
    'AI-powered project estimates',
    'Professional proposals in seconds',
    'Complete project management',
    'Built-in client communication'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-200 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-200 rounded-full opacity-20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Logo Header */}
      <div className="relative pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Partner Logo" 
              className="w-12 h-12 rounded-xl"
            />
            <span className="text-2xl font-bold text-neutral-900">Partner</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative min-h-[calc(100vh-120px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Form */}
          <div className="order-2 lg:order-1 animate-fade-in-up">
            <div className="bg-white rounded-3xl shadow-large p-8 lg:p-12 border border-neutral-100 relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl opacity-0 hover:opacity-5 blur-xl transition-opacity"></div>
              
              <div className="relative">
                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-primary-600">Step 1 of 1</span>
                    <span className="text-sm font-medium text-neutral-600">Almost there!</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
                  </div>
                </div>

                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-semibold text-sm mb-4">
                    <Sparkles className="w-4 h-4" />
                    Welcome to Partner
                  </div>
                  <h1 className="text-heading-xl text-neutral-900 mb-3">
                    Let's set up your business
                  </h1>
                  <p className="text-neutral-600 text-lg">
                    Tell us about your company to get started with AI-powered project management.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* LLC Name Input */}
                  <div>
                    <label htmlFor="llcName" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Business Name <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="text"
                        id="llcName"
                        value={llcName}
                        onChange={(e) => {
                          setLlcName(e.target.value);
                          setError('');
                        }}
                        placeholder="e.g., FluxtonX Constructions LLC"
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl focus:ring-4 focus:ring-primary-100 transition-all outline-none text-neutral-900 placeholder-neutral-400 ${
                          error 
                            ? 'border-error focus:border-error' 
                            : 'border-neutral-200 focus:border-primary-500'
                        }`}
                        disabled={isSubmitting}
                      />
                    </div>
                    {error && (
                      <p className="mt-2 text-sm text-error flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {error}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-neutral-500">
                      This will be displayed on your proposals and invoices
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl shadow-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Setting up your workspace...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Setup</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-neutral-600">
                    By continuing, you agree to our{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Privacy Policy</a>
                  </p>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side - Benefits */}
          <div className="order-1 lg:order-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Main Heading */}
            <div>
              <h2 className="text-display-sm lg:text-display-md text-neutral-900 mb-4">
                Everything you need to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                  grow your business
                </span>
              </h2>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Join thousands of contractors who are closing more deals and saving time with AI-powered tools.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-soft border border-neutral-100 hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-primary">
                    <CheckCircle2 className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  <span className="text-neutral-800 font-semibold text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Trust Card */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 border-2 border-white flex items-center justify-center text-white font-bold text-sm"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-600">5,000+</div>
                  <div className="text-sm text-neutral-600">Contractors trust us</div>
                </div>
              </div>
              <p className="text-sm text-neutral-700 italic leading-relaxed">
                "Partner transformed how we handle estimates. What used to take hours now takes minutes, and our proposals look more professional than ever."
              </p>
              <p className="text-sm font-semibold text-neutral-800 mt-2">
                - Michael Torres, Torres Construction
              </p>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-4 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Bank-level security</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Your data is encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;