"use client";

import { AlertCircle, Mail, ArrowLeft } from "lucide-react";

interface AuthErrorProps {
  error?: string;
  email?: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export function AuthError({ error, email, onRetry, onBack }: AuthErrorProps) {
  const isEmailFormatError =
    error?.includes("format") || error?.includes("invalid");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Authentication Failed
          </h1>
          <p className="text-gray-600">
            {isEmailFormatError
              ? "There was an issue with your email address"
              : "There was a problem signing you in"}
          </p>
        </div>

        <div className="space-y-4">
          {isEmailFormatError ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <Mail className="h-5 w-5 text-yellow-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-yellow-800">
                    Please make sure you're using a valid email address format.
                    {email && (
                      <span className="block mt-2 font-medium">
                        You tried to sign in with: <strong>{email}</strong>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-red-800">
                    {error ||
                      "An unexpected error occurred during authentication. Please try again."}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="text-sm text-gray-600 space-y-2">
            <p>If this problem persists, please:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Check your internet connection</li>
              <li>Try using a different browser</li>
              <li>Clear your browser cache and cookies</li>
              <li>Contact support if the issue continues</li>
            </ul>
          </div>

          <div className="flex flex-col gap-2 pt-4">
            {onRetry && (
              <button
                onClick={onRetry}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            )}

            {onBack && (
              <button
                onClick={onBack}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthError;
