/**
 * Authentication & Authorization Security Utilities
 * Server-side validation patterns and client-side helpers
 */

import { supabase } from '@/integrations/supabase/client';

// ============================================
// TYPE DEFINITIONS
// ============================================

export type AppRole = 'user' | 'moderator' | 'admin' | 'super_admin';

export interface UserWithRoles {
  id: string;
  email?: string;
  roles: AppRole[];
  primary_role?: AppRole;
}

// ============================================
// CRITICAL SECURITY NOTICE
// ============================================

/**
 * ⚠️ SECURITY WARNING ⚠️
 * 
 * Client-side role checks are ONLY for UI/UX purposes.
 * They control what the user SEES, not what they can DO.
 * 
 * ALL security-critical operations MUST be validated server-side using:
 * 1. Row Level Security (RLS) policies in Supabase
 * 2. The has_role() database function
 * 3. Edge functions with proper JWT validation
 * 
 * NEVER trust client-side role information for authorization.
 * Attackers can easily modify client-side code.
 */

// ============================================
// USER ROLE FETCHING
// ============================================

/**
 * Fetch user roles from the database
 * This is for UI purposes only - do not use for authorization
 */
export async function getUserRoles(userId: string): Promise<AppRole[]> {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user roles:', error);
      return ['user'];
    }

    return data?.map(r => r.role as AppRole) || ['user'];
  } catch (error) {
    console.error('Error fetching user roles:', error);
    return ['user'];
  }
}

/**
 * Fetch current user with their roles
 * This is for UI purposes only
 */
export async function getCurrentUserWithRoles(): Promise<UserWithRoles | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const roles = await getUserRoles(user.id);
    const primary_role = determinePrimaryRole(roles);

    return {
      id: user.id,
      email: user.email,
      roles,
      primary_role,
    };
  } catch (error) {
    console.error('Error getting current user with roles:', error);
    return null;
  }
}

/**
 * Determine the highest priority role
 */
export function determinePrimaryRole(roles: AppRole[]): AppRole {
  const roleHierarchy: AppRole[] = ['super_admin', 'admin', 'moderator', 'user'];
  
  for (const role of roleHierarchy) {
    if (roles.includes(role)) {
      return role;
    }
  }
  
  return 'user';
}

// ============================================
// CLIENT-SIDE ROLE CHECKS (UI ONLY)
// ============================================

/**
 * Check if user has a specific role (CLIENT-SIDE ONLY - FOR UI)
 * ⚠️ DO NOT USE FOR AUTHORIZATION
 */
export function hasRole(roles: AppRole[], requiredRole: AppRole): boolean {
  return roles.includes(requiredRole);
}

/**
 * Check if user has any of the specified roles (CLIENT-SIDE ONLY - FOR UI)
 * ⚠️ DO NOT USE FOR AUTHORIZATION
 */
export function hasAnyRole(roles: AppRole[], requiredRoles: AppRole[]): boolean {
  return requiredRoles.some(role => roles.includes(role));
}

/**
 * Check if user has all of the specified roles (CLIENT-SIDE ONLY - FOR UI)
 * ⚠️ DO NOT USE FOR AUTHORIZATION
 */
export function hasAllRoles(roles: AppRole[], requiredRoles: AppRole[]): boolean {
  return requiredRoles.every(role => roles.includes(role));
}

/**
 * Check if user is admin or super admin (CLIENT-SIDE ONLY - FOR UI)
 * ⚠️ DO NOT USE FOR AUTHORIZATION
 */
export function isAdmin(roles: AppRole[]): boolean {
  return hasAnyRole(roles, ['admin', 'super_admin']);
}

/**
 * Check if user is super admin (CLIENT-SIDE ONLY - FOR UI)
 * ⚠️ DO NOT USE FOR AUTHORIZATION
 */
export function isSuperAdmin(roles: AppRole[]): boolean {
  return hasRole(roles, 'super_admin');
}

// ============================================
// AUDIT LOGGING
// ============================================

/**
 * Log admin actions for audit trail
 * Uses the database function created in the migration
 */
export async function logAdminAction(
  action: string,
  targetTable?: string,
  targetId?: string,
  changes?: Record<string, any>
) {
  try {
    const { data, error } = await supabase.rpc('log_admin_action', {
      _action: action,
      _target_table: targetTable || null,
      _target_id: targetId || null,
      _changes: changes ? JSON.stringify(changes) : null,
    });

    if (error) {
      console.error('Failed to log admin action:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error logging admin action:', error);
    return null;
  }
}

// ============================================
// SECURE IMPERSONATION
// ============================================

/**
 * Start an impersonation session (SUPER ADMIN ONLY)
 * This creates a secure server-side session
 */
export async function startImpersonation(targetUserId: string): Promise<{
  success: boolean;
  sessionToken?: string;
  error?: string;
}> {
  try {
    // Verify current user is super admin (client-side check for UX)
    const currentUser = await getCurrentUserWithRoles();
    if (!currentUser || !isSuperAdmin(currentUser.roles)) {
      return {
        success: false,
        error: 'Unauthorized: Super admin access required',
      };
    }

    // Generate secure session token
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

    // Create impersonation session (RLS will validate server-side)
    const { data, error } = await supabase
      .from('impersonation_sessions')
      .insert({
        admin_user_id: currentUser.id,
        target_user_id: targetUserId,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to create impersonation session:', error);
      return {
        success: false,
        error: 'Failed to create impersonation session',
      };
    }

    // Log the impersonation action
    await logAdminAction('impersonation_started', 'impersonation_sessions', data.id, {
      target_user_id: targetUserId,
    });

    return {
      success: true,
      sessionToken,
    };
  } catch (error) {
    console.error('Error starting impersonation:', error);
    return {
      success: false,
      error: 'An error occurred while starting impersonation',
    };
  }
}

/**
 * End an impersonation session
 */
export async function endImpersonation(sessionToken: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('impersonation_sessions')
      .update({ ended_at: new Date().toISOString() })
      .eq('session_token', sessionToken);

    if (error) {
      console.error('Failed to end impersonation session:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error ending impersonation:', error);
    return false;
  }
}

/**
 * Validate an impersonation session
 * Uses the database function created in the migration
 */
export async function validateImpersonation(sessionToken: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.rpc('validate_impersonation_session', {
      _session_token: sessionToken,
    });

    if (error) {
      console.error('Failed to validate impersonation session:', error);
      return null;
    }

    return data; // Returns target_user_id or null
  } catch (error) {
    console.error('Error validating impersonation:', error);
    return null;
  }
}

// ============================================
// SESSION SECURITY
// ============================================

/**
 * Check if current session is valid
 */
export async function isSessionValid(): Promise<boolean> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session !== null;
  } catch {
    return false;
  }
}

/**
 * Refresh the current session
 */
export async function refreshSession(): Promise<boolean> {
  try {
    const { data, error } = await supabase.auth.refreshSession();
    return !error && data.session !== null;
  } catch {
    return false;
  }
}

/**
 * Sign out and clear all local data
 */
export async function secureSignOut(): Promise<void> {
  try {
    await supabase.auth.signOut();
    // Clear any sensitive local storage
    localStorage.removeItem('impersonated_user_id'); // Legacy cleanup
    // Add any other cleanup as needed
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
}
