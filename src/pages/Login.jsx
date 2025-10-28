import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogIn, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getUserRoles, determinePrimaryRole } from '@/lib/security/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        redirectToDashboard(session.user.id);
      }
    };
    checkSession();
  }, []);

  const redirectToDashboard = async (userId) => {
    try {
      const roles = await getUserRoles(userId);
      const primaryRole = determinePrimaryRole(roles);

      const roleRoutes = {
        super_admin: '/SuperAdmin',
        admin: '/AdminPanel',
        fund_manager: '/FundManager',
        advisor: '/AdvisorDashboard',
        finfluencer: '/FinfluencerDashboard',
        organizer: '/OrganizerDashboard',
        vendor: '/VendorDashboard',
        investor: '/InvestorDashboard',
      };

      navigate(roleRoutes[primaryRole] || '/Dashboard');
    } catch (error) {
      console.error('Error redirecting:', error);
      navigate('/Dashboard');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      if (data.user) {
        toast.success('Welcome back!');
        await redirectToDashboard(data.user.id);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Invalid email or password');
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mx-auto flex items-center justify-center mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/Register" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign up
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link to="/Dashboard" className="text-sm text-muted-foreground hover:text-foreground">
              Continue as guest
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
