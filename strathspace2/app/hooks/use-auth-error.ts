'use client';

import { useState, useCallback } from 'react';
import { EmailValidationError } from '../lib/auth/validation';

export interface AuthErrorState {
  error: string | null;
  email?: string;
  type: 'format' | 'oauth' | 'network' | 'unknown' | null;
  isRetryable: boolean;
}

const initialState: AuthErrorState = {
  error: null,
  email: undefined,
  type: null,
  isRetryable: false,
};

export function useAuthError() {
  const [errorState, setErrorState] = useState<AuthErrorState>(initialState);

  const setError = useCallback((error: Error | string, email?: string) => {
    let errorMessage: string;
    let errorType: AuthErrorState['type'] = 'unknown';
    let isRetryable = true;

    if (error instanceof EmailValidationError) {
      errorMessage = error.getUserMessage();
      errorType = 'format';
      isRetryable = false; // Format errors are not retryable without user correction
    } else if (typeof error === 'string') {
      errorMessage = error;
      
      // Determine error type based on message content
      if (error.toLowerCase().includes('format') || error.toLowerCase().includes('invalid')) {
        errorType = 'format';
        isRetryable = false;
      } else if (error.toLowerCase().includes('oauth') || error.toLowerCase().includes('google')) {
        errorType = 'oauth';
        isRetryable = true;
      } else if (error.toLowerCase().includes('network') || error.toLowerCase().includes('connection')) {
        errorType = 'network';
        isRetryable = true;
      }
    } else {
      errorMessage = error.message || 'An unexpected error occurred';
      
      // Check error name or message for specific types
      if (error.name === 'EmailValidationError') {
        errorType = 'format';
        isRetryable = false;
      } else if (error.message?.toLowerCase().includes('oauth')) {
        errorType = 'oauth';
        isRetryable = true;
      }
    }

    setErrorState({
      error: errorMessage,
      email,
      type: errorType,
      isRetryable,
    });
  }, []);

  const clearError = useCallback(() => {
    setErrorState(initialState);
  }, []);

  const retry = useCallback(() => {
    if (errorState.isRetryable) {
      clearError();
      return true;
    }
    return false;
  }, [errorState.isRetryable, clearError]);

  return {
    ...errorState,
    setError,
    clearError,
    retry,
    hasError: errorState.error !== null,
  };
}

export default useAuthError;