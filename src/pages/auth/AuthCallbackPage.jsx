import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase';

const AuthCallbackPage = () => {
  const [status, setStatus] = useState('Verifying authentication...');
  const [hasProcessed, setHasProcessed] = useState(false);

  useEffect(() => {
    let mounted = true;
    let redirectTimeoutId;
    let subscription;

    const processUser = async (user) => {
      if (!mounted || !user || hasProcessed) return;
      setHasProcessed(true);

      try {
        // Check if user profile exists and has business_name
        setStatus('Checking your profile...');
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('business_name, full_name, email, phone')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Profile fetch error:', profileError);
        }

        // If profile doesn't exist, create one with basic info from OAuth
        if (!profile) {
          if (!mounted) return;
          setStatus('Setting up your account...');
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
            });

          if (insertError) {
            console.error('Profile creation error:', insertError);
            // If it's a duplicate key error, profile might have been created, try fetching again
            if (insertError.code === '23505') {
              // Profile was created, fetch it
              const { data: newProfile } = await supabase
                .from('profiles')
                .select('business_name, full_name, email, phone')
                .eq('id', user.id)
                .maybeSingle();
              
              if (newProfile?.business_name) {
                if (mounted) {
                  setStatus('Welcome back! Redirecting to dashboard...');
                  redirectTimeoutId = setTimeout(() => {
                    window.location.href = '/dashboard';
                  }, 1000);
                }
                return;
              } else {
                if (mounted) {
                  setStatus('Welcome! Setting up your account...');
                  redirectTimeoutId = setTimeout(() => {
                    window.location.href = '/onboarding';
                  }, 1000);
                }
                return;
              }
            } else {
              throw insertError;
            }
          }

          // New user - redirect to onboarding
          if (mounted) {
            setStatus('Welcome! Setting up your account...');
            redirectTimeoutId = setTimeout(() => {
              window.location.href = '/onboarding';
            }, 1000);
          }
          return;
        }

        if (!mounted) return;

        // Check if user has completed onboarding (has business_name)
        if (profile.business_name) {
          // Existing user with business - redirect to dashboard
          setStatus('Welcome back! Redirecting to dashboard...');
          redirectTimeoutId = setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1000);
        } else {
          // New user without business - redirect to onboarding
          setStatus('Welcome! Setting up your account...');
          redirectTimeoutId = setTimeout(() => {
            window.location.href = '/onboarding';
          }, 1000);
        }
      } catch (error) {
        console.error('Process user error:', error);
        if (mounted) {
          setStatus('An error occurred. Redirecting to login...');
          redirectTimeoutId = setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        }
      }
    };

    // Set up auth state change listener FIRST - this is critical for OAuth
    // This listener will fire when Supabase processes the hash
    let authStateChangeFired = false;
    let sessionFromEvent = null;
    
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change event:', event, 'User ID:', session?.user?.id);
      authStateChangeFired = true;
      sessionFromEvent = session;
      
      if (event === 'SIGNED_IN' && session?.user && mounted && !hasProcessed) {
        console.log('SIGNED_IN event received, processing user...');
        await processUser(session.user);
      } else if (event === 'TOKEN_REFRESHED' && session?.user && mounted && !hasProcessed) {
        console.log('TOKEN_REFRESHED event received, processing user...');
        await processUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        if (mounted) {
          setStatus('Not authenticated. Redirecting to login...');
          redirectTimeoutId = setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
        }
      }
    });
    subscription = authSubscription;

    // Also check for existing session immediately
    const checkSession = async () => {
      try {
        console.log('Callback page loaded. URL:', window.location.href.substring(0, 100) + '...');
        console.log('Hash exists:', !!window.location.hash);
        
        // If hash exists, wait for auth state change event to fire
        if (window.location.hash) {
          console.log('Processing OAuth hash...');
          console.log('Hash length:', window.location.hash.length);
          
          // Wait for auth state change event to fire (up to 8 seconds)
          console.log('Waiting for auth state change event...');
          let waited = 0;
          const maxWait = 8000;
          
          while (!authStateChangeFired && waited < maxWait && mounted && !hasProcessed) {
            await new Promise(resolve => setTimeout(resolve, 100));
            waited += 100;
          }
          
          console.log('Auth state change fired:', authStateChangeFired, 'Waited:', waited, 'ms');
          
          // If we got a session from the event, use it
          if (sessionFromEvent?.user && mounted && !hasProcessed) {
            console.log('Using session from auth state change event, user ID:', sessionFromEvent.user.id);
            await processUser(sessionFromEvent.user);
            return;
          }
          
          // If event didn't fire, try getSession as fallback with timeout
          if (!authStateChangeFired) {
            console.log('Auth state change did not fire, trying getSession with timeout...');
            try {
              // Use Promise.race to add a timeout to getSession
              const sessionPromise = supabase.auth.getSession();
              const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('getSession timeout')), 3000)
              );
              
              const { data: { session }, error: sessionError } = await Promise.race([
                sessionPromise,
                timeoutPromise
              ]).catch(err => {
                console.error('getSession timeout or error:', err);
                return { data: { session: null }, error: err };
              });
              
              console.log('getSession result:', {
                hasSession: !!session,
                hasUser: !!session?.user,
                userId: session?.user?.id,
                error: sessionError?.message || null
              });

              if (sessionError && sessionError.message !== 'getSession timeout') {
                console.error('Session error:', sessionError);
              }
              
              if (session?.user && mounted && !hasProcessed) {
                console.log('Session found via getSession, user ID:', session.user.id);
                await processUser(session.user);
                return;
              }
              
              // If getSession didn't work, try manually parsing the hash
              console.log('getSession failed, trying to manually parse hash...');
              const hashParams = new URLSearchParams(window.location.hash.substring(1));
              const accessToken = hashParams.get('access_token');
              const refreshToken = hashParams.get('refresh_token');
              
              console.log('Hash params:', {
                hasAccessToken: !!accessToken,
                hasRefreshToken: !!refreshToken,
                accessTokenLength: accessToken?.length,
                refreshTokenLength: refreshToken?.length
              });
              
              if (accessToken && refreshToken) {
                console.log('Found tokens in hash, decoding JWT to get user info...');
                try {
                  // Decode JWT to get user info (base64 decode the payload)
                  const base64Url = accessToken.split('.')[1];
                  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                  }).join(''));
                  
                  const tokenData = JSON.parse(jsonPayload);
                  console.log('Decoded token data:', {
                    userId: tokenData.sub,
                    email: tokenData.email,
                    hasUserMetadata: !!tokenData.user_metadata
                  });
                  
                  // Create a user-like object from the token
                  const userFromToken = {
                    id: tokenData.sub,
                    email: tokenData.email,
                    user_metadata: tokenData.user_metadata || {}
                  };
                  
                  // Store tokens in localStorage for Supabase to use later
                  localStorage.setItem('sb-tokens', JSON.stringify({
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    expires_at: hashParams.get('expires_at')
                  }));
                  
                  // Try setSession one more time, but don't wait too long
                  console.log('Attempting setSession (non-blocking)...');
                  supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: refreshToken
                  }).then(({ data, error }) => {
                    if (!error && data?.session) {
                      console.log('setSession completed in background');
                    }
                  }).catch(err => {
                    console.log('setSession error (non-blocking):', err);
                  });
                  
                  // Process user immediately with token data
                  if (mounted && !hasProcessed) {
                    console.log('Processing user from token, user ID:', userFromToken.id);
                    await processUser(userFromToken);
                    return;
                  }
                } catch (decodeError) {
                  console.error('Error decoding token:', decodeError);
                  if (mounted && !hasProcessed) {
                    setStatus('Failed to decode token. Redirecting to login...');
                    redirectTimeoutId = setTimeout(() => {
                      window.location.href = '/login';
                    }, 2000);
                  }
                }
              } else {
                console.error('Missing tokens in hash:', { accessToken: !!accessToken, refreshToken: !!refreshToken });
                if (mounted && !hasProcessed) {
                  setStatus('Invalid authentication tokens. Redirecting to login...');
                  redirectTimeoutId = setTimeout(() => {
                    window.location.href = '/login';
                  }, 2000);
                }
              }
            } catch (getSessionError) {
              console.error('getSession error:', getSessionError);
            }
          }
        } else {
          // No hash - check for existing session
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error('Session error:', sessionError);
          }
          
          if (session?.user && mounted && !hasProcessed) {
            console.log('Found existing session, user ID:', session.user.id);
            await processUser(session.user);
            return;
          }
        }

        // Final check - if still no session after waiting
        if (mounted && !hasProcessed) {
          console.log('No session found after all attempts');
          console.log('Hash still present:', !!window.location.hash);
          console.log('Auth state change fired:', authStateChangeFired);
          
          // If hash exists but no session, wait a bit more for auth state change
          if (window.location.hash && !authStateChangeFired) {
            console.log('Waiting for auth state change event...');
            setStatus('Processing authentication...');
            // Wait up to 5 more seconds for auth state change
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            // Final attempt
            const { data: { session: finalSession } } = await supabase.auth.getSession();
            if (finalSession?.user && mounted && !hasProcessed) {
              console.log('Session found on final attempt');
              await processUser(finalSession.user);
              return;
            }
          }
          
          setStatus('No session found. Redirecting to login...');
          redirectTimeoutId = setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        }
      } catch (error) {
        console.error('Check session error:', error);
        if (mounted && !hasProcessed) {
          setStatus('An error occurred. Redirecting to login...');
          redirectTimeoutId = setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        }
      }
    };

    checkSession();

    return () => {
      mounted = false;
      if (redirectTimeoutId) clearTimeout(redirectTimeoutId);
      if (subscription) subscription.unsubscribe();
    };
  }, [hasProcessed]);

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

