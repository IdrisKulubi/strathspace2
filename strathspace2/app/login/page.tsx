'use client';

import { Heart, Sparkles, Chrome } from 'lucide-react';
import Button from '../../components/ui/Buttons';
import { authClient } from '../lib/auth-client';

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-brand-pink/10 via-brand-blue/10 to-brand-yellow/10 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-pink/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 animate-fade-up">
          <a href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-pink">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <span className="text-3xl font-bold font-heading text-brand-dark">
              StrathSpace
            </span>
          </a>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-brand-pink animate-pulse" />
            <h1 className="text-3xl font-bold text-brand-dark">
              Welcome Back
            </h1>
            <Sparkles className="w-5 h-5 text-brand-pink animate-pulse" />
          </div>
          <p className="text-gray-600">
            Sign in with your university Google account to continue
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 border-white animate-fade-up">
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6 animate-glow-pulse">
                <Chrome className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-xl font-bold text-brand-dark mb-2">
                Sign in with Google
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Use your university email address to access StrathSpace
              </p>
            </div>

            <Button
              onClick={handleGoogleLogin}
              variant="primary"
              size="lg"
              className="w-full group"
              icon={
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              }
            >
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Why Google?</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-brand-dark text-sm">
                    University Verified
                  </p>
                  <p className="text-xs text-gray-600">
                    Only students with verified university emails can join
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-brand-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-brand-dark text-sm">
                    Secure & Private
                  </p>
                  <p className="text-xs text-gray-600">
                    Your data is protected with Google's security infrastructure
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-brand-pink"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-brand-dark text-sm">
                    One-Click Access
                  </p>
                  <p className="text-xs text-gray-600">
                    No passwords to remember, just seamless authentication
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-brand-pink hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-brand-pink hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-pink-400 to-rose-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-cyan-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-400 to-orange-400 border-2 border-white"></div>
            </div>
            <span className="text-sm font-medium text-gray-700">
              Join <span className="text-brand-pink font-bold">2,500+</span> students
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-pink transition-colors duration-300"
          >
            <span>← Back to home</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
