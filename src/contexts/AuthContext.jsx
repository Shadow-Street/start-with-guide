import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { getUserRoles, determinePrimaryRole } from '@/lib/security/auth';

const AuthContext = createContext({
  user: null,
  session: null,
  profile: null,
  roles: [],
  primaryRole: 'user',
  isLoading: true,
  isAuthenticated: false,
  signOut: async () => {},
  refreshUser: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [roles, setRoles] = useState([]);
  const [primaryRole, setPrimaryRole] = useState('user');
  const [isLoading, setIsLoading] = useState(true);

  const loadUserProfile = async (userId) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return null;
      }

      return profileData;
    } catch (error) {
      console.error('Error loading profile:', error);
      return null;
    }
  };

  const loadUserRoles = async (userId) => {
    try {
      const userRoles = await getUserRoles(userId);
      const primary = determinePrimaryRole(userRoles);
      setRoles(userRoles);
      setPrimaryRole(primary);
      return userRoles;
    } catch (error) {
      console.error('Error loading roles:', error);
      setRoles(['user']);
      setPrimaryRole('user');
      return ['user'];
    }
  };

  const refreshUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUser(user);
        const profileData = await loadUserProfile(user.id);
        setProfile(profileData);
        await loadUserRoles(user.id);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Initialize auth state
    const initAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (!isMounted) return;

        if (currentSession?.user) {
          setSession(currentSession);
          setUser(currentSession.user);
          
          // Load profile and roles
          const profileData = await loadUserProfile(currentSession.user.id);
          if (isMounted) setProfile(profileData);
          
          await loadUserRoles(currentSession.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('🔐 Auth state changed:', event);

        if (!isMounted) return;

        setSession(currentSession);

        if (currentSession?.user) {
          setUser(currentSession.user);
          
          // Load profile and roles
          setTimeout(async () => {
            if (!isMounted) return;
            
            const profileData = await loadUserProfile(currentSession.user.id);
            if (isMounted) setProfile(profileData);
            
            await loadUserRoles(currentSession.user.id);
            
            if (isMounted) setIsLoading(false);
          }, 0);
        } else {
          // User logged out
          setUser(null);
          setProfile(null);
          setRoles([]);
          setPrimaryRole('user');
          setIsLoading(false);
        }
      }
    );

    initAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      setRoles([]);
      setPrimaryRole('user');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    profile,
    roles,
    primaryRole,
    isLoading,
    isAuthenticated: !!user,
    signOut,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
