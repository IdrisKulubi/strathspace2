import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, Shield, Settings } from 'lucide-react';

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check if user is authenticated and has admin role
  if (!session?.user) {
    redirect('/login');
  }

  if (session.user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
          <p className="text-sm text-muted-foreground mt-2">Your role: {session.user.role || 'user'}</p>
          <p className="text-xs text-muted-foreground mt-4">
            Contact an administrator to request admin access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor StrathSpace</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/auth">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Authentication</CardTitle>
                    <CardDescription>Monitor auth metrics</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View authentication analytics, performance metrics, and error tracking
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="opacity-50">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <Users className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>Coming soon</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage users, profiles, and permissions
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <Shield className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Coming soon</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Security settings and audit logs
              </p>
            </CardContent>
          </Card>

          <Card className="opacity-50">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <Settings className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>Coming soon</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                System configuration and preferences
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}