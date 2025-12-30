import React, { useEffect } from 'react';
import { supabase } from '../../utils/supabase';

const AuthCallbackPage = () => {
  useEffect(() => {
    const handleAuth = async () => {
      try {
        console.log('🔄 Callback started');
        
        // Wait briefly for auth to settle
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          console.error('❌ No session:', error);
          window.location.replace('/login');
          return;
        }

        console.log('✅ Session found:', session.user.id);

        // Check profile - use maybeSingle() to avoid error
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('business_name')
          .eq('id', session.user.id)
          .maybeSingle(); // ← This is KEY - won't throw error if no profile

        if (profileError) {
          console.error('Profile check error:', profileError);
        }

        console.log('📋 Profile:', profile);

        // Redirect based on profile
        if (profile?.business_name) {
          console.log('🏢 → Dashboard');
          window.location.replace('/dashboard');
        } else {
          console.log('📝 → Onboarding');
          window.location.replace('/onboarding');
        }
      } catch (error) {
        console.error('💥 Callback error:', error);
        window.location.replace('/login');
      }
    };

    handleAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-neutral-600">Processing...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;