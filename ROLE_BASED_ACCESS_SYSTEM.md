# Role-Based Access Control System

## Overview
This application implements a secure role-based access control (RBAC) system using Supabase with proper Row Level Security (RLS) policies.

## Database Structure

### 1. App Role Enum
```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user', 'super_admin');
```

**Available Roles:**
- `user` - Default role for all registered users (trader)
- `moderator` - Can moderate content
- `admin` - Administrative access to most features
- `super_admin` - Full system access

### 2. User Roles Table
```sql
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);
```

**Features:**
- Users can have multiple roles
- Automatically assigns 'user' role when profile is created
- Uses proper RLS policies for security

### 3. Security Function
```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

**Purpose:**
- Server-side role checking
- Used in RLS policies to prevent privilege escalation
- Cannot be bypassed from client-side

## Row Level Security Policies

### User Roles Table
1. **Users can view their own roles** - Users can see what roles they have
2. **Admins can view all roles** - Super admins and admins can see all user roles
3. **Super admins can insert/update/delete roles** - Only super admins can manage role assignments

### Profiles Table
1. **Users can view their own profile** - Users can see their own data
2. **Users can update their own profile** - Users can edit their own data
3. **Users can insert their own profile** - Profile creation on signup
4. **Admins can view all profiles** - Super admins and admins can see all user profiles

## How It Works

### 1. User Registration
When a new user registers:
1. Profile is created in `profiles` table
2. Trigger automatically creates a 'user' role entry in `user_roles` table
3. User now has basic access to the platform

### 2. Role Assignment
To grant additional roles (e.g., make someone a super_admin):

```sql
-- Insert a super_admin role for user
INSERT INTO public.user_roles (user_id, role)
VALUES ('user-uuid-here', 'super_admin');
```

### 3. Client-Side Implementation

**In Layout.jsx:**
```javascript
// User object includes roles
const userWithRoles = { 
  id: userId, 
  ...profile, 
  email: session.user.email,
  roles: roles,  // Array of roles: ['user', 'super_admin']
  primaryRole: 'super_admin',  // Highest priority role
  app_role: 'super_admin'  // For backward compatibility
};
```

**Permission Checking:**
```javascript
// Check if user has super_admin role
const isSuperAdmin = user?.roles?.includes('super_admin') || 
                    user?.primaryRole === 'super_admin';

// Check if user has any admin role
const isAdmin = user?.roles?.includes('super_admin') || 
                user?.roles?.includes('admin') ||
                ['super_admin', 'admin'].includes(user?.primaryRole);
```

## Access Control by Page/Feature

### SuperAdmin Dashboard
- **Required Role:** `super_admin`
- **Features:** Full system management, user management, financial oversight
- **Access Check:** User must have `super_admin` role in `user_roles` table

### User Management
- **View Users:** `super_admin`, `admin`, `user_management_sub_admin`
- **Edit Users:** `super_admin`, `admin`
- **Manage Roles:** `super_admin` only
- **Create Users:** `super_admin` only

### Normal User (Trader) Dashboard
- **Required Role:** `user` (default)
- **Features:** Trading, portfolio management, chat rooms, polls, events
- **Access Check:** Any authenticated user

### Advisor Dashboard
- **Required Role:** `advisor` (custom role via entity system)
- **Features:** Create recommendations, manage subscriptions
- **Access Check:** User must have advisor role or super_admin

## How to Grant SuperAdmin Access

### Method 1: Via Database (Recommended)
```sql
-- Get the user's ID from profiles table
SELECT id, display_name, email FROM profiles WHERE email = 'admin@example.com';

-- Insert super_admin role
INSERT INTO public.user_roles (user_id, role)
VALUES ('uuid-from-above-query', 'super_admin')
ON CONFLICT (user_id, role) DO NOTHING;
```

### Method 2: Via Supabase Dashboard
1. Go to Table Editor
2. Select `user_roles` table
3. Insert New Row:
   - user_id: (select from profiles)
   - role: super_admin

## Security Best Practices

### ✅ DO:
- Always check roles from the `user_roles` table
- Use the `has_role()` function in RLS policies
- Check roles on both client and server side
- Use SECURITY DEFINER for role-checking functions
- Keep role checks in RLS policies, not in client code for security

### ❌ DON'T:
- Store roles on the profiles table (privilege escalation risk)
- Check admin status using localStorage/sessionStorage
- Trust client-side role checks for security decisions
- Allow users to modify their own roles
- Use app_role column on profiles for authorization

## Testing Role-Based Access

1. **Create Test Users:**
```sql
-- Create user with user role (automatic)
-- User registers normally

-- Promote user to admin
INSERT INTO user_roles (user_id, role) VALUES ('user-id', 'admin');

-- Promote user to super_admin  
INSERT INTO user_roles (user_id, role) VALUES ('user-id', 'super_admin');
```

2. **Verify Access:**
- Log in as different users
- Try accessing SuperAdmin page
- Verify proper access/denial messages

## Troubleshooting

### "Access Denied" on SuperAdmin page
**Cause:** User doesn't have super_admin role in user_roles table

**Solution:**
```sql
-- Check current roles
SELECT * FROM user_roles WHERE user_id = auth.uid();

-- Add super_admin role if missing
INSERT INTO user_roles (user_id, role) 
VALUES (auth.uid(), 'super_admin')
ON CONFLICT DO NOTHING;
```

### User can't see their own profile
**Cause:** RLS policies not properly set or session issue

**Solution:**
1. Check authentication: `SELECT auth.uid();`
2. Verify profile exists: `SELECT * FROM profiles WHERE id = auth.uid();`
3. Check RLS policies are enabled: `SELECT tablename, policyname FROM pg_policies WHERE tablename = 'profiles';`

## Future Enhancements

1. **Role Templates:** Pre-configured role bundles
2. **Time-Limited Roles:** Roles that expire after a certain period
3. **Role Hierarchy:** Automatic inheritance of permissions
4. **Audit Logging:** Track all role changes
5. **Fine-Grained Permissions:** Beyond role-based to permission-based

## Summary

This RBAC system ensures:
- ✅ Secure role management with RLS
- ✅ Server-side role validation
- ✅ Multiple roles per user support
- ✅ Automatic user role assignment
- ✅ Prevention of privilege escalation
- ✅ Clean separation of concerns
- ✅ Easy role verification and management
