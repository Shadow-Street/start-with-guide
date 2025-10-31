

import React, { useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, LogOut, Settings, User as UserIcon, LayoutDashboard, MessageSquare, BarChart3, CalendarDays, Shield, Star, GraduationCap, Sparkles, Users, Wallet, Crown, ChevronDown, Edit3, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { api } from "@/api";
import RealtimeNotificationBell from "@/components/notifications/RealtimeNotificationBell";
import { EntityConfigProvider } from "@/components/context/EntityConfigProvider";
import { SubscriptionProvider } from "@/components/context/SubscriptionProvider";
import { getUserRoles } from "@/lib/security/auth";

function InnerLayout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [userRoles, setUserRoles] = useState([]);

  const isPublicPage = ['/contact', '/Login', '/Register'].includes(location.pathname);
  
  // Check if this is the SuperAdmin page
  const isSuperAdminPage = location.pathname === createPageUrl('SuperAdmin') || currentPageName === 'SuperAdmin';

  useEffect(() => {
    let isMounted = true;
    
    // Function to load user data (optimized with parallel fetching)
    const loadUserData = async (session) => {
      if (!session?.user || !isMounted) return;

      const userId = session.user.id;
      console.log('Loading user data for:', userId);
      
      try {
        // Immediately set guest mode to false since we have a session
        setIsGuestMode(false);
        
        // Fetch profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (profileError) {
          console.log('Profile error:', profileError);
          // If profile doesn't exist, create one
          if (profileError.code === 'PGRST116') {
            const { data: newProfile, error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: userId,
                username: session.user.email?.split('@')[0],
                full_name: session.user.user_metadata?.full_name || '',
              })
              .select()
              .single();
            
            if (!insertError && newProfile && isMounted) {
              // Load roles for new profile
              const roles = await getUserRoles(userId).catch(() => ['user']);
              const userWithRoles = { 
                id: userId, 
                ...newProfile, 
                email: session.user.email,
                roles: roles,
                primaryRole: roles[0] || 'user',
                app_role: roles[0] || 'user'
              };
              console.log('User created and loaded:', userWithRoles);
              setUser(userWithRoles);
              setUserRoles(roles);
              setIsGuestMode(false);
            }
          }
        } else if (profile && isMounted) {
          // Load roles first
          const roles = await getUserRoles(userId).catch(() => ['user']);
          const isAdmin = roles.includes('super_admin') || roles.includes('admin');
          
          // Create user object with roles included
          const userWithRoles = { 
            id: userId, 
            ...profile, 
            email: session.user.email,
            roles: roles,
            primaryRole: roles.includes('super_admin') ? 'super_admin' : 
                        roles.includes('admin') ? 'admin' : 
                        roles.includes('moderator') ? 'moderator' : 'user',
            app_role: roles.includes('super_admin') ? 'super_admin' : 
                     roles.includes('admin') ? 'admin' : 
                     roles.includes('moderator') ? 'moderator' : 'user'
          };
          
          console.log('User loaded:', userWithRoles);
          setUser(userWithRoles);
          setUserRoles(roles);
          setIsGuestMode(false);
          
          // Check subscription only if not admin
          if (!isAdmin) {
            api.getSubscriptions({ user_id: userId, status: 'active' })
              .then(subs => isMounted && setIsSubscribed(subs.length > 0))
              .catch(() => isMounted && setIsSubscribed(false));
          } else {
            setIsSubscribed(true);
          }
        }
      } catch (err) {
        console.error('Error loading user data:', err);
        // Even if there's an error, if we have a session, don't show guest mode
        if (session?.user && isMounted) {
          setIsGuestMode(false);
        }
      }
    };
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) return;

        console.log('Auth state changed:', event, !!session);
        setSession(session);
        setIsAuthCheckComplete(true);
        
        if (session?.user) {
          console.log('User session detected, loading user data');
          // Immediately set guest mode to false
          setIsGuestMode(false);
          // Load user data asynchronously without blocking
          setTimeout(() => loadUserData(session), 0);
        } else {
          console.log('No session, setting guest mode');
          setUser(null);
          setUserRoles([]);
          setIsSubscribed(false);
          setIsGuestMode(true);
        }
      }
    );

    // Check for existing session immediately
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        console.log('Initial auth check:', !!session, error);
        
        if (error) {
          // Handle SecurityError specifically
          if (error.message?.includes('LockManager')) {
            console.warn('LockManager error detected, attempting fallback auth check');
            // Fallback: Try to get user directly
            try {
              const { data: { user } } = await supabase.auth.getUser();
              if (user) {
                const fallbackSession = { user, access_token: null, refresh_token: null };
                setSession(fallbackSession);
                setIsAuthCheckComplete(true);
                setIsGuestMode(false);
                setTimeout(() => loadUserData(fallbackSession), 0);
                return;
              }
            } catch (fallbackError) {
              console.error('Fallback auth check failed:', fallbackError);
            }
          }
          setIsAuthCheckComplete(true);
          setIsGuestMode(true);
        } else if (!session) {
          setIsAuthCheckComplete(true);
          setIsGuestMode(true);
        } else {
          console.log('Initial session found, loading user');
          setSession(session);
          setIsAuthCheckComplete(true);
          // Immediately set guest mode to false
          setIsGuestMode(false);
          // Load data async without blocking UI
          setTimeout(() => loadUserData(session), 0);
        }
      } catch (err) {
        console.error('Auth init error:', err);
        // Try fallback for LockManager errors
        if (err.message?.includes('LockManager')) {
          try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user && isMounted) {
              const fallbackSession = { user, access_token: null, refresh_token: null };
              setSession(fallbackSession);
              setIsAuthCheckComplete(true);
              setIsGuestMode(false);
              setTimeout(() => loadUserData(fallbackSession), 0);
              return;
            }
          } catch (fallbackError) {
            console.error('Fallback failed:', fallbackError);
          }
        }
        if (isMounted) {
          setIsAuthCheckComplete(true);
          setIsGuestMode(true);
        }
      }
    };

    initAuth();

    // Quick fallback timeout
    const timeout = setTimeout(() => {
      if (isMounted && !isAuthCheckComplete) {
        setIsAuthCheckComplete(true);
        setIsGuestMode(true);
      }
    }, 1000);
    
    return () => {
      isMounted = false;
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setUserRoles([]);
      setIsSubscribed(false);
      setIsGuestMode(true);
      window.location.href = '/Login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const displayNavigationItems = useMemo(() => {
    if (!isAuthCheckComplete) {
        return [];
    }

    // ✅ HARDCODED ORDER - Fixed sequence
    const hardcodedOrder = [
      { key: 'dashboard', title: 'Dashboard', url: createPageUrl('Dashboard'), icon: LayoutDashboard, badge: null },
      { key: 'my_portfolio', title: 'My Portfolio', url: createPageUrl('MyPortfolio'), icon: Wallet, badge: null },
      { key: 'chat_rooms', title: 'Chat Rooms', url: createPageUrl('ChatRooms'), icon: MessageSquare, badge: null },
      { key: 'polls', title: 'Community Polls', url: createPageUrl('Polls'), icon: BarChart3, badge: null },
      { key: 'events', title: 'Events', url: createPageUrl('Events'), icon: CalendarDays, badge: null },
      { key: 'advisors', title: 'Advisors', url: createPageUrl('Advisors'), icon: Shield, badge: null },
      { key: 'finfluencers', title: 'Finfluencers', url: createPageUrl('Finfluencers'), icon: Star, badge: null },
      { key: 'educators', title: 'Educators', url: createPageUrl('Educators'), icon: GraduationCap, badge: null },
      { key: 'subscription', title: 'Subscription', url: createPageUrl('Subscription'), icon: Sparkles, badge: null },
      { key: 'feedback', title: 'Feedback', url: createPageUrl('Feedback'), icon: MessageSquare, badge: null },
    ];

    // In guest mode, show all items but mark premium ones
    if (isGuestMode) {
      return hardcodedOrder.map(item => {
        if (['advisors', 'finfluencers', 'educators'].includes(item.key)) {
          return {
            ...item,
            badge: {
              text: 'Premium',
              color: 'bg-purple-50 text-purple-700 border-purple-200'
            }
          };
        }
        return item;
      });
    }

    // Filter based on user role and subscription
    const filteredItems = hardcodedOrder.filter(item => {
      // Always show basic items
      if (['dashboard', 'my_portfolio', 'chat_rooms', 'polls', 'events', 'subscription', 'feedback'].includes(item.key)) {
        return true;
      }

      // Advisors, Finfluencers, Educators - show for subscribed users or admins
      if (['advisors', 'finfluencers', 'educators'].includes(item.key)) {
        return isSubscribed || userRoles.includes('admin') || userRoles.includes('super_admin');
      }

      return true;
    });

    // Add subscription badge
    const itemsWithBadges = filteredItems.map(item => {
      if (item.key === 'subscription' && user && !userRoles.includes('admin') && !userRoles.includes('super_admin') && !userRoles.includes('vendor')) {
        return {
          ...item,
          badge: isSubscribed ? {
            text: 'Active',
            color: 'bg-green-50 text-green-700 border-green-200'
          } : {
            text: 'Premium',
            color: 'bg-purple-50 text-purple-700 border-purple-200'
          }
        };
      }
      return item;
    });

    // Add "Organize Events" for specific roles
    if (user && (userRoles.includes('advisor') || userRoles.includes('finfluencer') || userRoles.includes('educator'))) {
      itemsWithBadges.splice(5, 0, {
        key: 'organize_events',
        title: 'Organize Events',
        url: createPageUrl('OrganizerDashboard'),
        icon: CalendarDays,
        badge: null
      });
    }

    return itemsWithBadges;

  }, [user, isAuthCheckComplete, isSubscribed, isGuestMode, userRoles]);

  if (!isAuthCheckComplete) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <style>{`
        .sidebar-logo img {
          width: 180px;
          height: auto;
          object-fit: contain;
        }
        .sidebar-content-scrollable {
          overflow-y: auto;
          max-height: calc(100vh - 200px);
        }
        .sidebar-content-scrollable::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-content-scrollable::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-content-scrollable::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .sidebar-content-scrollable::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200 bg-white hidden md:flex md:flex-col">
          <SidebarHeader className="border-b border-gray-200">
            <div className="sidebar-logo">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68bb21f4e5ccdcab161121f6/1dc7cf9b7_FinancialNetworkingLogoProtocol.png"
                alt="Protocol Logo"
              />
            </div>
          </SidebarHeader>

          <SidebarContent className="sidebar-content-scrollable flex-1 flex flex-col gap-2 overflow-y-auto p-3">

            {/* Logged In User Profile */}
            {user && (
              <div className="mb-4">
                <Link to={createPageUrl("Profile")} className="block">
                  <div className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 cursor-pointer text-white relative group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {user.profile_image_url ? (
                          <img src={user.profile_image_url} alt={user.display_name} className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          user.display_name?.charAt(0)?.toUpperCase() || 'U'
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate text-sm">{user.display_name || 'Trader'}</p>
                        <p className="text-xs text-white/80 mt-0.5">View Profile & Settings</p>
                      </div>
                      {/* Settings Icon - Shows on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Settings className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-2">
                Trading Hub
              </SidebarGroupLabel>
              <SidebarMenu>
                {displayNavigationItems.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      asChild
                      className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 transition-all duration-200 rounded-xl mb-1 ${
                        location.pathname === item.url ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md' : ''
                      }`}
                    >
                      <Link to={item.url} className="flex items-center gap-3 px-3 py-2.5">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="outline" className={`ml-auto text-xs ${item.badge.color}`}>
                            {item.badge.text}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupContent>
                <div className="px-3 py-2 space-y-3">
                  {!isSubscribed && !isGuestMode && user && !['admin', 'super_admin', 'vendor'].includes(user.app_role) && ( 
                    <Link to={createPageUrl("Subscription")} className="block">
                      <div className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white shadow-md cursor-pointer hover:shadow-lg transition-all">
                        <h3 className="text-sm font-semibold flex items-center gap-2">
                          <Crown className="w-4 h-4"/>
                          Upgrade to Premium
                        </h3>
                        <p className="text-xs opacity-80 mt-1">Unlock advisor picks, premium polls, and exclusive content</p>
                      </div>
                    </Link>
                  )}
                  
                  {isGuestMode && (
                    <Link to={createPageUrl("Subscription")} className="block">
                      <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-white shadow-md cursor-pointer hover:shadow-lg transition-all">
                        <h3 className="text-sm font-semibold flex items-center gap-2">
                          <Crown className="w-4 h-4"/>
                          Create Free Account
                        </h3>
                        <p className="text-xs opacity-80 mt-1">Save your portfolio, join discussions, and more</p>
                      </div>
                    </Link>
                  )}
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                      {user.profile_image_url ? (
                        <img src={user.profile_image_url} alt={user.display_name} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        user.display_name?.charAt(0)?.toUpperCase() || 'U'
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.display_name || 'User'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl("Profile")} className="flex items-center gap-2 cursor-pointer">
                      <UserIcon className="w-4 h-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/Login">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 cursor-pointer transition-all text-white">
                  <LogIn className="w-5 h-5" />
                  <span className="font-semibold">Login / Sign Up</span>
                </div>
              </Link>
            )}
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">{currentPageName || 'Protocol'}</h1>
            <div className="flex items-center gap-4">
              {user && <RealtimeNotificationBell />}
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-gray-50">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <SubscriptionProvider>
      <EntityConfigProvider>
        <InnerLayout currentPageName={currentPageName}>{children}</InnerLayout>
      </EntityConfigProvider>
    </SubscriptionProvider>
  );
}

