'use client';

import { useSession } from '../lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome to StrathSpace Dashboard
            </h1>
            <button
              onClick={() => {
                // Sign out logic would go here
                router.push('/login');
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                User Information
              </h2>
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {session.user.name}</p>
                <p><strong>Email:</strong> {session.user.email}</p>
                <p><strong>User ID:</strong> {session.user.id}</p>
                {session.user.image && (
                  <div className="mt-3">
                    <img 
                      src={session.user.image} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-green-900 mb-2">
                Authentication Status
              </h2>
              <div className="space-y-2 text-sm">
                <p><strong>Status:</strong> <span className="text-green-600">Authenticated</span></p>
                <p><strong>Session Active:</strong> Yes</p>
                <p><strong>Email Verified:</strong> {session.user.emailVerified ? 'Yes' : 'No'}</p>
                <p><strong>Provider:</strong> Google OAuth</p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 md:col-span-2">
              <h2 className="text-lg font-semibold text-yellow-900 mb-2">
                🎉 New Feature: All Email Domains Accepted!
              </h2>
              <p className="text-sm text-yellow-800">
                Great news! We've updated our authentication system to accept all email addresses. 
                You're no longer restricted to university emails only. This makes StrathSpace 
                accessible to a broader community while maintaining security through Google OAuth.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-md font-medium text-gray-900 mb-2">Session Data</h3>
            <pre className="text-xs text-gray-600 overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}