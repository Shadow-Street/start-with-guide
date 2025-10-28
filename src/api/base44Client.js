import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with Base44 App ID from environment variables
// This is a public identifier similar to Supabase's anon key
export const base44 = createClient({
  appId: import.meta.env.VITE_BASE44_APP_ID, 
  requiresAuth: false // Public API access enabled for community features
});
