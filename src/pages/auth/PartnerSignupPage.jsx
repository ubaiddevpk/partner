import React, { useState } from 'react';
import { Mail, Phone, User, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { supabase } from '../../utils/supabase.js';

const PartnerSignupPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [acceptSMS, setAcceptSMS] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [email, setEmail] = useState('');
const [name, setName] = useState('');

const handleSubmit = async () => {
  if (!name || !email || !phoneNumber) {
    alert('Please fill in all required fields');
    return;
  }

  try {
    // Sign up user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: Math.random().toString(36).slice(-8), // generate random password
      options: {
        data: {
          full_name: name
        }
      }
    });

    if (authError) {
      alert(authError.message);
      return;
    }

    if (!authData.user) {
      alert('Sign up failed. Please try again.');
      return;
    }

    // Store user in profiles table
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      full_name: name,
      email,
      phone: phoneNumber
    });

    if (profileError) {
      console.error('Profile creation error:', profileError);
    }

    // Redirect to onboarding
    window.location.href = '/onboarding';
  } catch (err) {
    console.error('Sign up error:', err);
    alert('An error occurred during sign up');
  }
};

const handleGoogleAuth = async () => {
  try {
    const redirectUrl = window.location.origin === 'http://localhost:5173'
      ? 'http://localhost:5173/auth/callback'
      : 'https://partner-rho.vercel.app/auth/callback';

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) {
      console.error('Google auth error:', error);
      alert('Google authentication failed. Please try again.');
    }
  } catch (err) {
    console.error('Auth error:', err);
    alert('An error occurred. Please try again.');
  }
};

  const benefits = [
    'AI-powered estimates in seconds',
    'Professional proposals automatically',
    'Built-in payment processing',
    'Complete CRM included'
  ];

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
          
          {/* Left Side - Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-3xl shadow-large p-8 lg:p-10 border border-neutral-100 relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl opacity-0 hover:opacity-5 blur-xl transition-opacity"></div>
              
              <div className="relative">
                {/* Logo Placeholder */}
                <div className="mb-8">
                  <div className="w-16 h-16 ">
                    {/* Replace this div with your actual logo image */}
                    <img 
                      src="/logo.png" 
                      alt="Partner Logo00" 
                      className="w-full h-full object-contain rounded-2xl"
                    />
                  </div>
                </div>

                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-heading-xl text-neutral-900 mb-3">
                    Create your account
                  </h1>
                  <p className="text-neutral-600">
                    Already have an account?{' '}
                    <a href="#" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                      Log in
                    </a>
                  </p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  {/* Phone Input */}
                  <div>
  <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
    Full Name <span className="text-error">*</span>
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <User className="h-5 w-5 text-neutral-400" />
    </div>
    <input
      type="text"
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="John Doe"
      className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-neutral-900 placeholder-neutral-400"
    />
  </div>
</div>

{/* Email Input */}
<div>
  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
    Email Address <span className="text-error">*</span>
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Mail className="h-5 w-5 text-neutral-400" />
    </div>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="john@example.com"
      className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-neutral-900 placeholder-neutral-400"
    />
  </div>
</div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                      Phone Number <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="w-full pl-12 pr-4 py-4 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-neutral-900 placeholder-neutral-400"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold rounded-xl shadow-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 group"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-center text-sm text-neutral-600 font-medium">
                    No credit card required! 🎉
                  </p>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-neutral-500 font-medium">or</span>
                    </div>
                  </div>

                  {/* Google Sign Up */}
                  <button
                    onClick={handleGoogleAuth}
                    className="w-full py-4 px-6 bg-white border-2 border-neutral-200 hover:border-neutral-300 rounded-xl font-semibold text-neutral-700 transition-all duration-300 hover:shadow-medium flex items-center justify-center gap-3 group"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  {/* Checkboxes */}
                  <div className="space-y-4 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={acceptSMS}
                          onChange={(e) => setAcceptSMS(e.target.checked)}
                          className="w-5 h-5 rounded border-2 border-neutral-300 text-primary-500 focus:ring-2 focus:ring-primary-200 transition-all cursor-pointer"
                        />
                      </div>
                      <span className="text-sm text-neutral-600 leading-relaxed">
                        By signing up, you consent to receive SMS and Email from Partner at the number provided. Consent is not a condition of purchase. Message & data rates may apply. Message frequency varies. Unsubscribe by replying STOP. Reply HELP for help. Phone numbers aren't shared with third parties.{' '}
                        <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Privacy Policy</a>
                        {' & '}
                        <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Terms</a>.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={acceptMarketing}
                          onChange={(e) => setAcceptMarketing(e.target.checked)}
                          className="w-5 h-5 rounded border-2 border-neutral-300 text-primary-500 focus:ring-2 focus:ring-primary-200 transition-all cursor-pointer"
                        />
                      </div>
                      <span className="text-sm text-neutral-600">
                        I agree to receive marketing and promotional communications from Partner.
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Benefits & Visual */}
          <div className="order-1 lg:order-2 space-y-8 animate-fade-in-up">
            {/* Main Heading */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full text-primary-700 font-semibold text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                Join 5,000+ Contractors
              </div>
              <h2 className="text-display-sm lg:text-display-md text-neutral-900 mb-4">
                Start winning more{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                  projects today
                </span>
              </h2>
              <p className="text-xl text-neutral-600 leading-relaxed">
                Create professional estimates in seconds with AI-powered software built specifically for contractors.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-soft border border-neutral-100 hover:shadow-medium hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-primary">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-neutral-800 font-semibold">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Sample Preview Card */}
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-200">
              <div className="bg-white rounded-xl p-6 shadow-medium">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-neutral-900 text-lg mb-1">Add Client</h3>
                    <p className="text-sm text-neutral-600">Centralized CRM</p>
                  </div>
                  <button className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-sm font-semibold hover:bg-neutral-800 transition-colors">
                    Save
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-neutral-500 w-16">Name</span>
                    <span className="text-neutral-900 font-medium">Adam Applehead</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-neutral-500 w-16">Email</span>
                    <span className="text-neutral-900 font-medium">adam@email.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="text-neutral-500 w-16">Phone</span>
                    <span className="text-neutral-900 font-medium">(594) 284-2234</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-neutral-600 mt-4 italic">
                "I've been so frustrated with estimating that I was ready to give it up. Partner is like taking a 1,000-pound weight off my chest."
              </p>
              <p className="text-center text-sm font-semibold text-neutral-800 mt-2">
                - Todd Sheffield, GoHome LLC
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">5,000+</div>
                <div className="text-sm text-neutral-600">Active Users</div>
              </div>
              <div className="w-px h-12 bg-neutral-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">4.9★</div>
                <div className="text-sm text-neutral-600">User Rating</div>
              </div>
              <div className="w-px h-12 bg-neutral-200"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">$10M+</div>
                <div className="text-sm text-neutral-600">Estimates Created</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSignupPage;