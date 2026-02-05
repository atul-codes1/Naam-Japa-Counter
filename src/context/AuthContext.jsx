import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/services/supabase';
import { syncOnLogin } from '@/services/syncService';
import LoginModal from '@/components/auth/LoginModal';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', _event, session?.user?.email);
      setUser(session?.user ?? null);
      setSession(session);

      // If user just logged in (NEW login, not existing session), sync data
      // IMPORTANT: Only sync on SIGNED_IN, not INITIAL_SESSION (which fires on page load)
      if (session?.user && _event === 'SIGNED_IN') {
        setIsSyncing(true);

        // Create/update user profile with error handling
        console.log('📝 Creating user profile for:', session.user.email);
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .upsert({
            user_id: session.user.id,
            display_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Devotee',
            avatar_url: session.user.user_metadata?.avatar_url || null
          });

        if (profileError) {
          console.error('❌ Profile creation failed:', profileError);
        } else {
          console.log('✅ Profile created:', profileData);
        }

        await syncOnLogin(session.user.id);
        setIsSyncing(false);

        // NO PAGE RELOAD - just navigate
        if (window.location.hash.includes('access_token')) {
          window.history.replaceState(null, '', '/');
          navigate('/', { replace: true });
        } else if (redirectAfterLogin) {
          navigate(redirectAfterLogin, { replace: true });
          setRedirectAfterLogin(null);
        } else {
          navigate('/', { replace: true });
        }
      }

      // If restoring existing session (page refresh), don't show modal or reload
      if (session?.user && _event === 'INITIAL_SESSION') {
        console.log('✅ Existing session restored, no sync needed');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, redirectAfterLogin]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`
      }
    });

    if (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const signOut = () => {
    console.log('🚪 Logout clicked!');

    // Clear Supabase session storage directly
    localStorage.removeItem('sb-' + window.location.hostname.split('.')[0] + '-auth-token');

    // Force reload to clear all state
    window.location.replace('/');
  };

  const openLogin = React.useCallback((redirectPath = null) => {
    if (redirectPath) setRedirectAfterLogin(redirectPath);
    setIsLoginOpen(true);
  }, []);

  const closeLogin = React.useCallback(() => setIsLoginOpen(false), []);

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signInWithGoogle,
      signOut,
      openLogin,
      closeLogin,
      isAuthenticated: !!user,
      isSyncing
    }}>
      {children}
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
