import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';

const AuthCallbackPage = () => {
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    let mounted = true;
    let redirected = false;

    const handleCallback = async () => {
      try {
        console.log('🔄 Starting auth callback...');

        // Wait for Supabase to process OAuth
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (!mounted || redirected) return;

        // Get session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
          console.error('❌ Session error:', sessionError);
          if (mounted && !redirected) {
            redirected = true;
            setStatus('Authentication failed. Redirecting...');
            setTimeout(() => window.location.href = '/login', 2000);
          }
          return;
        }

        console.log('✅ User signed in:', session.user.id);
        setStatus('Setting up your profile...');

        // Check if profile exists
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id, business_name')
          .eq('id', session.user.id)
          .maybeSingle();

        console.log('📋 Existing profile:', existingProfile);

        if (!existingProfile) {
          // Create profile
          console.log('➕ Creating new profile...');
          
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata?.full_name || 
                         session.user.user_metadata?.name || 
                         'User',
              phone: null,
              business_name: null
            })
            .select()
            .single();

          if (insertError) {
            console.error('❌ Profile creation error:', insertError);
            console.error('Error details:', JSON.stringify(insertError, null, 2));
            // Continue to onboarding anyway
          } else {
            console.log('✅ Profile created:', newProfile);
          }

          // Wait a bit to ensure profile is saved
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Redirect
        if (mounted && !redirected) {
          redirected = true;
          if (existingProfile?.business_name) {
            console.log('🏢 Has business, redirecting to dashboard...');
            setStatus('Welcome back!');
            setTimeout(() => window.location.href = '/dashboard', 500);
          } else {
            console.log('📝 No business, redirecting to onboarding...');
            setStatus('Setting up your account...');
            setTimeout(() => window.location.href = '/onboarding', 500);
          }
        }

      } catch (error) {
        console.error('💥 Fatal error:', error);
        if (mounted && !redirected) {
          redirected = true;
          setStatus('An error occurred. Redirecting...');
          setTimeout(() => window.location.href = '/login', 2000);
        }
      }
    };

    handleCallback();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-4 animate-pulse mx-auto bg-white">
          <img src="/logo.png" alt="Partner Logo" className="w-10 h-10 object-contain" />
        </div>
        <p className="text-neutral-600 font-medium">{status}</p>
        <p className="text-xs text-neutral-400 mt-2">Please wait...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;