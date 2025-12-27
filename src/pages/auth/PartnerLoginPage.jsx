import React, { useState } from 'react';
import { Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../utils/supabase';

const PartnerLoginPage = () => {
  const [loginMethod, setLoginMethod] = useState('email'); // 'phone' or 'email'
  const [email, setEmail] = useState('');

const handleContinue = async () => {
  if (!email) {
    alert('Please enter your email');
    return;
  }

  try {
    // Send magic link
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for the login link!');
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('An error occurred. Please try again.');
  }
};
const handleGoogleLogin = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      console.error('Google login error:', error);
      alert('Google login failed. Please try again.');
    }
  } catch (err) {
    console.error('Login error:', err);
    alert('An error occurred. Please try again.');
  }
};
  const testimonials = [
    {
      quote: "At first I was skeptical. I've completed 3 estimates using this system and it puts it right on the money.",
      author: "Jason Timms",
      company: "Home Remedies, Inc."
    },
    {
      quote: "Partner has saved me countless hours. The AI estimates are incredibly accurate and professional.",
      author: "Sarah Williams",
      company: "Elite Renovations LLC"
    },
    {
      quote: "I can't imagine going back to manual estimates. This tool has transformed my business.",
      author: "Marcus Thompson",
      company: "Thompson & Co Builders"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-200 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary-200 rounded-full opacity-20 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Login Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-3xl shadow-large p-8 lg:p-10 border border-neutral-100 relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl opacity-0 hover:opacity-5 blur-xl transition-opacity"></div>
              
              <div className="relative">
                {/* Logo */}
                <div className="mb-8">
                  <div className="w-16 h-16  mb-6">
                    <img 
                      src="/logo.png" 
                      alt="Partner Logo" 
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  </div>
                </div>

                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-heading-xl text-neutral-900 mb-3">
                    Welcome back!
                  </h1>
                  <p className="text-neutral-600">
                    New here?{' '}
                    <a href="/signup" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                      Create an account
                    </a>
                  </p>
                </div>

                {/* Login Methods Toggle */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                    Login methods:
                  </label>
                  <div className="inline-flex bg-neutral-100 rounded-xl p-1">
                    <button
                      onClick={() => setLoginMethod('phone')}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        loginMethod === 'phone'
                          ? 'bg-white text-neutral-900 shadow-soft'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Phone
                    </button>
                    <button
                      onClick={() => setLoginMethod('email')}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        loginMethod === 'email'
                          ? 'bg-white text-neutral-900 shadow-soft'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Email
                    </button>
                  </div>
                </div>

                {/* Info Banner */}
                <div className="mb-6 p-4 bg-primary-50 border border-primary-200 rounded-xl flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm text-primary-800">
                    <p className="font-medium mb-1">We will send you a link to your {loginMethod} address.</p>
                    <p>Click the link to access your account.</p>
                  </div>
                </div>

                {/* Email/Phone Input */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                    {loginMethod === 'email' ? 'Email' : 'Phone Number'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      type={loginMethod === 'email' ? 'email' : 'tel'}
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={loginMethod === 'email' ? 'you@example.com' : '(555) 123-4567'}
                      className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-neutral-900 placeholder-neutral-400"
                    />
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  onClick={handleContinue}
                  className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl shadow-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group mb-6"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-neutral-500 font-medium">or</span>
                  </div>
                </div>

                {/* Google Login */}
                <button
                  onClick={handleGoogleLogin}
                  className="w-full py-4 px-6 bg-white border-2 border-neutral-200 hover:border-neutral-300 rounded-xl font-semibold text-neutral-700 transition-all duration-300 hover:shadow-medium flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Feature Showcase */}
          <div className="order-1 lg:order-2 space-y-8 animate-fade-in-up">
            {/* AI Estimate Preview Card */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-200">
              <div className="bg-white rounded-xl p-6 shadow-medium">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-lg mb-1">Estimate with AI</h3>
                    <p className="text-sm text-neutral-600">What details would you like to provide about your estimate?</p>
                  </div>
                  <button className="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors">
                    Apply
                  </button>
                </div>
                <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    I need an estimate for a 100 square foot master bathroom remodel that includes a bathtub, double vanity, shower, and tile flooring...
                  </p>
                </div>
                <div className="flex items-center justify-between bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg p-4">
                  <span className="font-bold">Total Estimate</span>
                  <span className="text-2xl font-bold">$12,400</span>
                </div>
              </div>
            </div>

            {/* Heading */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-semibold text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                Instant AI Estimates
              </div>
              <h2 className="text-display-sm lg:text-display-md text-neutral-900 mb-4">
                Get back to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                  building faster
                </span>
              </h2>
            </div>

            {/* Testimonial Carousel */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-medium border border-neutral-100">
              <div className="mb-6">
                <p className="text-neutral-700 leading-relaxed italic text-lg mb-4">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div className="border-t border-neutral-200 pt-4">
                  <p className="font-bold text-neutral-900">{testimonials[currentTestimonial].author}</p>
                  <p className="text-sm text-neutral-600">{testimonials[currentTestimonial].company}</p>
                </div>
              </div>
              
              {/* Dots */}
              <div className="flex items-center justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentTestimonial === index 
                        ? 'w-8 h-2 bg-gradient-to-r from-primary-500 to-secondary-500' 
                        : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4">
              {['AI-Powered Estimates', 'Professional Proposals', 'Built-in CRM', 'Payment Processing'].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-soft border border-neutral-100 hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-neutral-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerLoginPage;