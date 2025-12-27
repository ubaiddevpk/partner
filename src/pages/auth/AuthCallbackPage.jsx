import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';

const AuthCallbackPage = () => {
  const [status, setStatus] = useState('Verifying authentication...');


 useEffect(() => {
  let mounted = true;

  const handleCallback = async () => {
    try {
      // Wait for hash to be processed
      await new Promise(resolve => setTimeout(resolve, 100));

      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Session error:', error);
        if (mounted) {
          setStatus('Authentication failed. Redirecting...');
          setTimeout(() => window.location.href = '/login', 2000);
        }
        return;
      }

      if (!session?.user) {
        if (mounted) {
          setStatus('No session found. Redirecting...');
          setTimeout(() => window.location.href = '/login', 2000);
        }
        return;
      }

      // Check if profile exists
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('business_name, full_name, email, phone')
        .eq('id', session.user.id)
        .maybeSingle();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Profile error:', profileError);
      }

      // Create profile if doesn't exist
      if (!profile) {
        await supabase.from('profiles').upsert({
          id: session.user.id,
          email: session.user.email,
          full_name: session.user.user_metadata?.full_name || 
                     session.user.user_metadata?.name || 
                     'User',
        }, { onConflict: 'id' });
      }

      // Redirect based on business_name
      if (mounted) {
        if (profile?.business_name) {
          setStatus('Welcome back! Redirecting to dashboard...');
          setTimeout(() => window.location.href = '/dashboard', 500);
        } else {
          setStatus('Setting up your account...');
          setTimeout(() => window.location.href = '/onboarding', 500);
        }
      }

    } catch (error) {
      console.error('Callback error:', error);
      if (mounted) {
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
      </div>
    </div>
  );
};

export default AuthCallbackPage;

